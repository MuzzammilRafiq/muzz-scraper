import { Edge } from "@xyflow/react";
import { AppNode, AppNodeMissingInputs } from "~/type/appNode";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from "~/type/workflow";
import { TaskRegistry } from "./task/registry";

/**
 * Converts a flow of nodes and edges into a workflow execution plan.
 * The execution plan organizes nodes into phases for sequential execution.
 *
 * @param nodes - Array of application nodes representing tasks in the workflow
 * @param edges - Array of edges connecting the nodes and defining data flow
 * @returns An object containing the workflow execution plan, organized in phases
 * @throws {Error} When no entry point is found in the nodes
 * @throws {Error} When invalid inputs are detected for a node whose predecessors are all planned
 *
 * @remarks
 * The function:
 * 1. Finds an entry point node
 * 2. Creates phases of execution
 * 3. Validates node inputs before adding to execution plan
 * 4. Ensures all nodes are included in the plan
 */

type FlowToExexutionPlanReturnType = {
  //return type
  executionPlan?: WorkflowExecutionPlan;
  error?: {
    type: "NO_ENTRY_POINT" | "INVALID_INPUTS";
    invalidElements?: AppNodeMissingInputs[];
  };
};
export function FlowToExexutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExexutionPlanReturnType {
  const entryPoint = nodes.find((n) => TaskRegistry[n.data.type].isEntryPoint);
  if (!entryPoint) {
    return {
      error: {
        type: "NO_ENTRY_POINT",
      },
    };
  }
  const inputsWithErrors: AppNodeMissingInputs[] = [];
  const planned = new Set<string>();

  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];
  planned.add(entryPoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currNode of nodes) {
      if (planned.has(currNode.id)) {
        continue;
      }

      const invalidInputs = getInvalidInputs(currNode, edges, planned);
      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currNode, nodes, edges);
        if (incomers.every((e) => planned.has(e.id))) {
          console.log("invalid inputs", currNode.id, invalidInputs);
          inputsWithErrors.push({
            nodeId: currNode.id,
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currNode);
    }
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    executionPlan.push(nextPhase);
  }
  if (inputsWithErrors.length > 0) {
    return {
      error: {
        type: "INVALID_INPUTS",
        invalidElements: inputsWithErrors,
      },
    };
  }
  return { executionPlan };
}
const getInvalidInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>
) => {
  const invalidInputs = [];
  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValuePeriod = inputValue?.length > 0;
    if (inputValuePeriod) {
      continue;
    }
    const incomingEdges = edges.filter((e) => e.target === node.id);

    const inputLinkedToOutput = incomingEdges.find(
      (e) => e.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkedToOutput) {
        continue;
      }
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }
    invalidInputs.push(input.name);
  }
  return invalidInputs;
};

const getIncomers = (node: AppNode, nodes: AppNode[], edges: Edge[]) => {
  if (!node.id) {
    return [];
  }
  const incomers = new Set<string>();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomers.add(edge.source);
    }
  });
  return nodes.filter((n) => incomers.has(n.id));
};
