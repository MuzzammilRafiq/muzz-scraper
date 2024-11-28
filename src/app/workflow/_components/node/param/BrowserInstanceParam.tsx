"use client";
import React from "react";
import { ParamProps } from "~/type/appNode";

export default function BrowserInstanceParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  return <p className="text-xs">{param.name}</p>;
}
