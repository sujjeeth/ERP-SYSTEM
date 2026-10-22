import type { ReactNode } from "react";

export type KpiStatus =
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  trend?: string;
  detail: string;
  secondaryDetail?: string;
  variant?: KpiStatus;
}

export interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  customerName: string;
  city: string;
  dueDate: string;
  amount: number;
  daysOverdue: number;
  status: "overdue" | "paid" | "pending";
}

export type ActivityType =
  | "payment"
  | "ewayBill"
  | "approval"
  | "adjustment"
  | "taxFiling";

export interface ActivityItemData {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  status: string;
  href?: string;
}

export interface SalesPurchasesPoint {
  month: string;
  sales: number;
  purchases: number;
}

export interface CashFlowPoint {
  month: string;
  inflow: number;
  outflow: number;
}

export interface DashboardContentProps {
  children?: ReactNode;
}