"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "~/lib/db";

export async function DeleteWorkflow(workflowId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  // Verify workflow ownership
  const workflow = await prisma.workflow.findFirst({
    where: {
      id: workflowId,
      userId: userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found or unauthorized");
  }

  // Delete the workflow
  await prisma.workflow.delete({
    where: {
      id: workflowId,
    },
  });

  redirect("/workflow");
}
