import React from "react";
import DesktopSidebar from "~/components/sidebar";
import { Separator } from "~/components/ui/separator";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          Scraper
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container text-accent-foreground py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
