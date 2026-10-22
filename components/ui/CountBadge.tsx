import { cn } from "@/lib/utils";

export interface CountBadgeProps {
  count: number;
  variant?: "neutral" | "primary" | "success" | "danger";
  size?: "sm" | "md";
  maxCount?: number;
  showZero?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variants = {
  neutral: "bg-[#EEF1F5] text-[#64748B]",
  primary: "bg-[#EAF1FF] text-[#0B57D0]",
  success: "bg-[#EDF8F1] text-[#18794E]",
  danger: "bg-[#DC2626] text-white",
};

const sizes = {
  sm: "min-h-[16px] min-w-[16px] px-1 text-[9px]",
  md: "min-h-[19px] min-w-[19px] px-1.5 text-[10px]",
};

export function CountBadge({
  count,
  variant = "neutral",
  size = "sm",
  maxCount = 99,
  showZero = false,
  className,
  ariaLabel,
}: CountBadgeProps) {
  if (count < 0 || (!showZero && count === 0)) {
    return null;
  }

  const label =
    count > maxCount ? `${maxCount}+` : String(count);

  return (
    <span
      aria-label={ariaLabel ?? `${count} items`}
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "rounded-full font-semibold leading-none",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {label}
    </span>
  );
}

export default CountBadge;