import { useReactFlow } from "@xyflow/react";
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { createFlowNode } from "~/lib/workflow/createFlowNode";
import { TaskRegistry } from "~/lib/workflow/task/registry";
import { AppNode } from "~/type/appNode";
import { TaskType } from "~/type/task";

export default function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase to-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoints && <Badge>Entry Point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          {!task.isEntryPoints && (
            <>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
              >
                <TrashIcon size={20} />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x - 50;
                  const newY = node.position.y - 50;
                  const newNode = createFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });
                  addNodes([newNode]);
                }}
              >
                <CopyIcon size={20} />
              </Button>
            </>
          )}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
