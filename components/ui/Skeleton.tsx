import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
  className?: string;
}

export function Skeleton({
  width,
  height,
  radius = 5,
  className,
}: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
    borderRadius: radius,
  };

  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "animate-pulse bg-[#E9EDF2]",
        className
      )}
    />
  );
}

export default Skeleton;