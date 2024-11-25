"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "~/lib/db";
import { workflowSchema, WorkflowSchemaType } from "~/schema/workflow";
import { WorkflowStatus } from "~/type/workflow";

export async function CreateWorkflow(form: WorkflowSchemaType) {
  const { success, data } = workflowSchema.safeParse(form);
  if (!success) throw new Error("Invalid form data");
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }
  redirect("/workflow/editor/" + result.id);
}
