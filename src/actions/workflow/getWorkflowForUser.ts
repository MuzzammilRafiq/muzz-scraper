"use server";
import prisma from "~/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowForUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
