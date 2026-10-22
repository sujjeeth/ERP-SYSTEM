"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Badge } from "@/components/ui/Badge";
import { salesPurchasesData } from "@/data/dashboard-mock-data";
import { formatLakhs } from "@/lib/format-currency";

export function SalesPurchasesChart() {
  return (
    <ChartCard
      title="Sales vs Purchases"
      subtitle="Apr 2026 – Oct 2026 (7 Months FY Trend)"
      chartHeight={220}
      headerMetrics={
        <div className="flex items-start gap-3">
          <div className="text-right">
            <p className="text-[8px] leading-3 text-[#64748B]">
              SALES
            </p>
            <p className="whitespace-nowrap text-[10px] font-semibold text-[#0B57D0]">
              ₹2.84 Cr
            </p>
          </div>

          <div className="text-right">
            <p className="text-[8px] leading-3 text-[#64748B]">
              PURCHASES
            </p>
            <p className="whitespace-nowrap text-[10px] font-semibold text-[#273142]">
              ₹1.92 Cr
            </p>
          </div>
        </div>
      }
      legend={
        <>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#64748B]">
            <span className="h-0.5 w-4 rounded bg-[#0B57D0]" />
            Sales Revenue
          </span>

          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#64748B]">
            <span className="w-4 border-t-2 border-dashed border-[#9CA3AF]" />
            Raw Material Purchase
          </span>

          <Badge
            variant="success"
            size="xs"
            className="ml-auto"
          >
            Gross Spread: +32.4%
          </Badge>
        </>
      }
      footer={
        <p className="text-[9px] text-[#8993A4]">
          Values shown in INR Lakhs
        </p>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={salesPurchasesData}
          margin={{ top: 12, right: 7, left: -12, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#E9EDF2"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#8993A4", fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: "#E1E5EB" }}
          />

          <YAxis
            tickFormatter={(value) => `₹${value}`}
            tick={{ fill: "#8993A4", fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            width={36}
          />

          <Tooltip
            formatter={(value, name) => [
              formatLakhs(Number(value)),
              name === "sales"
                ? "Sales Revenue"
                : "Raw Material Purchase",
            ]}
            contentStyle={{
              borderRadius: 6,
              border: "1px solid #E1E5EB",
              fontSize: 11,
            }}
          />

          <Line
            type="monotone"
            dataKey="sales"
            name="sales"
            stroke="#0B57D0"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="purchases"
            name="purchases"
            stroke="#9CA3AF"
            strokeWidth={1.7}
            strokeDasharray="5 4"
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default SalesPurchasesChart;