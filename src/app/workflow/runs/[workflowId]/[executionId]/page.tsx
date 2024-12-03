import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import { GetWorkflowExecutionWithPhases } from "~/actions/workflow/getWorkflowExecutionWithPhases";
import TopBar from "~/app/workflow/_components/topbar/TopBar";
import ExecutionViewer from "~/app/workflow/runs/[workflowId]/[executionId]/_components/ExecutionViewer";

export default function ExecutionViewerPage({
  params,
}: {
  params: { workflowId: string; executionId: string };
}) {
  console.log(params);
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <TopBar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper
            executionId={params.executionId}
            workflowId={params.workflowId}
          />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId,
  workflowId,
}: {
  executionId: string;
  workflowId: string;
}) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Execution not found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
}
