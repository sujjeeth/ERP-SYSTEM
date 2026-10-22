import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { KpiMetric } from "@/types/dashboard";

interface KpiCardProps {
  metric: KpiMetric;
  icon: ReactNode;
  iconColor?: string;
  iconBackground?: string;
  detailIcon?: ReactNode;
  detailVariant?: BadgeVariant;
  trendIcon?: ReactNode;
  onClick?: () => void;
}

export function KpiCard({
  metric,
  icon,
  iconColor = "#0B57D0",
  iconBackground = "#EEF4FF",
  detailIcon,
  detailVariant = "neutral",
  trendIcon,
  onClick,
}: KpiCardProps) {
  return (
    <Card
      padding="sm"
      className={cn(
        "min-h-[124px] min-w-0",
        onClick && "cursor-pointer hover:border-[#CBD5E1]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="truncate text-[11px] font-medium text-[#64748B]">
          {metric.title}
        </h2>

        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px]"
          style={{
            color: iconColor,
            backgroundColor: iconBackground,
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      <p className="mt-2 text-[25px] font-semibold leading-8 tracking-[-0.6px] text-[#273142] tabular-nums">
        {metric.value}
      </p>

      <div className="mt-1 flex min-h-[18px] flex-wrap items-center gap-1.5">
        {metric.trend ? (
          <>
            <Badge variant="success" size="xs" icon={trendIcon}>
              {metric.trend.split(" vs ")[0]}
            </Badge>

            {metric.trend.includes(" vs ") && (
              <span className="text-[9px] text-[#8993A4]">
                vs {metric.trend.split(" vs ")[1]}
              </span>
            )}
          </>
        ) : (
          <Badge
            variant={detailVariant}
            size="xs"
            icon={detailIcon}
          >
            {metric.detail}
          </Badge>
        )}
      </div>

      {metric.trend && (
        <p className="mt-1 truncate text-[10px] text-[#64748B]">
          {metric.detail}
        </p>
      )}

      {metric.secondaryDetail && (
        <p
          className={cn(
            "mt-1 truncate text-[10px]",
            metric.id === "receivables" || metric.id === "stock"
              ? "text-[#B45309]"
              : "text-[#8993A4]"
          )}
        >
          {metric.secondaryDetail}
        </p>
      )}
    </Card>
  );
}

export default KpiCard;