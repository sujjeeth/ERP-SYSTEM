import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableSummaryProps {
  text: string;
  secondaryText?: string;
  actions?: ReactNode;
  className?: string;
}

export function TableSummary({
  text,
  secondaryText,
  actions,
  className,
}: TableSummaryProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap items-center justify-between gap-2",
        className
      )}
    >
      <div className="min-w-0">
        <p className="text-[10px] text-[#64748B]">{text}</p>

        {secondaryText && (
          <p className="mt-0.5 text-[9px] text-[#8993A4]">
            {secondaryText}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export default TableSummary;