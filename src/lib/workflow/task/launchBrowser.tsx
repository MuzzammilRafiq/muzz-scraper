import React from "react";
import { LucideProps, GlobeIcon } from "lucide-react";
import { TaskParamType, TaskType } from "~/type/task";
import { WorkflowTask } from "~/type/workflow";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon {...props} className="stroke-pink-400" />
  ),
  isEntryPoints: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: "Web Page", type: TaskParamType.BROWSER_INSTANCE }],
} satisfies WorkflowTask;
