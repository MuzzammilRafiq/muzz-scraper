"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LucideIcon } from "lucide-react";

import { DialogHeader } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

interface CustomDialogHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;

  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}
export default function CustomDialogHeader(props: CustomDialogHeaderProps) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon
              className={cn("stroke-primary", props.iconClassName)}
              size={30}
            />
          )}
          {props.title && (
            <h1 className={cn("text-xl text-primary", props.titleClassName)}>
              {props.title}
            </h1>
          )}
          {props.subtitle && (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                props.subtitleClassName
              )}
            >
              {props.subtitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}
