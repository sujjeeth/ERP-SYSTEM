"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowDownUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  FileText,
  Mail,
  Search,
  SlidersHorizontal,
  Send,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";

import { DataTable } from "@/components/tables/DataTable";
import type { DataTableColumn } from "@/components/tables/DataTable";

import { formatINR } from "@/lib/format-currency";
import { invoiceSummary, salesInvoices } from "@/data/sales-invoices-mock";
import type {
  InvoiceStatusFilter,
  SalesInvoice,
  SalesInvoiceStatus,
} from "@/types/sales-invoice";

const PAGE_SIZE = 10;

const tabs: {
  id: InvoiceStatusFilter;
  label: string;
  count: number;
}[] = [
  { id: "all", label: "All", count: invoiceSummary.total },
  { id: "unpaid", label: "Unpaid", count: invoiceSummary.unpaid },
  { id: "overdue", label: "Overdue", count: invoiceSummary.overdue },
  { id: "paid", label: "Paid", count: invoiceSummary.paid },
  { id: "draft", label: "Drafts", count: invoiceSummary.drafts },
];

const statusDisplay: Record<
  SalesInvoiceStatus,
  { label: string; variant: "danger" | "warning" | "success" | "neutral" }
> = {
  overdue: { label: "Overdue", variant: "danger" },
  unpaid: { label: "Unpaid", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  draft: { label: "Draft", variant: "neutral" },
};

function formatDateForDisplay(date: string) {
  return date;
}

export function InvoiceRegister() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<InvoiceStatusFilter>("all");

  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState("all");
  const [statusSelect, setStatusSelect] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priority, setPriority] = useState(false);
  const [onlyLongOverdue, setOnlyLongOverdue] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notice, setNotice] = useState("");

  const customerOptions = useMemo(
    () => [...new Set(salesInvoices.map((invoice) => invoice.customerName))],
    []
  );

  const filteredInvoices = useMemo(() => {
    const needle = search.trim().toLowerCase();

    const result = salesInvoices.filter((invoice) => {
      const matchesSearch =
        !needle ||
        [
          invoice.invoiceNumber,
          invoice.customerName,
          invoice.city,
          invoice.location,
          invoice.gstin ?? "",
        ].some((value) => value.toLowerCase().includes(needle));

      const matchesCustomer =
        customer === "all" || invoice.customerName === customer;

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "unpaid" &&
          (invoice.status === "unpaid" ||
            invoice.status === "overdue")) ||
        invoice.status === activeTab;

      const matchesStatus =
        statusSelect === "all" ||
        invoice.status === statusSelect;

      const matchesLongOverdue =
        !onlyLongOverdue ||
        (invoice.status === "overdue" &&
          Number.parseInt(invoice.dueDescription, 10) >= 15);

      return (
        matchesSearch &&
        matchesCustomer &&
        matchesTab &&
        matchesStatus &&
        matchesLongOverdue
      );
    });

    if (priority) {
      result.sort((a, b) => {
        const overdueDifference =
          Number(b.status === "overdue") -
          Number(a.status === "overdue");

        return overdueDifference || b.balanceDue - a.balanceDue;
      });
    }

    return result;
  }, [
    search,
    customer,
    activeTab,
    statusSelect,
    onlyLongOverdue,
    priority,
  ]);

  const isFiltered =
    Boolean(search.trim()) ||
    customer !== "all" ||
    statusSelect !== "all" ||
    onlyLongOverdue;

  const totalCount = isFiltered
    ? filteredInvoices.length
    : tabs.find((tab) => tab.id === activeTab)?.count ??
      invoiceSummary.total;

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const visibleInvoices =
    currentPage === 1
      ? filteredInvoices.slice(0, PAGE_SIZE)
      : [];

  const selectedVisibleCount = visibleInvoices.filter((invoice) =>
    selectedIds.includes(invoice.id)
  ).length;

  const allVisibleSelected =
    visibleInvoices.length > 0 &&
    selectedVisibleCount === visibleInvoices.length;

  function selectAll(checked: boolean) {
    const visibleIds = visibleInvoices.map((invoice) => invoice.id);

    setSelectedIds((current) =>
      checked
        ? [...new Set([...current, ...visibleIds])]
        : current.filter((id) => !visibleIds.includes(id))
    );
  }

  function selectInvoice(id: string, checked: boolean) {
    setSelectedIds((current) =>
      checked
        ? [...current, id]
        : current.filter((selectedId) => selectedId !== id)
    );
  }

  function changeTab(tab: InvoiceStatusFilter) {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds([]);
    setNotice("");
  }

  function handleExport() {
    const header = [
      "Invoice Number",
      "Issue Date",
      "Customer",
      "City",
      "Due Date",
      "Amount",
      "Balance Due",
      "Status",
    ];

    const lines = filteredInvoices.map((invoice) => [
      invoice.invoiceNumber,
      invoice.issueDate,
      invoice.customerName,
      invoice.city,
      invoice.dueDate,
      invoice.amount,
      invoice.balanceDue,
      statusDisplay[invoice.status].label,
    ]);

    const csv = [header, ...lines]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
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

  const columns: DataTableColumn<SalesInvoice>[] = [
    {
      id: "select",
      header: (
        <input
          type="checkbox"
          aria-label="Select all visible invoices"
          checked={allVisibleSelected}
          onChange={(event) => selectAll(event.target.checked)}
          className="h-3 w-3 accent-[#0B57D0]"
        />
      ),
      width: "32px",
      cell: (invoice) => (
        <input
          type="checkbox"
          aria-label={`Select ${invoice.invoiceNumber}`}
          checked={selectedIds.includes(invoice.id)}
          onChange={(event) =>
            selectInvoice(invoice.id, event.target.checked)
          }
          className="h-3 w-3 accent-[#0B57D0]"
        />
      ),
    },
    {
      id: "invoice",
      header: "Invoice # / Date",
      width: "132px",
      cell: (invoice) => (
        <div className="min-w-0">
          <Link
            href={`/sales/invoices/${invoice.id}`}
            className="block truncate text-[9px] font-semibold text-[#0B57D0] hover:underline"
          >
            {invoice.invoiceNumber}
          </Link>

          <p className="mt-1 text-[8px] text-[#8993A4]">
            Issued {formatDateForDisplay(invoice.issueDate)}
          </p>
        </div>
      ),
    },
    {
      id: "customer",
      header: "Customer & Location",
      width: "185px",
      cell: (invoice) => (
        <div className="min-w-0">
          <p className="truncate text-[9px] font-medium text-[#273142]">
            {invoice.customerName}
          </p>

          <p className="mt-1 truncate text-[8px] text-[#8993A4]">
            {invoice.city} · {invoice.location}
          </p>
        </div>
      ),
    },
    {
      id: "due",
      header: "Due Date",
      width: "110px",
      cell: (invoice) => (
        <div className="min-w-0">
          <p className="whitespace-nowrap text-[9px] text-[#475569]">
            {invoice.dueDate}
          </p>

          <p
            className={`mt-1 text-[8px] ${
              invoice.status === "overdue"
                ? "text-[#DC2626]"
                : invoice.status === "paid"
                  ? "text-[#059669]"
                  : "text-[#8993A4]"
            }`}
          >
            {invoice.dueDescription}
          </p>
        </div>
      ),
    },
    {
      id: "amount",
      header: "Amount",
      align: "right",
      width: "100px",
      cell: (invoice) => (
        <span className="whitespace-nowrap text-[9px] font-semibold tabular-nums text-[#273142]">
          {formatINR(invoice.amount)}
        </span>
      ),
    },
    {
      id: "balance",
      header: "Balance Due",
      align: "right",
      width: "100px",
      cell: (invoice) => (
        <span
          className={`whitespace-nowrap text-[9px] tabular-nums ${
            invoice.balanceDue > 0
              ? "font-medium text-[#273142]"
              : "text-[#64748B]"
          }`}
        >
          {formatINR(invoice.balanceDue)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      width: "76px",
      cell: (invoice) => {
        const config = statusDisplay[invoice.status];

        return (
          <Badge
            variant={config.variant}
            size="xs"
            className="whitespace-nowrap text-[8px]"
          >
            {config.label}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      width: "130px",
      cell: (invoice) => (
        <div className="flex items-center justify-end gap-1">
          {invoice.status === "overdue" ? (
            <Button
              variant="outline"
              size="xs"
              height={23}
              paddingX={6}
              gap={4}
              leftIcon={<Send size={11} />}
              label="Remind"
              onClick={() =>
                setNotice(
                  `Reminder prepared for ${invoice.invoiceNumber} (demo only).`
                )
              }
              className="text-[8px]"
            />
          ) : invoice.status === "unpaid" ? (
            <Button
              variant="outline"
              size="xs"
              height={23}
              paddingX={6}
              gap={4}
              leftIcon={<FileText size={11} />}
              label="Record payment"
              onClick={() =>
                router.push(
                  `/sales/receipts/new?invoice=${invoice.id}`
                )
              }
              className="text-[8px]"
            />
          ) : invoice.status === "paid" ? (
            <Button
              variant="outline"
              size="xs"
              height={23}
              paddingX={6}
              gap={4}
              leftIcon={<FileText size={11} />}
              label="View receipt"
              onClick={() =>
                router.push(
                  `/sales/receipts?invoice=${invoice.id}`
                )
              }
              className="text-[8px]"
            />
          ) : (
            <Button
              variant="outline"
              size="xs"
              height={23}
              paddingX={6}
              label="Edit draft"
              onClick={() =>
                router.push(`/sales/invoices/${invoice.id}/edit`)
              }
              className="text-[8px]"
            />
          )}

          <button
            type="button"
            aria-label={`More actions for ${invoice.invoiceNumber}`}
            onClick={() =>
              setNotice(`More actions: ${invoice.invoiceNumber}`)
            }
            className="flex h-6 w-5 shrink-0 items-center justify-center rounded text-[#8993A4] hover:bg-[#F1F5F9]"
          >
            <Ellipsis size={13} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Card className="min-w-0 overflow-hidden rounded-[8px] border border-[#E3E8EF] bg-white">
      {/* Status tabs */}
      <div className="flex min-w-0 items-center gap-4 overflow-x-auto border-b border-[#E9EDF2] px-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => changeTab(tab.id)}
              className={`flex h-[34px] shrink-0 items-center gap-1.5 border-b-2 px-0.5 text-[9px] transition-colors ${
                active
                  ? "border-[#0B57D0] font-semibold text-[#0B57D0]"
                  : "border-transparent text-[#64748B] hover:text-[#273142]"
              }`}
            >
              {tab.label}

              <span
                className={`rounded-full px-1.5 py-0.5 text-[8px] ${
                  active
                    ? "bg-[#EAF1FF] text-[#0B57D0]"
                    : "bg-[#F1F3F6] text-[#8993A4]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3">
        <div className="min-w-[190px] flex-1 sm:max-w-[280px]">
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search invoice, customer or GSTIN"
            aria-label="Search invoices"
            size="sm"
            leftIcon={<Search size={12} />}
            wrapperClassName="h-[30px] w-full border-[#E1E5EB] bg-white"
            inputClassName="text-[9px] text-[#273142]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <label className="relative">
            <span className="sr-only">Customer filter</span>

            <select
              value={customer}
              onChange={(event) => {
                setCustomer(event.target.value);
                setCurrentPage(1);
              }}
              className="h-[28px] max-w-[140px] appearance-none rounded-[5px] border border-[#E1E5EB] bg-white py-1 pl-2 pr-6 text-[9px] text-[#475569] outline-none focus:border-[#0B57D0]"
            >
              <option value="all">All customers</option>

              {customerOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={10}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Status filter</span>

            <select
              value={statusSelect}
              onChange={(event) => {
                setStatusSelect(event.target.value);
                setCurrentPage(1);
              }}
              className="h-[28px] appearance-none rounded-[5px] border border-[#E1E5EB] bg-white py-1 pl-2 pr-6 text-[9px] text-[#475569] outline-none focus:border-[#0B57D0]"
            >
              <option value="all">All statuses</option>
              <option value="overdue">Overdue</option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="draft">Draft</option>
            </select>

            <ChevronDown
              size={10}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
          </label>

          <Button
            variant="outline"
            size="xs"
            height={28}
            paddingX={8}
            gap={5}
            leftIcon={<SlidersHorizontal size={11} />}
            label="Filters"
            onClick={() => setFiltersOpen((current) => !current)}
          />

          <Button
            variant={priority ? "primary" : "outline"}
            size="xs"
            height={28}
            paddingX={8}
            gap={5}
            leftIcon={<ArrowDownUp size={11} />}
            label="Collection priority"
            onClick={() => setPriority((current) => !current)}
          />
        </div>
      </div>

      {filtersOpen && (
        <div className="flex flex-wrap items-center gap-3 border-t border-[#EEF2F7] bg-[#FAFBFD] px-3 py-2.5">
          <label className="inline-flex cursor-pointer items-center gap-2 text-[9px] text-[#475569]">
            <input
              type="checkbox"
              checked={onlyLongOverdue}
              onChange={(event) => {
                setOnlyLongOverdue(event.target.checked);
                setCurrentPage(1);
              }}
              className="h-3 w-3 accent-[#0B57D0]"
            />
            Overdue by 15 days or more
          </label>

          <Button
            variant="text"
            size="xs"
            label="Reset filters"
            onClick={() => {
              setSearch("");
              setCustomer("all");
              setStatusSelect("all");
              setOnlyLongOverdue(false);
              setPriority(false);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {/* Overdue alert */}
      {activeTab !== "paid" &&
        activeTab !== "draft" &&
        statusSelect !== "paid" && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-y border-[#F3E1AE] bg-[#FFFBEB] px-3 py-2">
            <div className="flex min-w-0 items-center gap-2 text-[9px] text-[#A16207]">
              <AlertCircle size={12} className="shrink-0" />

              <span>
                <strong className="font-semibold">
                  {formatINR(invoiceSummary.overdueAmount)}
                </strong>{" "}
                outstanding across 5 overdue invoices. These are included
                in your 18 unpaid invoices.
              </span>
            </div>

            <Button
              variant="text"
              size="xs"
              height={24}
              paddingX={4}
              gap={5}
              leftIcon={<Mail size={11} />}
              label="Send reminders (5)"
              onClick={() =>
                setNotice(
                  "Batch reminder list prepared for 5 overdue invoices (demo only)."
                )
              }
              className="shrink-0 text-[9px] font-semibold text-[#0B57D0]"
            />
          </div>
        )}

      {notice && (
        <div className="flex items-center justify-between gap-2 border-b border-[#DCE8FA] bg-[#F3F8FF] px-3 py-2">
          <span className="text-[9px] text-[#34577E]">
            {notice}
          </span>

          <button
            type="button"
            onClick={() => setNotice("")}
            className="text-[9px] text-[#0B57D0] hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between gap-2 border-b border-[#DCE8FA] bg-[#F3F8FF] px-3 py-2">
          <span className="text-[9px] text-[#34577E]">
            {selectedIds.length} invoice(s) selected
          </span>

          <Button
            variant="text"
            size="xs"
            label="Clear selection"
            onClick={() => setSelectedIds([])}
          />
        </div>
      )}

      {/* Invoice table */}
      <DataTable
        columns={columns}
        data={visibleInvoices}
        getRowId={(invoice) => invoice.id}
        emptyLabel={
          currentPage > 1
            ? "Additional invoice records will be supplied by the backend."
            : "No invoices match the selected filters."
        }
        className="[&_th]:px-2 [&_th]:py-2.5 [&_td]:px-2 [&_td]:py-2.5"
      />

      {/* Pagination */}
      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5">
        <p className="text-[8px] text-[#7A8799]">
          {totalCount === 0
            ? "Showing 0 invoices"
            : `Showing ${
                currentPage === 1 ? 1 : (currentPage - 1) * PAGE_SIZE + 1
              }–${Math.min(
                currentPage * PAGE_SIZE,
                totalCount
              )} of ${totalCount} invoices`}
        </p>

        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-1 text-[8px] text-[#7A8799]">
            Rows per page
          </span>

          <span className="flex h-[24px] items-center gap-1 rounded-[4px] border border-[#E1E5EB] px-2 text-[9px] text-[#475569]">
            10 <ChevronDown size={10} />
          </span>

          <Button
            variant="outline"
            size="xs"
            height={25}
            paddingX={7}
            label="Previous"
            disabled={currentPage <= 1}
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            className="text-[8px]"
          />

          {Array.from(
            { length: Math.min(3, totalPages) },
            (_, index) => index + 1
          ).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline"}
              size="xs"
              height={25}
              paddingX={8}
              label={String(page)}
              onClick={() => setCurrentPage(page)}
              className="min-w-[25px] text-[9px]"
            />
          ))}

          {totalPages > 3 && (
            <>
              <span className="px-1 text-[9px] text-[#8993A4]">
                …
              </span>

              <Button
                variant={currentPage === totalPages ? "primary" : "outline"}
                size="xs"
                height={25}
                paddingX={7}
                label={String(totalPages)}
                onClick={() => setCurrentPage(totalPages)}
                className="text-[9px]"
              />
            </>
          )}

          <Button
            variant="outline"
            size="xs"
            height={25}
            paddingX={7}
            label="Next"
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            className="text-[8px]"
          />
        </div>
      </div>
    </Card>
  );
}

export default InvoiceRegister;