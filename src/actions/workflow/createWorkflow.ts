"use server";

import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";
import prisma from "~/lib/db";
import { createFlowNode } from "~/lib/workflow/createFlowNode";
import { workflowSchema, WorkflowSchemaType } from "~/schema/workflow";
import { AppNode } from "~/type/appNode";
import { TaskType } from "~/type/task";
import { WorkflowStatus } from "~/type/workflow";

export async function CreateWorkflow(form: WorkflowSchemaType) {
  const { success, data } = workflowSchema.safeParse(form);
  if (!success) throw new Error("Invalid form data");
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };

  initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }
  redirect("/workflow/editor/" + result.id);
}
