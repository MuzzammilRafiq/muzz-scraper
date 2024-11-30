import { useReactFlow } from "@xyflow/react";
import React, { useCallback } from "react";
import { FlowToExexutionPlan } from "~/lib/workflow/executionPlan";
import { AppNode } from "~/type/appNode";

export default function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const result = FlowToExexutionPlan(nodes as AppNode[], edges);
  }, [toObject]);
  return { generateExecutionPlan };
}
