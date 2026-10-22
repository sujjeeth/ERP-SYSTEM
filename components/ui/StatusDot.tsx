import { cn } from "@/lib/utils";

export type StatusDotVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface StatusDotProps {
  variant?: StatusDotVariant;
  size?: "xs" | "sm" | "md";
  pulse?: boolean;
  className?: string;
  label?: string;
}

const dotColors: Record<StatusDotVariant, string> = {
  neutral: "bg-[#94A3B8]",
  success: "bg-[#18794E]",
  warning: "bg-[#D97706]",
  danger: "bg-[#DC2626]",
  info: "bg-[#0B57D0]",
};

const dotSizes = {
  xs: "h-1 w-1",
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
};

export function StatusDot({
  variant = "neutral",
  size = "sm",
  pulse = false,
  className,
  label,
}: StatusDotProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-block shrink-0 rounded-full",
        dotColors[variant],
        dotSizes[size],
        pulse && "animate-pulse",
        className
      )}
    />
  );
}

export default StatusDot;