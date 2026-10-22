"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export interface SeparatorProps
  extends Omit<
    SeparatorPrimitive.SeparatorProps,
    "orientation"
  > {
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      {...props}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-[#E9EDF2]",
        orientation === "horizontal"
          ? "h-px w-full"
          : "h-full w-px",
        className
      )}
    />
  );
}

export default Separator;