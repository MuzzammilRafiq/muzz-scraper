"use client";
import { ChevronLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import TooltipWrapper from "~/components/TooltipWrapper";
import { Button } from "~/components/ui/button";
import SaveButton from "./SaveButton";
import ExecuteButton from "./ExecuteButton";

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
}

const TopBar = ({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
}: Props) => {
  const router = useRouter();
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10 ">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back to Home">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftCircleIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div className="">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs to-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-1 gap-1 justify-end">
        {!hideButtons && (
          <>
            <ExecuteButton workflowId={workflowId} />
            <SaveButton workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
