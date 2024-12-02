import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { FlowToExexutionPlan } from "~/lib/workflow/executionPlan";
import { AppNode } from "~/type/appNode";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

export default function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const { clearErrors, setInvalidInputs } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case "NO_ENTRY_POINT":
          toast.error("No entry point found");
          setInvalidInputs(error.invalidElements);
          break;
        case "INVALID_INPUTS":
          toast.error("Invalid inputs detected");
          setInvalidInputs(error.invalidElements);
          break;
        default:
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExexutionPlan(
      nodes as AppNode[],
      edges
    );
    if (error) {
      handleError(error);
      return { error };
    }
    clearErrors();
    return executionPlan;
  }, [toObject, clearErrors, handleError]);
  return { generateExecutionPlan };
}
