"use client";

import { useState } from "react";
import {
  Archive,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Download,
  TrendingUp,
} from "lucide-react";

import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/Button";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { DateRangeSelector } from "@/components/dashboard/DateRangeSelector";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { SalesPurchasesChart } from "@/components/dashboard/SalesPurchasesChart";
import { MoneyInOutChart } from "@/components/dashboard/MoneyInOutChart";
import { OverdueInvoicesTable } from "@/components/dashboard/OverdueInvoicesTable";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

import { dashboardKpis } from "@/data/dashboard-mock-data";

const kpiIcons = {
  sales: {
    icon: <ClipboardList size={16} />,
    color: "#0B57D0",
    background: "#EAF1FF",
    detailIcon: <TrendingUp size={11} />,
    detailVariant: "success" as const,
  },
  receivables: {
    icon: <ArrowDownLeft size={16} />,
    color: "#A16207",
    background: "#FFF5E5",
    detailIcon: <Clock3 size={11} />,
    detailVariant: "warning" as const,
  },
  payables: {
    icon: <ArrowUpRight size={16} />,
    color: "#64748B",
    background: "#F1F3F6",
    detailIcon: <CalendarClock size={11} />,
    detailVariant: "neutral" as const,
  },
  stock: {
    icon: <Archive size={16} />,
    color: "#0B57D0",
    background: "#EAF1FF",
    detailIcon: <CheckCircle2 size={11} />,
    detailVariant: "success" as const,
  },
};

export default function HomePage() {
  const [dateRange, setDateRange] = useState(
    "This Month · Oct 2026"
  );

  return (
    <AppShell>
      <div className="min-w-0 space-y-3">
        <PageHeader
          title="Good morning, Kavitha"
          subtitle="Monday, 12 October 2026"
          context="Tamil Nadu Operations Overview"
          actions={
            <>
              <DateRangeSelector
                value={dateRange}
                onChange={setDateRange}
              />

              <Button
                variant="outline"
                size="xs"
                height={28}
                paddingX={8}
                gap={5}
                leftIcon={<Download />}
                label="Export"
                onClick={() => {
                  console.info("Dashboard export requested");
                }}
              />
            </>
          }
        />

        <section
          aria-label="Financial summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {dashboardKpis.map((metric) => {
            const config =
              kpiIcons[metric.id as keyof typeof kpiIcons];

            return (
              <KpiCard
                key={metric.id}
                metric={metric}
                icon={config.icon}
                iconColor={config.color}
                iconBackground={config.background}
                detailIcon={config.detailIcon}
                detailVariant={config.detailVariant}
                trendIcon={
                  metric.id === "sales"
                    ? <TrendingUp size={11} />
                    : undefined
                }
              />
            );
          })}
        </section>

        <section
          aria-label="Financial charts"
          className="grid min-w-0 grid-cols-1 gap-3 xl:grid-cols-2"
        >
          <SalesPurchasesChart />
          <MoneyInOutChart />
        </section>

        <section
          aria-label="Operational activity"
          className="grid min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-5"
        >
          <div className="min-w-0 xl:col-span-3">
            <OverdueInvoicesTable />
          </div>

          <div className="min-w-0 xl:col-span-2">
            <ActivityFeed />
          </div>
        </section>
      </div>
    </AppShell>
  );
}