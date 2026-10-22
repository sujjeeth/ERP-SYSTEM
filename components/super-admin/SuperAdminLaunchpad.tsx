
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  ArrowDownRight,
  ArrowRight,
  BellRing,
  BookOpen,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck,
  FileClock,
  FileText,
  History,
  Package,
  Plus,
  ReceiptText,
  RotateCcw,
  Star,
  Truck,
  Users,
  Zap,
  ShoppingCart,
  Tags,
  ChartNoAxesColumn,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ModuleTabBar } from "@/components/super-admin/ModuleTabBar";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MenuItem } from "@/components/ui/MenuItem";
import { KeyboardHint } from "@/components/ui/KeyboardHint";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

type StatusVariant = "neutral" | "success" | "warning" | "danger" | "info";

interface InsightItem {
  id: string;
  title: string;
  value: string;
  badge: string;
  badgeVariant: StatusVariant;
  action: string;
  href: string;
}

interface WorkspaceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  action?: string;
  color: string;
  iconBackground: string;
}

interface RecentItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  iconBackground: string;
  actionType: "star" | "history";
}

const insightItems: InsightItem[] = [
  {
    id: "sales",
    title: "Sales Today",
    value: "₹1,48,500",
    badge: "↑ 14%",
    badgeVariant: "success",
    action: "Invoices →",
    href: "/sales/invoices",
  },
  {
    id: "receivables",
    title: "Receivables Overdue",
    value: "₹13.84 L",
    badge: "6 invoices",
    badgeVariant: "danger",
    action: "Remind →",
    href: "/reports/receivables",
  },
  {
    id: "stock",
    title: "Low Stock Items",
    value: "12",
    badge: "9 critical",
    badgeVariant: "warning",
    action: "Create PO →",
    href: "/purchases/orders",
  },
  {
    id: "gst",
    title: "GSTR-1",
    value: "Due in 4d",
    badge: "Draft ready",
    badgeVariant: "info",
    action: "Review →",
    href: "/gst/returns",
  },
];

const transactionItems: WorkspaceItem[] = [
  {
    id: "quotations",
    title: "Quotations",
    description: "8 active drafts",
    icon: FileText,
    href: "/sales/quotations",
    action: "+ New",
    color: "#2563EB",
    iconBackground: "#EEF4FF",
  },
  {
    id: "orders",
    title: "Sales Orders",
    description: "18 pending dispatch",
    icon: ShoppingCart,
    href: "/sales/orders",
    action: "+ New",
    color: "#4F46E5",
    iconBackground: "#EEF2FF",
  },
  {
    id: "delivery",
    title: "Delivery Notes",
    description: "4 awaiting dispatch",
    icon: Truck,
    href: "/sales/delivery-challans",
    action: "+ New",
    color: "#0D9488",
    iconBackground: "#EAFBF8",
  },
  {
    id: "invoices",
    title: "Invoices",
    description: "142 generated this month",
    icon: ReceiptText,
    href: "/sales/invoices",
    action: "+ New",
    color: "#059669",
    iconBackground: "#E9FAF2",
  },
  {
    id: "credit-notes",
    title: "Credit Notes",
    description: "4 open adjustments",
    icon: RotateCcw,
    href: "/sales/credit-notes",
    action: "+ New",
    color: "#F43F5E",
    iconBackground: "#FFF0F2",
  },
  {
    id: "payments",
    title: "Payments Received",
    description: "64 receipts (₹42.8 L)",
    icon: CreditCard,
    href: "/sales/receipts",
    action: "+ Record",
    color: "#9333EA",
    iconBackground: "#F7EEFF",
  },
];

const masterItems: WorkspaceItem[] = [
  {
    id: "customers",
    title: "Customers",
    description: "286 active accounts",
    icon: Users,
    href: "/parties",
    action: "+ New",
    color: "#0D9488",
    iconBackground: "#EAFBF8",
  },
  {
    id: "price-lists",
    title: "Price Lists",
    description: "4 tier tariffs active",
    icon: Tags,
    href: "/sales/price-lists",
    action: "+ New",
    color: "#EA580C",
    iconBackground: "#FFF3E9",
  },
  {
    id: "items",
    title: "Items & SKUs",
    description: "1,420 registered SKUs",
    icon: Package,
    href: "/inventory/items",
    action: "+ New",
    color: "#0284C7",
    iconBackground: "#EAF7FF",
  },
];

const reportItems: WorkspaceItem[] = [
  {
    id: "sales-register",
    title: "Sales Register",
    description: "Monthly & quarterly ledger",
    icon: ChartNoAxesColumn,
    href: "/reports/sales-register",
    color: "#2563EB",
    iconBackground: "#EEF4FF",
  },
  {
    id: "receivables-report",
    title: "Outstanding Receivables",
    description: "₹13.84 L overdue balance",
    icon: Clock3,
    href: "/reports/receivables",
    color: "#E11D48",
    iconBackground: "#FFF0F2",
  },
  {
    id: "customer-ledger",
    title: "Customer Ledger",
    description: "Party-wise statement & aging",
    icon: BookOpen,
    href: "/accounting/customer-ledger",
    color: "#4F46E5",
    iconBackground: "#EEF2FF",
  },
];

