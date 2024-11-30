import { TaskParam, TaskType } from "./task";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}
export type WorkflowTask = {
  label: string;
  icon: React.ComponentType<{ size: number }>;
  isEntryPoints: boolean;
  inputs: TaskParam[];
  outputs: TaskParam[];
  type: TaskType;
  credits: number;
};
