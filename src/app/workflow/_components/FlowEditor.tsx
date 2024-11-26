import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "~/lib/workflow/createFlowNode";
import { TaskType } from "~/type/task";
export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(TaskType.LAUNCH_BROWSER, { x: 100, y: 100 }),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={8} size={1} />
      </ReactFlow>
    </main>
  );
}
