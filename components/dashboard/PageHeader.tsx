
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  context?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  context,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-3 flex min-w-0 flex-wrap items-start",
        "justify-between gap-3",
        className
      )}
    >
      <div className="min-w-0">
        <h1 className="text-[18px] font-semibold leading-6 text-[#273142]">
          {title}
        </h1>

        {(subtitle || context) && (
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] leading-4 text-[#7A8799]">
            {subtitle && <span>{subtitle}</span>}

            {subtitle && context && (
              <span aria-hidden="true" className="text-[#B3BCC9]">
                ·
              </span>
            )}

            {context && <span>{context}</span>}
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

export default PageHeader;
