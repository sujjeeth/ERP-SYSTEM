"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Plus,
} from "lucide-react";

import { AppShell } from "@/components/shell/AppShell";
import { Button } from "@/components/ui/Button";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { DateRangeSelector } from "@/components/dashboard/DateRangeSelector";
import { InvoiceStatCard } from "@/components/sales-invoices/InvoiceStatCard";
import { InvoiceRegister } from "@/components/sales-invoices/InvoiceRegister";

import { invoiceSummary, salesInvoices } from "@/data/sales-invoices-mock";
import { formatINR } from "@/lib/format-currency";

function exportInvoicesCSV() {
  const header = [
    "Invoice Number",
    "Issue Date",
    "Customer",
    "City",
    "Location",
    "GSTIN",
    "Due Date",
    "Amount",
    "Balance Due",
    "Status",
  ];

  const rows = salesInvoices.map((invoice) => [
    invoice.invoiceNumber,
    invoice.issueDate,
    invoice.customerName,
    invoice.city,
    invoice.location,
    invoice.gstin ?? "",
    invoice.dueDate,
    invoice.amount,
    invoice.balanceDue,
    invoice.status,
  ]);

  const csv = [header, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "sales-invoices.csv";
  anchor.click();

  URL.revokeObjectURL(url);
}

export default function SalesInvoicesPage() {
  const router = useRouter();

  const [dateRange, setDateRange] = useState(
    "This Month · Oct 2026"
  );

  return (
    <AppShell>
      <div className="min-w-0 space-y-3">
        {/* Page heading and actions */}
        <PageHeader
          title="Sales Invoices"
          subtitle="October 2026"
          context="Billing & collections as of Monday, 12 October 2026"
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
                leftIcon={<Download size={12} />}
                label="Export"
                onClick={exportInvoicesCSV}
              />

              <Button
                variant="primary"
                size="xs"
                height={28}
                paddingX={9}
                gap={5}
                leftIcon={<Plus size={12} />}
                label="New Invoice"
                onClick={() => router.push("/sales/invoices/new")}
              />
            </>
          }
        />

        {/* Invoice summary cards */}
        <section
          aria-label="Invoice summary"
          className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <InvoiceStatCard
            title="Total invoices"
            value={String(invoiceSummary.total)}
            description="Across all invoice statuses"
            icon={<FileText size={14} />}
            iconColor="#2563EB"
            iconBackground="#EEF4FF"
          />

          <InvoiceStatCard
            title="Unpaid invoices"
            value={String(invoiceSummary.unpaid)}
            description="13 not yet due + 5 overdue"
            icon={<Clock3 size={14} />}
            iconColor="#B77908"
            iconBackground="#FFF6E5"
          />

          <InvoiceStatCard
            title="Overdue invoices"
            value={String(invoiceSummary.overdue)}
            description={`${formatINR(invoiceSummary.overdueAmount)} outstanding · Follow-up required`}
            icon={<AlertCircle size={14} />}
            iconColor="#DC2626"
            iconBackground="#FFF0F0"
            descriptionColor="#DC2626"
          />

          <InvoiceStatCard
            title="Paid invoices"
            value={String(invoiceSummary.paid)}
            description="Fully settled · No balance outstanding"
            icon={<CheckCircle2 size={14} />}
            iconColor="#059669"
            iconBackground="#E9FAF2"
          />
        </section>

        {/* Filterable invoice register */}
        <InvoiceRegister />
      </div>
    </AppShell>
  );
}