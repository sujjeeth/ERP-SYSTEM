import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

interface InvoiceStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconColor: string;
  iconBackground: string;
  descriptionColor?: string;
}

export function InvoiceStatCard({
  title,
  value,
  description,
  icon,
  iconColor,
  iconBackground,
  descriptionColor = "#7A8799",
}: InvoiceStatCardProps) {
  return (
    <Card
      className="min-w-0 rounded-[8px] border border-[#E3E8EF] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.025)]"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="truncate text-[10px] font-medium text-[#718096]">
          {title}
        </h2>

        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px]"
          style={{
            color: iconColor,
            backgroundColor: iconBackground,
          }}
        >
          {icon}
        </span>
      </div>

      <p className="mt-1 text-[19px] font-semibold leading-6 tracking-[-0.4px] text-[#273142] tabular-nums">
        {value}
      </p>

      <p
        className="mt-1 truncate text-[8px] leading-3"
        style={{ color: descriptionColor }}
      >
        {description}
      </p>
    </Card>
  );
}

export default InvoiceStatCard;