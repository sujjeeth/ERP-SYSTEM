"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/tables/DataTable";
import { TableSummary } from "@/components/tables/TableSummary";
import { InvoiceActions } from "@/components/dashboard/InvoiceActions";

import { overdueInvoices } from "@/data/dashboard-mock-data";
import { formatINR } from "@/lib/format-currency";
import type { InvoiceRow } from "@/types/dashboard";

interface OverdueInvoicesTableProps {
  invoices?: InvoiceRow[];
  onRemind?: (invoiceId: string) => void;
  onBatchReminders?: () => void;
  onViewAll?: () => void;
  loading?: boolean;
}

export function OverdueInvoicesTable({
  invoices = overdueInvoices,
  onRemind,
  onBatchReminders,
  onViewAll,
  loading = false,
}: OverdueInvoicesTableProps) {
  const columns = [
    {
      id: "invoice",
      header: "Invoice #",
      cell: (invoice: InvoiceRow) => (
        <Link
          href={`/sales/invoices/${invoice.id}`}
          className="text-[10px] font-semibold text-[#0B57D0] hover:underline"
        >
          {invoice.invoiceNumber}
        </Link>
      ),
    },
    {
      id: "customer",
      header: "Customer & City",
      cell: (invoice: InvoiceRow) => (
        <div className="min-w-[125px]">
          <p className="text-[10px] font-medium text-[#273142]">
            {invoice.customerName}
          </p>
          <p className="mt-0.5 text-[9px] text-[#8993A4]">
            {invoice.city}
          </p>
        </div>
      ),
    },
    {
      id: "dueDate",
      header: "Due Date",
      cell: (invoice: InvoiceRow) => (
        <div className="whitespace-nowrap">
          <p className="text-[10px] text-[#475569]">
            {invoice.dueDate}
          </p>
          <p className="mt-0.5 text-[9px] text-[#DC2626]">
            {invoice.daysOverdue} days ago
          </p>
        </div>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      align: "right" as const,
      cell: (invoice: InvoiceRow) => (
        <span className="whitespace-nowrap text-[10px] font-semibold tabular-nums text-[#273142]">
          {formatINR(invoice.amount)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: () => (
        <Badge variant="danger" size="xs" appearance="outline">
          Overdue
        </Badge>
      ),
    },
    {
      id: "action",
      header: "Action",
      align: "right" as const,
      cell: (invoice: InvoiceRow) => (
        <InvoiceActions
          invoiceId={invoice.id}
          onRemind={onRemind}
        />
      ),
    },
  ];

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="gap-2 border-b border-[#E9EDF2] px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <CardTitle className="shrink-0 text-[12px]">
            Overdue Invoices
          </CardTitle>

          <Badge
            variant="danger"
            appearance="outline"
            size="xs"
          >
            {invoices.length} Overdue
          </Badge>
        </div>

        <Button
          variant="text"
          size="xs"
          rightIcon={<ArrowRight />}
          label="View all invoices"
          onClick={
            onViewAll ??
            (() => {
              window.location.href = "/sales/invoices";
            })
          }
          className="shrink-0"
        />
      </CardHeader>

      <DataTable
        columns={columns}
        data={invoices}
        getRowId={(invoice) => invoice.id}
        loading={loading}
        emptyLabel="No overdue invoices"
      />

      <div className="border-t border-[#E9EDF2] px-3 py-2.5">
        <TableSummary
          text={`Showing ${invoices.length} of ${invoices.length} overdue items`}
          secondaryText="Automatic WhatsApp reminders enabled"
          actions={
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Mail />}
              label={`Send Batch Reminders (${invoices.length})`}
              onClick={onBatchReminders}
            />
          }
        />
      </div>
    </Card>
  );
}

export default OverdueInvoicesTable;