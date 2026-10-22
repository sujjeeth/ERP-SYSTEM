
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeftRight,
  Barcode,
  Banknote,
  BookOpen,
  Building2,
  CalendarDays,
  ChartNoAxesColumn,
  ChevronDown,
  CreditCard,
  FileCheck,
  FileClock,
  FileMinus,
  FileText,
  Landmark,
  Package,
  PackageCheck,
  Printer,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Tags,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { MenuItem } from "@/components/ui/MenuItem";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

interface ModuleLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface ModuleGroup {
  title: string;
  items: ModuleLink[];
}

interface ModuleConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  groups: ModuleGroup[];
}

const MODULES: ModuleConfig[] = [
  {
    id: "sales",
    label: "Sales",
    icon: ReceiptText,
    href: "/sales",
    groups: [
      {
        title: "TRANSACTIONS",
        items: [
          { label: "Quotations", href: "/sales/quotations", icon: FileText },
          { label: "Sales Orders", href: "/sales/orders", icon: ShoppingCart },
          { label: "Delivery Notes", href: "/sales/delivery-challans", icon: Truck },
          { label: "Invoices", href: "/sales/invoices", icon: ReceiptText },
          { label: "Credit Notes", href: "/sales/credit-notes", icon: FileMinus },
          { label: "Payments Received", href: "/sales/receipts", icon: CreditCard },
        ],
      },
      {
        title: "MASTERS",
        items: [
          { label: "Customers", href: "/parties", icon: Users },
          { label: "Price Lists", href: "/sales/price-lists", icon: Tags },
          { label: "Items & SKUs", href: "/inventory/items", icon: Package },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { label: "Sales Register", href: "/reports/sales-register", icon: ChartNoAxesColumn },
          { label: "Outstanding Receivables", href: "/reports/receivables", icon: FileClock },
          { label: "Customer Ledger", href: "/accounting/customer-ledger", icon: BookOpen },
        ],
      },
    ],
  },
  {
    id: "purchases",
    label: "Purchases",
    icon: ShoppingCart,
    href: "/purchases",
    groups: [
      {
        title: "TRANSACTIONS",
        items: [
          { label: "Purchase Orders", href: "/purchases/orders", icon: ReceiptText },
          { label: "Vendor Bills", href: "/purchases/bills", icon: FileText },
          { label: "Goods Received", href: "/purchases/grn", icon: PackageCheck },
          { label: "Debit Notes", href: "/purchases/debit-notes", icon: FileMinus },
        ],
      },
      {
        title: "MASTERS",
        items: [
          { label: "Vendor Directory", href: "/purchases/vendors", icon: Building2 },
          { label: "Items & SKUs", href: "/inventory/items", icon: Package },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { label: "Purchase Register", href: "/reports/purchases", icon: ChartNoAxesColumn },
          { label: "GSTR-2B Reconciliation", href: "/gst/reconciliation", icon: FileCheck },
        ],
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Warehouse,
    href: "/inventory",
    groups: [
      {
        title: "STOCK",
        items: [
          { label: "Items & SKUs", href: "/inventory/items", icon: Package },
          { label: "Stock by Location", href: "/inventory/locations", icon: Warehouse },
          { label: "Stock Movement Log", href: "/inventory/movements", icon: ArrowLeftRight },
          { label: "Reorder Alerts", href: "/inventory/reorder-alerts", icon: AlertTriangle },
        ],
      },
      {
        title: "OPERATIONS",
        items: [
          { label: "Barcode / QR Registry", href: "/inventory/barcodes", icon: Barcode },
          { label: "Print SKU Batch Labels", href: "/inventory/print-labels", icon: Printer },
          { label: "Goods Received", href: "/purchases/grn", icon: PackageCheck },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { label: "Stock Register", href: "/reports/stock-register", icon: FileText },
          { label: "Stock Valuation", href: "/reports/stock-valuation", icon: ChartNoAxesColumn },
        ],
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: Landmark,
    href: "/accounting",
    groups: [
      {
        title: "ACCOUNTS",
        items: [
          { label: "Chart of Accounts", href: "/accounting/chart-of-accounts", icon: BookOpen },
          { label: "Cash & Bank Books", href: "/accounting/cash-bank", icon: Banknote },
          { label: "Journals", href: "/accounting/journals", icon: FileText },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { label: "Trial Balance & P&L", href: "/accounting/reports", icon: ChartNoAxesColumn },
          { label: "Customer Ledger", href: "/accounting/customer-ledger", icon: Users },
        ],
      },
    ],
  },
  {
    id: "gst",
    label: "GST",
    icon: ShieldCheck,
    href: "/gst",
    groups: [
      {
        title: "GST RETURNS",
        items: [
          { label: "GSTR-1", href: "/gst/returns", icon: FileText },
          { label: "GSTR-3B", href: "/gst/returns", icon: FileCheck },
          { label: "GSTR-2B Reconciliation", href: "/gst/reconciliation", icon: ArrowLeftRight },
        ],
      },
      {
        title: "E-WAY BILLS",
        items: [
          { label: "E-Way Bill Portal", href: "/gst/eway-bills", icon: Truck },
          { label: "E-Way Bill History", href: "/gst/eway-bills/history", icon: CalendarDays },
        ],
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: ChartNoAxesColumn,
    href: "/reports",
    groups: [
      {
        title: "SALES REPORTS",
        items: [
          { label: "Sales Register", href: "/reports/sales-register", icon: ChartNoAxesColumn },
          { label: "Outstanding Receivables", href: "/reports/receivables", icon: FileClock },
          { label: "Customer Ledger", href: "/accounting/customer-ledger", icon: BookOpen },
        ],
      },
      {
        title: "STOCK & PURCHASES",
        items: [
          { label: "Stock Register", href: "/reports/stock-register", icon: Package },
          { label: "Purchase Register", href: "/reports/purchases", icon: ReceiptText },
        ],
      },
    ],
  },
];

interface ModuleMegaMenuProps {
  module: ModuleConfig;
  onNavigate: () => void;
}

function ModuleMegaMenu({
  module,
  onNavigate,
}: ModuleMegaMenuProps) {
  return (
    <div
      className="absolute left-0 top-full z-[120] mt-0.5 w-[min(440px,calc(100vw-24px))] overflow-hidden rounded-[7px] border border-[#E1E5EB] bg-white text-[#273142] shadow-[0_10px_28px_rgba(15,23,42,0.16)]"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div
        className="grid gap-3 p-3"
        style={{
          gridTemplateColumns: `repeat(${module.groups.length}, minmax(0, 1fr))`,
        }}
      >
        {module.groups.map((group) => (
          <section key={group.title} className="min-w-0">
            <h3 className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
              {group.title}
            </h3>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <MenuItem
                    key={item.label}
                    icon={<Icon />}
                    label={item.label}
                    href={item.href}
                    onSelect={onNavigate}
                    className="min-h-[25px] rounded-[4px] px-1.5 py-1 text-[10px]"
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-2 bg-[#FAFBFD] px-3 py-2">
        <Link
          href={module.href}
          onClick={onNavigate}
          className="text-[10px] font-medium text-[#0B57D0] hover:underline"
        >
          Open {module.label} home →
        </Link>

        <span className="whitespace-nowrap text-[9px] text-[#94A3B8]">
          Esc to close · Press 1 to jump
        </span>
      </div>
    </div>
  );
}

export function ModuleTabBar() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [pinnedModule, setPinnedModule] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const closeMenus = () => {
    clearCloseTimer();
    setHoveredModule(null);
    setPinnedModule(null);
  };

  const scheduleClose = () => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setHoveredModule(null);
      closeTimer.current = null;
    }, 160);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setPinnedModule(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="sticky top-[44px] z-30 -mx-3 -mt-3 lg:-mx-[14px] lg:-mt-[14px]"
    >
      <nav
        aria-label="ERP modules"
        className="flex h-[32px] min-w-0 items-center gap-1 overflow-visible border-b border-[#E5E7EB] bg-white px-2"
      >
        {MODULES.map((module) => {
          const Icon = module.icon;
          const isOpen =
            hoveredModule === module.id ||
            pinnedModule === module.id;

          return (
            <div
              key={module.id}
              className="relative h-full shrink-0"
              onMouseEnter={() => {
                clearCloseTimer();
                setHoveredModule(module.id);
              }}
              onMouseLeave={scheduleClose}
            >
              <Button
                variant="ghost"
                size="xs"
                height={32}
                paddingX={8}
                gap={5}
                leftIcon={
                  <Icon
                    size={12}
                    className={isOpen ? "text-[#0B57D0]" : "text-[#64748B]"}
                  />
                }
                label={module.label}
                rightIcon={<ChevronDown size={10} />}
                aria-expanded={isOpen}
                onClick={() => {
                  clearCloseTimer();
                  setPinnedModule((current) =>
                    current === module.id ? null : module.id
                  );
                }}
                className={cn(
                  "relative rounded-none border-0 bg-transparent",
                  "text-[10px] font-medium",
                  isOpen
                    ? "text-[#0B57D0] after:absolute after:inset-x-1 after:bottom-0 after:h-[2px] after:bg-[#0B57D0]"
                    : "text-[#475569] hover:bg-[#F8FAFC]"
                )}
              />

              {isOpen && (
                <ModuleMegaMenu
                  module={module}
                  onNavigate={closeMenus}
                />
              )}
            </div>
          );
        })}

        <div className="min-w-2 flex-1" />

        <div className="hidden shrink-0 items-center gap-2 pr-2 text-[9px] text-[#64748B] sm:flex">
          <span>Tamil Nadu Operations</span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="font-medium text-[#475569]">
            FY 2026-27
          </span>
        </div>
      </nav>
    </div>
  );
}

export default ModuleTabBar;
