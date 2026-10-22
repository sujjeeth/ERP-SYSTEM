export type SalesInvoiceStatus =
  | "overdue"
  | "unpaid"
  | "paid"
  | "draft";

export type InvoiceStatusFilter =
  | "all"
  | "unpaid"
  | "overdue"
  | "paid"
  | "draft";

export interface SalesInvoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  customerName: string;
  city: string;
  location: string;
  gstin?: string;
  dueDate: string;
  dueDescription: string;
  amount: number;
  balanceDue: number;
  status: SalesInvoiceStatus;
}