"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export interface PopoverPanelProps {
  trigger: React.ReactElement;
  children: React.ReactNode;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;

  width?: number | string;
  padding?: number | string;
  collisionPadding?: number;

  className?: string;
  contentClassName?: string;
}

function toCssLength(value: number | string): string | number {
  return typeof value === "number" ? `${value}px` : value;
}

export function PopoverPanel({
  trigger,
  children,
  open,
  defaultOpen,
  onOpenChange,
  side = "bottom",
  align = "start",
  sideOffset = 5,
  width = 240,
  padding = 8,
  collisionPadding = 8,
  className,
  contentClassName,
}: PopoverPanelProps) {
  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          className={cn(
            "z-[120] min-w-0 rounded-[7px]",
            "border border-[#E1E5EB] bg-white",
            "text-[#273142] shadow-[0_4px_14px_rgba(15,23,42,0.12)]",
            "outline-none",
            "data-[state=open]:animate-in",
            "data-[state=open]:fade-in-0",
            contentClassName,
            className
          )}
          style={{
            width: toCssLength(width),
            padding: toCssLength(padding),
          }}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export default PopoverPanel;