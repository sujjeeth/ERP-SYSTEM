import type {
  KpiMetric,
  InvoiceRow,
  ActivityItemData,
  SalesPurchasesPoint,
  CashFlowPoint,
} from "@/types/dashboard";

export const dashboardKpis: KpiMetric[] = [
  {
    id: "sales",
    title: "Sales This Month",
    value: "₹48.9 L",
    trend: "+6.2% vs last month",
    detail: "FY 2026–27 · 142 invoices generated",
    variant: "success",
  },
  {
    id: "receivables",
    title: "Money to Collect",
    value: "₹12.4 L",
    detail: "18 unpaid invoices",
    secondaryDetail: "₹3.8 L overdue past 15 days",
    variant: "warning",
  },
  {
    id: "payables",
    title: "Bills to Pay",
    value: "₹7.8 L",
    detail: "6 vendor bills pending",
    secondaryDetail: "Next due: 16 Oct · Medisafe",
    variant: "neutral",
  },
  {
    id: "stock",
    title: "Stock Value",
    value: "₹1.2 Cr",
    detail: "286 active SKUs",
    secondaryDetail: "9 SKUs below reorder level",
    variant: "success",
  },
];

export const salesPurchasesData: SalesPurchasesPoint[] = [
  { month: "Apr", sales: 38, purchases: 25 },
  { month: "May", sales: 43, purchases: 27 },
  { month: "Jun", sales: 41, purchases: 26 },
  { month: "Jul", sales: 48, purchases: 30 },
  { month: "Aug", sales: 45, purchases: 29 },
  { month: "Sep", sales: 52, purchases: 33 },
  { month: "Oct", sales: 49, purchases: 31 },
];

export const cashFlowData: CashFlowPoint[] = [
  { month: "Apr", inflow: 7.0, outflow: 5.8 },
  { month: "May", inflow: 8.1, outflow: 6.6 },
  { month: "Jun", inflow: 7.6, outflow: 6.3 },
  { month: "Jul", inflow: 9.2, outflow: 7.0 },
  { month: "Aug", inflow: 8.4, outflow: 6.9 },
  { month: "Sep", inflow: 9.7, outflow: 7.4 },
  { month: "Oct", inflow: 8.6, outflow: 4.0 },
];

export const overdueInvoices: InvoiceRow[] = [
  {
    id: "inv-0891",
    invoiceNumber: "INV-2026-0891",
    customerName: "Sri Murugan Textiles",
    city: "Tiruppur",
    dueDate: "02 Oct 2026",
    amount: 145000,
    daysOverdue: 10,
    status: "overdue",
  },
  {
    id: "inv-0874",
    invoiceNumber: "INV-2026-0874",
    customerName: "Kongu Precision Works",
    city: "Coimbatore",
    dueDate: "28 Sep 2026",
    amount: 88400,
    daysOverdue: 14,
    status: "overdue",
  },
  {
    id: "inv-0865",
    invoiceNumber: "INV-2026-0865",
    customerName: "Meenakshi Health Agency",
    city: "Madurai",
    dueDate: "25 Sep 2026",
    amount: 112000,
    daysOverdue: 17,
    status: "overdue",
  },
  {
    id: "inv-0840",
    invoiceNumber: "INV-2026-0840",
    customerName: "Annur Weaving Mills",
    city: "Tiruppur",
    dueDate: "18 Sep 2026",
    amount: 34500,
    daysOverdue: 24,
    status: "overdue",
  },
  {
    id: "inv-0812",
    invoiceNumber: "INV-2026-0812",
    customerName: "Salem Agro Machinery",
    city: "Salem",
    dueDate: "12 Sep 2026",
    amount: 48900,
    daysOverdue: 30,
    status: "overdue",
  },
];

export const activityItems: ActivityItemData[] = [
  {
    id: "payment-1",
    type: "payment",
    title: "Payment recorded",
    description:
      "Kavitha Selvam recorded payment of ₹85,000 from Selvam Traders, Erode (NEFT ref: NB24049192)",
    timestamp: "10:42 AM",
    status: "PAYMENT RECEIVED",
    href: "/sales/receipts",
  },
  {
    id: "eway-1",
    type: "ewayBill",
    title: "E-Way Bill generated",
    description:
      "E-Way Bill generated for Shipment SH-00398 to Coimbatore Medical Center",
    timestamp: "10:30 AM",
    status: "E-WAY BILL",
    href: "/gst/eway-bills",
  },
  {
    id: "approval-1",
    type: "approval",
    title: "Purchase Order approved",
    description:
      "PO-2026-0418 approved for Medisafe Supplies (120 boxes Nitrile Gloves, ₹36,000)",
    timestamp: "09:55 AM",
    status: "PO APPROVAL",
    href: "/purchases/orders",
  },
  {
    id: "adjustment-1",
    type: "adjustment",
    title: "Stock adjustment",
    description:
      "Arun Kumar marked stock adjustment (-8 damaged boxes) at Bin A-03-02, Chennai DC",
    timestamp: "09:40 AM",
    status: "ADJUSTMENT",
    href: "/inventory/movements",
  },
  {
    id: "tax-1",
    type: "taxFiling",
    title: "GST GSTR-1 compiled",
    description:
      "GST GSTR-1 draft return compiled for September 2026 (total turnover: ₹52.4 L)",
    timestamp: "09:15 AM",
    status: "TAX FILING",
    href: "/gst/returns",
  },
];