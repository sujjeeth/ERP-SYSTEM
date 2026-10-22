"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";
import {
  ArrowRight,
  ChevronRight,
  FileText,
  ShoppingCart,
  Warehouse,
  Users,
  Settings,
  ChartNoAxesColumn,
} from "lucide-react";

import { PopoverPanel } from "@/components/ui/PopoverPanel";
import { MenuItem } from "@/components/ui/MenuItem";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

interface HomeRecentItem {
  id: string;
  label: string;
  category: string;
  time: string;
  href: string;
  icon: ReactNode;
}

interface HomeFrequentAction {
  label: string;
  href: string;
}

interface HomeMenuProps {
  trigger: ReactElement;
  onClearHistory?: () => void;
  recentItems?: HomeRecentItem[];
  frequentActions?: HomeFrequentAction[];
}

const DEFAULT_RECENT: HomeRecentItem[] = [
  {
    id: "invoice",
    label: "Invoice INV-0891",
    category: "Sales",
    time: "2 min ago",
    href: "/sales/invoices",
    icon: <FileText className="text-[#0B57D0]" />,
  },
  {
    id: "purchase-order",
    label: "New Purchase Order",
    category: "Purchases",
    time: "15 min ago",
    href: "/purchases/orders",
    icon: <ShoppingCart className="text-[#0B57D0]" />,
  },
  {
    id: "stock",
    label: "Stock Overview",
    category: "Stock",
    time: "1 hour ago",
    href: "/inventory",
    icon: <Warehouse className="text-[#059669]" />,
  },
  {
    id: "customer",
    label: "Customer: Sri Murugan Textiles",
    category: "Customers",
    time: "Yesterday",
    href: "/parties",
    icon: <Users className="text-[#0B57D0]" />,
  },
  {
    id: "gst",
    label: "GSTR-1 Summary",
    category: "GST",
    time: "Yesterday",
    href: "/gst/returns",
    icon: <Settings className="text-[#B77908]" />,
  },
  {
    id: "sales-report",
    label: "Sales Report",
    category: "Reports",
    time: "2 days ago",
    href: "/reports",
    icon: <ChartNoAxesColumn className="text-[#18794E]" />,
  },
];

const DEFAULT_ACTIONS: HomeFrequentAction[] = [
  { label: "Create Invoice", href: "/sales/invoices" },
  { label: "Stock Register", href: "/inventory" },
  { label: "Customer Ledger", href: "/accounting" },
];

export function HomeMenu({
  trigger,
  onClearHistory,
  recentItems = DEFAULT_RECENT,
  frequentActions = DEFAULT_ACTIONS,
}: HomeMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useTopBarPopup("home");
  const [recent, setRecent] = useState(recentItems);

  return (
    <PopoverPanel
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      width={274}
      padding={0}
      align="start"
      sideOffset={4}
      contentClassName="overflow-hidden rounded-[4px]"
    >
      {/* Go to Home */}
      <div className="px-1.5 py-1.5">
        <MenuItem
          icon={<span className="[&_svg]:h-[15px] [&_svg]:w-[15px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 9v12h14V9" />
              <path d="M9 21v-7h6v7" />
            </svg>
          </span>}
          label="Go to Home"
          rightContent={<ChevronRight size={13} />}
          href="/"
          onSelect={() => setOpen(false)}
          className="min-h-[28px] px-2 text-[11px] text-[#0B57D0]"
        />
      </div>

      <Separator />

      {/* Recently opened */}
      <section className="px-1.5 pb-1.5 pt-1">
        <h3 className="px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
          Recently opened
        </h3>

        <div className="space-y-0.5">
          {recent.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              href={item.href}
              label={
                <span className="flex min-w-0 items-baseline gap-1">
                  <span className="truncate text-[10px] font-medium text-[#273142]">
                    {item.label}
                  </span>

                  <span className="shrink-0 text-[9px] font-normal text-[#8993A4]">
                    {item.category}
                  </span>
                </span>
              }
              rightContent={
                <span className="whitespace-nowrap text-[8px] font-normal text-[#7A8799]">
                  {item.time}
                </span>
              }
              onSelect={() => setOpen(false)}
              className="min-h-[29px] gap-2 px-1.5 py-1"
            />
          ))}
        </div>
      </section>

      <Separator />

      {/* Frequently used */}
      <section className="px-1.5 pb-2 pt-1">
        <h3 className="px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
          Frequently used
        </h3>

        <div className="flex flex-wrap gap-1 px-1">
          {frequentActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="xs"
              height={22}
              paddingX={7}
              label={action.label}
              onClick={() => {
                setOpen(false);
                router.push(action.href);
              }}
              className="rounded-full border-[#E5E7EB] bg-[#F1F3F6] text-[9px] font-normal text-[#475569] hover:bg-[#E9EDF2]"
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="flex min-h-[28px] items-center justify-end border-t border-[#E5E7EB] bg-[#F8FAFC] px-2">
        <Button
          variant="text"
          size="xs"
          label="Clear history"
          onClick={() => {
            setRecent([]);
            onClearHistory?.();
          }}
          className="text-[9px] font-normal text-[#7A8799] hover:text-[#475569]"
        />
      </div>
    </PopoverPanel>
  );
}

export default HomeMenu;