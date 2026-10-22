"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Badge } from "@/components/ui/Badge";
import { cashFlowData } from "@/data/dashboard-mock-data";
import { formatLakhs } from "@/lib/format-currency";

export function MoneyInOutChart() {
  return (
    <ChartCard
      title="Money In vs Out"
      subtitle="Cash & Bank Collections vs Vendor Disbursements"
      chartHeight={220}
      headerMetrics={
        <Badge variant="success" size="xs">
          +₹4.6 L net positive this month
        </Badge>
      }
      legend={
        <>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#64748B]">
            <span className="h-2 w-2 rounded-sm bg-[#18794E]" />
            Inflow
          </span>

          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#64748B]">
            <span className="h-2 w-2 rounded-sm bg-[#0B57D0]" />
            Outflow
          </span>
        </>
      }
      footer={
        <p className="text-[9px] text-[#8993A4]">
          Axis: INR in Lakhs
        </p>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={cashFlowData}
          margin={{ top: 12, right: 7, left: -12, bottom: 0 }}
          barGap={3}
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
            tickFormatter={(value) => `${value}`}
            tick={{ fill: "#8993A4", fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            width={30}
          />

          <Tooltip
            formatter={(value, name) => [
              formatLakhs(Number(value)),
              name === "inflow" ? "Inflow" : "Outflow",
            ]}
            contentStyle={{
              borderRadius: 6,
              border: "1px solid #E1E5EB",
              fontSize: 11,
            }}
          />

          <Bar
            dataKey="inflow"
            name="inflow"
            fill="#18794E"
            radius={[2, 2, 0, 0]}
            maxBarSize={15}
          />

          <Bar
            dataKey="outflow"
            name="outflow"
            fill="#0B57D0"
            radius={[2, 2, 0, 0]}
            maxBarSize={15}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default MoneyInOutChart;