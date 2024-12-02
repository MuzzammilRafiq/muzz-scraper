import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import { cn } from "~/lib/utils";
import { TaskParam } from "~/type/task";
import NodeFlowParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "~/components/hooks/useFlowValidation";

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
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );
  const { invalidInputs } = useFlowValidation();
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((i) => i === input.name);

  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeFlowParamField
        param={input}
        nodeId={nodeId}
        disabled={isConnected}
      />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          isConnectable={!isConnected}
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2  !-left-1 !w-2 !h-2",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
