import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  shadow?: boolean;
}

const paddingClasses = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export function Card({
  padding = "none",
  bordered = true,
  shadow = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "min-w-0 rounded-[8px] bg-white",
        bordered && "border border-[#E5E7EB]",
        shadow && "shadow-sm",
        paddingClasses[padding],
        className
      )}
    />
  );
}

export type CardPartProps =
  React.HTMLAttributes<HTMLDivElement>;
export function CardHeader({
  className,
  ...props
}: CardPartProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex min-w-0 items-center justify-between gap-3",
        className
      )}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={cn(
        "text-[13px] font-semibold leading-5 text-[#273142]",
        className
      )}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        "text-[11px] leading-4 text-[#8993A4]",
        className
      )}
    />
  );
}

export function CardContent({
  className,
  ...props
}: CardPartProps) {
  return (
    <div
      {...props}
      className={cn("min-w-0", className)}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: CardPartProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex min-w-0 items-center justify-between gap-2",
        className
      )}
    />
  );
}