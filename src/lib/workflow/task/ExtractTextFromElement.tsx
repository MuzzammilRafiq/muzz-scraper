import React from "react";
import { LucideProps, CodeIcon } from "lucide-react";
import { TaskParamType, TaskType } from "~/type/task";
import { WorkflowTask } from "~/type/workflow";

export const ExtractTextFromElement = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract Element Text",
  icon: (props: LucideProps) => (
    <CodeIcon {...props} className="stroke-rose-400" />
  ),
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      varient: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [{ name: "Extracted Text", type: TaskParamType.STRING }],
} satisfies WorkflowTask;
