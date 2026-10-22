"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";

import {
  FileText,
  CreditCard,
  ReceiptText,
  BookOpen,
  FileCheck,
  Settings2,
  ExternalLink,
} from "lucide-react";

import { PopoverPanel } from "@/components/ui/PopoverPanel";
import { MenuItem } from "@/components/ui/MenuItem";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

interface WatchlistEntry {
  id: string;
  label: string;
  count: number;
  href: string;
}

interface WatchlistGroupData {
  id: string;
  title: string;
  icon: ReactElement;
  items: WatchlistEntry[];
}

interface WatchlistPanelProps {
  trigger: ReactElement;
  groups?: WatchlistGroupData[];
  onConfigure?: () => void;
  onOpenOperationsCenter?: () => void;
}

const DEFAULT_GROUPS: WatchlistGroupData[] = [
  {
    id: "invoices",
    title: "Invoices",
    icon: <FileText />,
    items: [
      {
        id: "hold",
        label: "Invoices on hold",
        count: 49,
        href: "/sales/invoices",
      },
      {
        id: "approval",
        label: "Pending approval",
        count: 20,
        href: "/sales/invoices",
      },
      {
        id: "rejected",
        label: "Rejected invoices",
        count: 10,
        href: "/sales/invoices",
      },
      {
        id: "recurring",
        label: "Recurring approvals",
        count: 3,
        href: "/sales/invoices",
      },
    ],
  },
  {
    id: "payments",
    title: "Payment Files",
    icon: <CreditCard />,
    items: [
      {
        id: "correction",
        label: "Requiring correction",
        count: 4,
        href: "/accounting",
      },
      {
        id: "printing",
        label: "Waiting for printing",
        count: 10,
        href: "/accounting",
      },
      {
        id: "processing",
        label: "Pending transmission",
        count: 2,
        href: "/accounting",
      },
      {
        id: "payment-approval",
        label: "Payment process requests",
        count: 1,
        href: "/accounting",
      },
    ],
  },
  {
    id: "receipts",
    title: "Receipts & Remittances",
    icon: <ReceiptText />,
    items: [
      {
        id: "failed",
        label: "Failed settlement entries",
        count: 1,
        href: "/accounting",
      },
      {
        id: "funds",
        label: "Funds transfer errors",
        count: 4,
        href: "/accounting",
      },
      {
        id: "lockbox",
        label: "Lockbox validation errors",
        count: 1,
        href: "/accounting",
      },
    ],
  },
  {
    id: "ledger",
    title: "Journals & General Ledger",
    icon: <BookOpen />,
    items: [
      {
        id: "import",
        label: "Import errors",
        count: 3,
        href: "/accounting",
      },
      {
        id: "incomplete",
        label: "Incomplete entries",
        count: 5,
        href: "/accounting",
      },
      {
        id: "posting",
        label: "Pending approval",
        count: 2,
        href: "/accounting",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing Transactions",
    icon: <ReceiptText />,
    items: [
      {
        id: "automation",
        label: "Automation errors",
        count: 135,
        href: "/sales/invoices",
      },
      {
        id: "incomplete-billing",
        label: "Incomplete transactions",
        count: 120,
        href: "/sales/invoices",
      },
      {
        id: "adjustments",
        label: "Adjustments pending",
        count: 70,
        href: "/accounting",
      },
    ],
  },
  {
    id: "contracts",
    title: "Contracts & E-Invoicing",
    icon: <FileCheck />,
    items: [
      {
        id: "contracts",
        label: "Expiring / expiring soon",
        count: 2,
        href: "/gst",
      },
      {
        id: "einvoice",
        label: "E-Invoice processing",
        count: 4,
        href: "/gst",
      },
    ],
  },
];

export function WatchlistPanel({
  trigger,
  groups = DEFAULT_GROUPS,
  onConfigure,
  onOpenOperationsCenter,
}: WatchlistPanelProps) {
const [open, setOpen] = useTopBarPopup("watchlist");
  return (
    <PopoverPanel
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      width="min(820px, calc(100vw - 24px))"
      padding={10}
      align="end"
      sideOffset={6}
      contentClassName="max-h-[min(75vh,620px)] overflow-y-auto"
    >
      <div className="flex items-center justify-between gap-3 px-2 py-2">
        <div>
          <h2 className="text-[12px] font-semibold text-[#273142]">
            Enterprise Watchlist
          </h2>
          <p className="mt-0.5 text-[10px] text-[#8993A4]">
            Outstanding items and operational exceptions
          </p>
        </div>

        <Button
          variant="ghost"
          size="xs"
          leftIcon={<Settings2 />}
          label="Configure"
          onClick={() => {
            setOpen(false);
            onConfigure?.();
          }}
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <section
            key={group.id}
            className="min-w-0 rounded-[5px] border border-[#E9EDF2] p-2"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[#64748B] [&_svg]:h-3.5 [&_svg]:w-3.5">
                {group.icon}
              </span>

              <h3 className="min-w-0 flex-1 text-[10px] font-semibold text-[#273142]">
                {group.title}
              </h3>
            </div>

            <div className="space-y-0.5">
              {group.items.map((item) => (
                <MenuItem
                  key={item.id}
                  label={item.label}
                  href={item.href}
                  rightContent={
                    <Badge
                      size="xs"
                      variant={item.count > 0 ? "danger" : "neutral"}
                    >
                      {item.count}
                    </Badge>
                  }
                  onSelect={() => setOpen(false)}
                  className="gap-1.5 px-1.5 py-1.5 text-[10px]"
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-2">
        <span className="text-[9px] text-[#8993A4]">
          Shortcut: Press Alt + W from anywhere
        </span>

        <Button
          variant="text"
          size="xs"
          rightIcon={<ExternalLink />}
          label="Open Operations Center"
          onClick={() => {
            setOpen(false);
            onOpenOperationsCenter?.();
          }}
        />
      </div>
    </PopoverPanel>
  );
}

export default WatchlistPanel;