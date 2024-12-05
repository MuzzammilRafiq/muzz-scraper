import { AppNode } from "./appNode";
import { TaskParam, TaskType } from "./task";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}
export type WorkflowTask = {
  label: string;
  icon: React.ComponentType<{ size: number }>;
  isEntryPoint: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  type: TaskType;
  credits: number;
};

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];

export enum WorkflowExecutionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum ExecutionPhaseStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export enum WorkflowExecutionTrigger {
  MANUAL = "MANUAL",
  SCHEDULED = "SCHEDULED",
}
