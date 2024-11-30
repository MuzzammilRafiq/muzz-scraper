import { Edge } from "@xyflow/react";
import { AppNode } from "~/type/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "~/type/workflow";
import { TaskRegistry } from "./task/registry";

export function FlowToExexutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): { executionPlan?: WorkflowExecutionPlan } {
  const entryPoint = nodes.find((n) => TaskRegistry[n.data.type].isEntryPoint);
  if (!entryPoint) {
    throw new Error("No entry point found");
  }

  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 0,
      nodes: [entryPoint],
    },
  ];
  for (
    let phase = 1;
    phase <= nodes.length || planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = [{ phase, nodes: [] }];
  }

  return { executionPlan };
}
