"use client";
import { useEffect, useId, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { ParamProps } from "~/type/appNode";

export default function StringParam({
  param,
  updateNodeParamValue,
  value,
  disabled,
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);

  const id = useId();
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name} {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      {param.varient === "textarea" ? (
        <Textarea
          id={id}
          value={internalValue}
          placeholder="Enter value here"
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={(e) => updateNodeParamValue(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <Input
          id={id}
          value={internalValue}
          placeholder="Enter value here"
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={(e) => updateNodeParamValue(e.target.value)}
          disabled={disabled}
        />
      )}
      <p className="px-2 to-muted-foreground">{param.helperText}</p>
    </div>
  );
}
