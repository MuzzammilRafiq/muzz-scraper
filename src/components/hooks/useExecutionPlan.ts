import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { FlowToExexutionPlan } from "~/lib/workflow/executionPlan";
import { AppNode } from "~/type/appNode";

export default function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = FlowToExexutionPlan(nodes as AppNode[], edges);
    return executionPlan;
  }, [toObject]);
  return { generateExecutionPlan };
}
