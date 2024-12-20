"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "~/lib/db";
import { ExecuteWorkflow } from "~/lib/workflow/executeWorkflow";
import { FlowToExexutionPlan } from "~/lib/workflow/executionPlan";
import { TaskRegistry } from "~/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "~/type/workflow";

export async function runWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const { workflowId, flowDefinition } = form;

  if (!workflowId) throw new Error("Workflow ID is required");

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
    },
  });

  if (!workflow) throw new Error("Workflow not found");

  if (!flowDefinition) {
    throw new Error("Flow direction is required");
  }
  const flow = JSON.parse(flowDefinition);
  const result = FlowToExexutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error("flow definition not valid");
  }
  if (!result.executionPlan) {
    throw new Error("execution plan not generated");
  }
  const executionPlan: WorkflowExecutionPlan = result.executionPlan;

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("execution not created");
  }

  ExecuteWorkflow(execution.id); //long running task
  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
