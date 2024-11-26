"use client";

import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Workflow as WorkflowPrismaType } from "@prisma/client";
import Link from "next/link";
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";

import { WorkflowStatus } from "~/type/workflow";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import TooltipWrapper from "~/components/TooltipWrapper";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";

const statusColor = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary text-primary",
};
export default function WorkflowCard({
  workflow,
}: {
  workflow: WorkflowPrismaType;
}) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className=" border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 items-center justify-center flex rounded-full",
              statusColor[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5 text-white" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div className="">
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="text-xs ml-2 px-2 py-0.5 font-medium bg-yellow-100 text-yellow-800  rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkflowActions workflow={workflow} />
        </div>
      </CardContent>
    </Card>
  );
}
function WorkflowActions({ workflow }: { workflow: WorkflowPrismaType }) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="Actions" side="bottom">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog((prev) => !prev)}
            className="text-destructive flex items-center gap-2"
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteWorkflowDialog
        isOpen={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowId={workflow.id}
        workflowName={workflow.name}
      />
    </>
  );
}
