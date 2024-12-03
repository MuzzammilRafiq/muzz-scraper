"use server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetWorkflowExecutionWithPhases = async (executionId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }

  const workflowExecution = await prisma.workflowExecution.findUnique({
    where: { id: executionId, userId },

    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });

  return workflowExecution;
};
