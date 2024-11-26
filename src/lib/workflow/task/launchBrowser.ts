import React from "react";
import { LucideProps, GlobeIcon, Divide } from "lucide-react";
import { TaskType } from "~/type/task";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) =>
    React.createElement(GlobeIcon, { ...props, className: "stroke-pink-400" }),
  isEntryPoints: true,
};
