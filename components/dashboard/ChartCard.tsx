import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  headerMetrics?: ReactNode;
  children: ReactNode;
  legend?: ReactNode;
  footer?: ReactNode;
  className?: string;
  chartHeight?: number;
}

export function ChartCard({
  title,
  subtitle,
  headerMetrics,
  children,
  legend,
  footer,
  className,
  chartHeight = 220,
}: ChartCardProps) {
  return (
    <Card
      padding="sm"
      className={cn("min-w-0 overflow-hidden", className)}
    >
      <CardHeader className="mb-1 items-start">
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>

          {subtitle && (
            <CardDescription className="mt-0.5">
              {subtitle}
            </CardDescription>
          )}
        </div>

        {headerMetrics && (
          <div className="shrink-0 text-right">
            {headerMetrics}
          </div>
        )}
      </CardHeader>

      {legend && (
        <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          {legend}
        </div>
      )}

      <CardContent>
        <div
          className="w-full min-w-0"
          style={{ height: chartHeight }}
        >
          {children}
        </div>
      </CardContent>

      {footer && (
        <div className="mt-2 border-t border-[#E9EDF2] pt-2">
          {footer}
        </div>
      )}
    </Card>
  );
}

export default ChartCard;