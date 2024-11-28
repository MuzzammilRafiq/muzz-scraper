"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { TaskRegistry } from "~/lib/workflow/task/registry";
import { TaskType } from "~/type/task";

export default function TaskMenu() {
  return (
    <aside className="w-[340px] min-w-[340px]  max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

interface TaskMenuBtnProps {
  taskType: TaskType;
}

function TaskMenuBtn({ taskType }: TaskMenuBtnProps) {
  const task = TaskRegistry[taskType];
  return (
    <Button
      variant={"secondary"}
      className="flex items-center gap-2 justify-center border w-full"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("application/reactflow", taskType);
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      <div className="flex gap-2 items-center">
        <task.icon size={20} />
        <span>{task.label}</span>
      </div>
    </Button>
  );
}
