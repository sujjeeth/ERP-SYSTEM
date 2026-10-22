import Link from "next/link";
import {
  CreditCard,
  FileCheck,
  FileText,
  PackageCheck,
  ReceiptText,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type {
  ActivityItemData,
  ActivityType,
} from "@/types/dashboard";

interface ActivityItemProps {
  item: ActivityItemData;
}

const activityIcons = {
  payment: CreditCard,
  ewayBill: FileText,
  approval: FileCheck,
  adjustment: PackageCheck,
  taxFiling: ReceiptText,
};

const activityStyles: Record<ActivityType, string> = {
  payment: "bg-[#EDF8F1] text-[#18794E]",
  ewayBill: "bg-[#EEF4FF] text-[#0B57D0]",
  approval: "bg-[#EDF8F1] text-[#18794E]",
  adjustment: "bg-[#FFF5E5] text-[#B45309]",
  taxFiling: "bg-[#F1F3F6] text-[#64748B]",
};

const badgeVariants: Record<
  ActivityType,
  "success" | "info" | "warning" | "neutral"
> = {
  payment: "success",
  ewayBill: "info",
  approval: "success",
  adjustment: "warning",
  taxFiling: "neutral",
};

export function ActivityItem({ item }: ActivityItemProps) {
  const Icon = activityIcons[item.type];

  const content = (
    <div className="flex min-w-0 gap-2.5 py-2.5">
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          activityStyles[item.type]
        )}
        aria-hidden="true"
      >
        <Icon size={14} strokeWidth={1.8} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
          <p className="text-[11px] font-semibold leading-4 text-[#273142]">
            {item.title}
          </p>

          <span className="shrink-0 text-[9px] text-[#8993A4]">
            {item.timestamp}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-[15px] text-[#64748B]">
          {item.description}
        </p>

        <div className="mt-1.5">
          <Badge
            variant={badgeVariants[item.type]}
            size="xs"
          >
            {item.status}
          </Badge>
        </div>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="block rounded-sm no-underline transition-colors hover:bg-[#FAFBFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B57D0]"
      >
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

export default ActivityItem;