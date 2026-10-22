import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[160px] flex-col items-center",
        "justify-center gap-2 px-4 py-8 text-center",
        className
      )}
    >
      {icon && (
        <div
          className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F4F8] text-[#64748B]"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <h3 className="text-[13px] font-semibold text-[#273142]">
        {title}
      </h3>

      {description && (
        <p className="max-w-[320px] text-[11px] leading-4 text-[#8993A4]">
          {description}
        </p>
      )}

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;