import { TaskType } from "~/type/task";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHTMLTask } from "./PageToHtml";
import { WorkflowTask } from "~/type/workflow";

type Registery = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registery = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHTMLTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};
