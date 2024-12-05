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
  /**
   * If the user is authenticated, the function proceeds to query the database using
   * Prisma's findUnique method on the executionPhase model.
   * The query searches for a record where the id matches the provided phaseId and
   * the associated execution record has a userId that matches the authenticated user's ID.
   * This ensures that the user can only access workflow phases that belong to them.
   * The function returns the result of the database query, which will be the details of the specified
   * workflow phase if found, or null if no matching record exists. This approach ensures secure and
   * user-specific access to workflow phase details in the application.
   */
}
