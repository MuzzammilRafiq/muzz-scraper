"use client";
import { Dialog } from "@radix-ui/react-dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import React, { use, useCallback, useState } from "react";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDialogHeader from "~/components/CustomeDialogHeader";
import { Button } from "~/components/ui/button";
import { DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { workflowSchema, WorkflowSchemaType } from "~/schema/workflow";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "~/actions/workflow/createWorkflow";
import { toast } from "sonner";
const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<WorkflowSchemaType>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow created successfully", { id: "create-workflow" });
    },
    onError: () => {
      toast.error("Failed to create workflow", { id: "create-workflow" });
    },
  });
  const onSubmit = useCallback(
    (data: WorkflowSchemaType) => {
      toast.loading("Creating workflow", { id: "create-workflow" });
      mutate(data);
    },
    [mutate]
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          {triggerText || "Create Workflow"}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Start Building your Workflow"
        />
        <div className="p-6">
          {/* <Form {...form}> */}
          <FormProvider {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name for your workflow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will help you understand the purpose of this
                      workflow.
                      <br />
                      This is optional but recommended.
                      <br />
                      This is optional but recommended
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
