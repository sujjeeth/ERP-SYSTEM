"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const avatarSizes = {
  sm: "h-6 w-6 text-[9px]",
  md: "h-7 w-7 text-[10px]",
  lg: "h-9 w-9 text-[12px]",
};

export function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden",
        "items-center justify-center rounded-full",
        "bg-[#E8EFFF] font-semibold text-[#0B57D0]",
        avatarSizes[size],
        className
      )}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      )}

      <AvatarPrimitive.Fallback
        delayMs={300}
        className="flex h-full w-full items-center justify-center"
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export default Avatar;