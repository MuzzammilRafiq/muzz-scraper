"use client";

import { useMutation } from "@tanstack/react-query";
import { DeleteWorkflow } from "~/actions/workflow/deleteWorkflow";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Input } from "~/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;

  workflowId: string;
  workflowName: string;
}

export default function DeleteWorkflowDialog({
  isOpen,
  setOpen,
  workflowId,
  workflowName,
}: Props) {
  const router = useRouter();
  const [confirmName, setConfirmName] = useState("");
  const isValid = confirmName === workflowName;

  const { mutate, isPending } = useMutation({
    mutationFn: DeleteWorkflow,
    onMutate: () => {
      toast.loading("Deleting workflow...", { id: "delete-workflow" });
    },
    onSuccess: () => {
      toast.success("Workflow deleted successfully", { id: "delete-workflow" });
      setOpen(false);
      setConfirmName("");
    },
    onError: () => {
      toast.error("Failed to delete workflow", { id: "delete-workflow" });
    },
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              This will permanently delete the workflow &quot;{workflowName}
              &quot;. This action cannot be undone.
            </p>
            <div>
              <p className="mb-2 text-sm">Type the workflow name to confirm:</p>
              <Input
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder={workflowName}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmName("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(workflowId)}
            disabled={!isValid || isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
