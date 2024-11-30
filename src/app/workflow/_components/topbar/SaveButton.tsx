import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { UpdateWorkflow } from "~/actions/workflow/updateWorkflow";
import { Button } from "~/components/ui/button";

export default function SaveButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();
  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success("Workflow saved successfully", { id: "save-workflow" });
    },
    onError: (error) => {
      console.log("@saveMutation", error);
      toast.error("Something Went Wrong", { id: "save-workflow" });
    },
  });
  return (
    <Button
      disabled={saveMutation.isPending}
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const definition = JSON.stringify(toObject());
        toast.loading("Saving Workflow", { id: "save-workflow" });
        saveMutation.mutate({ id: workflowId, definition });
      }}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
}
