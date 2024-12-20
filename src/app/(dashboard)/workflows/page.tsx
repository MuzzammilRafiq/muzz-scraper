import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import { getWorkflowForUser } from "~/actions/workflow/getWorkflowForUser";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Skeleton } from "~/components/ui/skeleton";
import CreateWorkflowDialog from "./_components/CreateWorkflowDiaglog";
import WorkflowCard from "./_components/WorkflowCard";

export default function WorkflowsPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows Page</h1>
          <p className="text-muted-foreground">
            Welcome to the workflows page!
          </p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowSkelton />}>
          <UserWorkflows />
        </Suspense>
      </div>
      <CreateWorkflowDialog triggerText="Create your First Workflow" />
    </div>
  );
}
function UserWorkflowSkelton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((_, index) => (
        <Skeleton key={index} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  try {
    const workflows = await getWorkflowForUser();
    if (workflows.length == 0) {
      return (
        <div className="flex flex-col gap-4  items-center justify-center h-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No workflows found</p>
            <p className="text-muted-foreground text-sm">
              Click the button below to create your first workflow
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow, index) => (
          <WorkflowCard key={index} workflow={workflow} />
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong while fetching your workflows. Please try again
          later.
        </AlertDescription>
      </Alert>
    );
  }
}
