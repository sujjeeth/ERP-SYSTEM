import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type BadgeAppearance =
  | "soft"
  | "outline"
  | "solid";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  label?: React.ReactNode;
  variant?: BadgeVariant;
  appearance?: BadgeAppearance;
  size?: "xs" | "sm" | "md";
  icon?: React.ReactNode;
  dot?: boolean;
}

const colors: Record<
  BadgeVariant,
  Record<BadgeAppearance, string>
> = {
  neutral: {
    soft: "bg-[#F1F3F6] text-[#64748B]",
    outline: "border border-[#DDE2E8] text-[#64748B]",
    solid: "bg-[#64748B] text-white",
  },
  success: {
    soft: "bg-[#EDF8F1] text-[#18794E]",
    outline: "border border-[#A8D8B9] text-[#18794E]",
    solid: "bg-[#18794E] text-white",
  },
  warning: {
    soft: "bg-[#FFF5E5] text-[#A16207]",
    outline: "border border-[#F0D09B] text-[#A16207]",
    solid: "bg-[#B45309] text-white",
  },
  danger: {
    soft: "bg-[#FFF0F0] text-[#DC2626]",
    outline: "border border-[#FCA5A5] text-[#DC2626]",
    solid: "bg-[#DC2626] text-white",
  },
  info: {
    soft: "bg-[#EEF4FF] text-[#0B57D0]",
    outline: "border border-[#B8CEFF] text-[#0B57D0]",
    solid: "bg-[#0B57D0] text-white",
  },
};

const dotColors: Record<BadgeVariant, string> = {
  neutral: "bg-[#94A3B8]",
  success: "bg-[#18794E]",
  warning: "bg-[#B45309]",
  danger: "bg-[#DC2626]",
  info: "bg-[#0B57D0]",
};

const sizes = {
  xs: "min-h-[15px] px-1.5 text-[9px]",
  sm: "min-h-[18px] px-2 text-[10px]",
  md: "min-h-[22px] px-2.5 text-[11px]",
};

export function Badge({
  label,
  children,
  variant = "neutral",
  appearance = "soft",
  size = "sm",
  icon,
  dot = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center",
        "gap-1 rounded-full font-medium leading-none whitespace-nowrap",
        colors[variant][appearance],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            dotColors[variant]
          )}
        />
      )}

      {icon}
      {children ?? label}
    </span>
  );
}

export default Badge;