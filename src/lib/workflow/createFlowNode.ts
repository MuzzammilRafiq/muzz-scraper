import { AppNode } from "~/type/appNode";
import { TaskType } from "~/type/task";

export function createFlowNode(
  nodetype: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    position: position || { x: 0, y: 0 },
    data: {
      type: nodetype,
      inputs: {},
    },
  };
}