const quickActions = [
  { label: "Create Invoice", shortcut: ["Alt+N"], href: "/sales/invoices" },
  { label: "Create Purchase Order", shortcut: ["Alt+P"], href: "/purchases/orders" },
  { label: "Add Item", shortcut: ["Alt+I"], href: "/inventory/items" },
  { label: "Record Payment", shortcut: ["Alt+R"], href: "/sales/receipts" },
  { label: "New Customer", shortcut: ["Alt+C"], href: "/parties" },
];

const recentItems: RecentItem[] = [
  {
    id: "invoice",
    title: "INV-2026-0891",
    description: "Sri Murugan Textiles · ₹1.45 L",
    href: "/sales/invoices",
    icon: ReceiptText,
    color: "#059669",
    iconBackground: "#E9FAF2",
    actionType: "star",
  },
  {
    id: "purchase-order",
    title: "PO-2026-0418",
    description: "Medisafe Supplies · 120 boxes",
    href: "/purchases/orders",
    icon: Archive,
    color: "#6366F1",
    iconBackground: "#EEF2FF",
    actionType: "star",
  },
  {
    id: "stock",
    title: "GLV-NTR-M",
    description: "Nitrile Gloves Medium · Bin A-03",
    href: "/inventory/items",
    icon: Package,
    color: "#0284C7",
    iconBackground: "#EAF7FF",
    actionType: "star",
  },
  {
    id: "sales-order",
    title: "SO-2026-1842",
    description: "Citycare Clinic · Due Today",
    href: "/sales/orders",
    icon: ShoppingCart,
    color: "#2563EB",
    iconBackground: "#EEF4FF",
    actionType: "history",
  },
  {
    id: "customer",
    title: "Selvam Traders",
    description: "Payment ₹85,000 received",
    href: "/sales/receipts",
    icon: Users,
    color: "#0D9488",
    iconBackground: "#EAFBF8",
    actionType: "history",
  },
  {
    id: "gst",
    title: "GSTR-1 Sept 2026",
    description: "Draft compiled · ₹52.4 L",
    href: "/gst/returns",
    icon: FileCheck,
    color: "#EA580C",
    iconBackground: "#FFF3E9",
    actionType: "history",
  },
];

function SectionHeading({
  title,
  count,
  href,
}: {
  title: string;
  count: string;
  href?: string;
}) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#334155]">
          {title}
        </h2>
        <Badge
          variant="neutral"
          size="xs"
          className="bg-[#EEF2F7] text-[#8A97AA]"
        >
          {count}
        </Badge>
      </div>

      {href && (
        <Link
          href={href}
          className="shrink-0 text-[10px] font-medium text-[#0B57D0] hover:underline"
        >
          View all
        </Link>
      )}
    </div>
  );
}

function InsightCard({ item }: { item: InsightItem }) {
  return (
    <Card
      padding="sm"
      className="flex min-w-0 flex-col justify-between rounded-[8px] border-[#E5EAF1] bg-white"
    >
      <div className="flex items-center justify-between gap-1">
        <span className="truncate text-[9px] font-medium text-[#64748B]">
          {item.title}
        </span>
        <Badge variant={item.badgeVariant} size="xs">
          {item.badge}
        </Badge>
      </div>

      <p className="mt-1.5 text-[14px] font-semibold leading-5 tabular-nums text-[#17243A]">
        {item.value}
      </p>

      <div className="mt-1 flex justify-end">
        <Link
          href={item.href}
          className="text-[9px] font-medium text-[#0B57D0] hover:underline"
        >
          {item.action}
        </Link>
      </div>
    </Card>
  );
}

function WorkspaceTile({ item }: { item: WorkspaceItem }) {
  const Icon = item.icon;

  return (
    <Card className="min-w-0 rounded-[8px] border-[#E2E8F0] bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-[#CBD8EA]">
      <Link
        href={item.href}
        className="block min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B57D0]"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-[5px]"
          style={{
            color: item.color,
            backgroundColor: item.iconBackground,
          }}
        >
          <Icon size={13} strokeWidth={1.9} />
        </span>

        <span className="mt-2 block truncate text-[10px] font-medium leading-4 text-[#17243A]">
          {item.title}
        </span>

        <span className="mt-0.5 flex min-w-0 items-center justify-between gap-1">
          <span className="min-w-0 truncate text-[9px] leading-3 text-[#718198]">
            {item.description}
          </span>

          {item.action && (
            <span className="shrink-0 text-[9px] font-medium text-[#0B57D0]">
              {item.action}
            </span>
          )}
        </span>
      </Link>
    </Card>
  );
}

