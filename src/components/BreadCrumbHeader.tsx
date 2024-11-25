"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { MobileSidebar } from "./Sidebar";
import { ChevronRightIcon } from "lucide-react";

const BreadCrumbHeader = () => {
  const pathname = usePathname();
  const paths = pathname === "/" ? [""] : pathname.split("/");
  console.log(paths, pathname);

  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="capitalize text-md"
                  href={`/${path}`}
                >
                  {path || "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem className="mt-1">
                {index < paths.length - 1 && <ChevronRightIcon size="15" />}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbHeader;
