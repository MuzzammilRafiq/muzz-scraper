import { auth } from "@clerk/nextjs/server";
import prisma from "~/lib/db";
import Editor from "~/app/workflow/_components/Editor";

export default async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
  const { userId } = await auth();
  if (!userId) return <div>unauthenticated</div>;
  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });
  if (!workflow) return <div>workflow not found</div>;
  return <Editor workflow={workflow} />;
}