function QuickActionsPanel() {
  const router = useRouter();

  return (
    <Card className="overflow-hidden rounded-[8px] border-[#E2E8F0] bg-white p-3">
      <CardHeader className="mb-2.5 gap-2 border-b border-[#EEF2F7] pb-2.5">
        <CardTitle className="flex items-center gap-2 text-[10px] uppercase tracking-[0.05em]">
          <Zap size={12} className="text-[#F59E0B]" fill="#F59E0B" />
          Quick Actions
        </CardTitle>
      </CardHeader>

      <div className="space-y-0.5">
        {quickActions.map((action, index) => (
          <MenuItem
            key={action.label}
            icon={
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full",
                  index === 0
                    ? "bg-[#EEF4FF] text-[#0B57D0]"
                    : index === 1
                      ? "bg-[#F1F0FF] text-[#6366F1]"
                      : index === 2
                        ? "bg-[#EAF7FF] text-[#0284C7]"
                        : index === 3
                          ? "bg-[#E9FAF2] text-[#059669]"
                          : "bg-[#FFF3E9] text-[#EA580C]"
                )}
              >
                <Plus size={10} />
              </span>
            }
            label={action.label}
            href={action.href}
            rightContent={<KeyboardHint keys={action.shortcut} />}
            className="min-h-[29px] rounded-[4px] px-1 py-1 text-[9px]"
          />
        ))}
      </div>

      <Separator className="mt-2" />

      <Button
        variant="text"
        size="sm"
        fullWidth
        height={27}
        label="All actions"
        onClick={() => router.push("/super-admin/actions")}
        className="mt-1 justify-center text-[9px]"
      />
    </Card>
  );
}

function PinnedRecentPanel() {
  return (
    <Card className="rounded-[8px] border-[#E2E8F0] bg-white p-3">
      <CardHeader className="mb-2.5 gap-2 border-b border-[#EEF2F7] pb-2.5">
        <CardTitle className="flex items-center gap-2 text-[10px] uppercase tracking-[0.05em]">
          <BookOpen size={12} className="text-[#64748B]" />
          Pinned & Recent
        </CardTitle>

        <Link
          href="/super-admin/recent"
          className="text-[9px] font-medium text-[#0B57D0] hover:underline"
        >
          View all
        </Link>
      </CardHeader>

      <div className="space-y-0.5">
        {recentItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex min-w-0 items-center gap-2 rounded-[4px] px-1 py-1.5 hover:bg-[#F8FAFC]"
            >
              <span
                className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px]"
                style={{
                  backgroundColor: item.iconBackground,
                  color: item.color,
                }}
              >
                <Icon size={11} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[9px] font-medium leading-4 text-[#17243A]">
                  {item.title}
                </span>
                <span className="block truncate text-[8px] leading-3 text-[#7A8799]">
                  {item.description}
                </span>
              </span>

              {item.actionType === "star" ? (
                <Star
                  size={11}
                  fill="#F59E0B"
                  className="shrink-0 text-[#F59E0B]"
                />
              ) : (
                <History
                  size={11}
                  className="shrink-0 text-[#9AA7B8]"
                />
              )}
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export function SuperAdminLaunchpad() {
  return (
    <div className="-mx-3 -mt-3 min-w-0 bg-[#F8FAFC] lg:-mx-[14px] lg:-mt-[14px]">
      <ModuleTabBar />

      <div className="space-y-4 px-3 pb-4 pt-4 lg:px-4">
        {/* INSIGHTS */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#334155]">
              Insights
            </h2>
            <Badge
              variant="neutral"
              size="xs"
              className="bg-[#EEF2F7] text-[#8A97AA]"
            >
              Today
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {insightItems.map((item) => (
              <InsightCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* MAIN LAUNCHPAD GRID */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-12">
          <div className="min-w-0 space-y-4 xl:col-span-8">
            {/* TRANSACTIONS */}
            <section>
              <SectionHeading
                title="Transactions"
                count="6 Workspaces"
                href="/sales"
              />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {transactionItems.map((item) => (
                  <WorkspaceTile key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* MASTERS */}
            <section>
              <SectionHeading
                title="Masters"
                count="3 Registers"
                href="/parties"
              />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {masterItems.map((item) => (
                  <WorkspaceTile key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* REPORTS */}
            <section>
              <SectionHeading
                title="Reports"
                count="3 Ledgers"
                href="/reports"
              />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {reportItems.map((item) => (
                  <WorkspaceTile key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>

          <aside className="min-w-0 space-y-3 xl:col-span-4">
            <QuickActionsPanel />
            <PinnedRecentPanel />
          </aside>
        </div>
      </div>

      {/* Keyboard hints along the launchpad footer */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-[#DCE4EE] bg-white px-3 py-2 text-[9px] text-[#718198]">
        <span className="inline-flex items-center gap-1">
          <KeyboardHint keys={["Ctrl", "K"]} />
          Search
        </span>

        <span className="inline-flex items-center gap-1">
          <KeyboardHint keys={["Alt", "N"]} />
          New Invoice
        </span>

        <span className="inline-flex items-center gap-1">
          <KeyboardHint keys={["Alt", "P"]} />
          New PO
        </span>

        <span>Press 1–6 to switch modules</span>
      </div>
    </div>
  );
}

export default SuperAdminLaunchpad;
