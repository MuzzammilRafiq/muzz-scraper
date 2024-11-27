import { Handle, Position } from "@xyflow/react";
import React from "react";
import { cn } from "~/lib/utils";
import { TaskRegistry } from "~/lib/workflow/task/registry";
import { TaskParam } from "~/type/task";
import NodeFlowParamField from "./NodeParamField";

export function NodeInputs({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
}
export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeFlowParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn("!bg-muted-foreground !border-2  !-left-1 !w-2 !h-2")}
        />
      )}
    </div>
  );
}
