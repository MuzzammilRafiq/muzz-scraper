import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { runWorkflow } from "~/actions/workflow/runWorkflow";
import useExecutionPlan from "~/components/hooks/useExecutionPlan";
import { Button } from "~/components/ui/button";

export default function ExecuteButton({ workflowId }: { workflowId: string }) {
  const { generateExecutionPlan } = useExecutionPlan();
  const { toObject } = useReactFlow();
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow executed successfully", { id: "flow-execution" });
    },
    onError: () => {
      toast.error("Something Went Wrong", { id: "flow-execution" });
    },
  });

  return (
    <Button
      // disabled={generate === undefined}
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const executionPlan = generateExecutionPlan();

        if (!executionPlan) {
          return;
        }
        mutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}
