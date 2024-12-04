"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "~/lib/db";

export async function GetWorkflowPhaseDetails(phaseId: string) {
  const { userId } = await auth();

  if (!userId) throw new Error("User not authenticated");
  return prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
  });
}
