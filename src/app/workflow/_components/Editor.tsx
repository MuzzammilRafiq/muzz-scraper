"use client";

import { Workflow } from "@prisma/client";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import TopBar from "./topbar/TopBar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "~/components/context/FlowValidationContext";
export default function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TopBar
            workflowId={workflow.id}
            title={"Workflow Editor"}
            subtitle={workflow.name}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
}
