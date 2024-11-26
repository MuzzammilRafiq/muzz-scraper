import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, any>;
  [key: string]: any;
}
export interface AppNode extends Node {
  data: AppNodeData;
}
