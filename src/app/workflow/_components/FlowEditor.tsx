import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  getOutgoers,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "~/lib/workflow/createFlowNode";
import { TaskType } from "~/type/task";
import NodeComponent from "./node/NodeComponent";
import React, { useCallback, useEffect } from "react";
import { AppNode } from "~/type/appNode";
import DeletableEdge from "./edges/DeletableEdge";
import { TaskRegistry } from "~/lib/workflow/task/registry";

const nodeTypes = {
  Node: NodeComponent,
};
const edgeTypes = {
  default: DeletableEdge,
};
const snapGrid: [number, number] = [16, 16];
const fitViewOptions = { padding: 2 };
export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();
  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch {}
  }, [workflow.definition, setEdges, setNodes, setViewport]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const taskType = e.dataTransfer.getData("application/reactflow");
      if (!taskType || typeof taskType === undefined) return;

      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const node = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(node));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;
      const node = nodes.find((node) => node.id === connection.target);
      if (!node) return;
      // const nodeInputs = node.data.inputs;
      // updateNodeData(node.id, {
      //   inputs: { ...nodeInputs, [connection.targetHandle]: "" },
      // });
      delete node.data.inputs[connection.targetHandle];
      updateNodeData(node.id, { inputs: node.data.inputs });
    },
    [setEdges, nodes, updateNodeData]
  );

  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      if (connection.source === connection.target) return false;
      const targetNode = nodes.find((node) => node.id === connection.target);
      const sourceNode = nodes.find((node) => node.id === connection.source);
      if (!sourceNode || !targetNode) {
        console.log("@ERROR sourceNode or targetNode not found");
        return false;
      }

      const sourceTask = TaskRegistry[sourceNode.data.type];
      const targetTask = TaskRegistry[targetNode.data.type];

      const output = sourceTask.outputs.find(
        (output) => output.name === connection.sourceHandle
      );

      const input = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle
      );

      if (output?.type !== input?.type) {
        console.log("@ERROR output or input not found");
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        for (const neighbor of getOutgoers(node, nodes, edges)) {
          if (neighbor.id === connection.source) return true;
          if (hasCycle(neighbor, visited)) return true;
        }
        return false;
      };
      console.log("hasCycle", hasCycle(targetNode));
      return !hasCycle(targetNode);
    },
    [nodes, edges]
  );

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={8} size={1} />
      </ReactFlow>
    </main>
  );
}
