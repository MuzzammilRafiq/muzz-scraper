import React from "react";
import { LucideProps, CodeIcon } from "lucide-react";
import { TaskParamType, TaskType } from "~/type/task";
import { WorkflowTask } from "~/type/workflow";

export const PageToHTMLTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from Page",
  icon: (props: LucideProps) => (
    <CodeIcon {...props} className="stroke-rose-400" />
  ),
  isEntryPoints: false,
  credits: 2,
  inputs: [
    {
      name: "Web Page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    { name: "HTML", type: TaskParamType.STRING },
    { name: "Web Page", type: TaskParamType.BROWSER_INSTANCE },
  ],
} satisfies WorkflowTask;
