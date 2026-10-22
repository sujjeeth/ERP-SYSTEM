"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
    FileText,
    Search,
    Users,
    Package,
    X,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { MenuItem } from "@/components/ui/MenuItem";
import { KeyboardHint } from "@/components/ui/KeyboardHint";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

interface SearchResult {
    id: string;
    title: string;
    type: "Invoice" | "Customer" | "Page" | "Item";
    description: string;
    href: string;
}

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    results?: SearchResult[];
    onSelect?: (result: SearchResult) => void;
}

const DEFAULT_RESULTS: SearchResult[] = [
    {
        id: "inv-0891",
        title: "INV-2026-0891",
        type: "Invoice",
        description: "Sri Murugan Textiles · ₹1,45,000 · Overdue",
        href: "/sales/invoices",
    },
    {
        id: "inv-0872",
        title: "INV-2026-0872",
        type: "Invoice",
        description: "Customer invoice · ₹62,300 · Settled",
        href: "/sales/invoices",
    },
    {
        id: "customer-1",
        title: "Sri Murugan Textiles",
        type: "Customer",
        description: "Tiruppur",
        href: "/parties",
    },
    {
        id: "page-invoices",
        title: "Invoices & Billing Register",
        type: "Page",
        description: "Sales",
        href: "/sales/invoices",
    },
    {
        id: "page-ledger",
        title: "Customer Ledger & Aging Summary",
        type: "Page",
        description: "Accounting",
        href: "/accounting",
    },
];

const typeIcons = {
    Invoice: <FileText />,
    Customer: <Users />,
    Page: <Search />,
    Item: <Package />,
};

export function CommandPalette({
    open,
    onOpenChange,
    results = DEFAULT_RESULTS,
    onSelect,
}: CommandPaletteProps) {
    const [query, setQuery] = useState("");

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (nextOpen) {
                setQuery("");
            }

            onOpenChange(nextOpen);
        },
        [onOpenChange]
    );

   useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();
      handleOpenChange(true);
    }
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
  };
}, [handleOpenChange]);

    const filteredResults = useMemo(() => {
        const normalized = query.trim().toLowerCase();

        if (!normalized) return results;

        return results.filter(
            (result) =>
                result.title.toLowerCase().includes(normalized) ||
                result.description.toLowerCase().includes(normalized) ||
                result.type.toLowerCase().includes(normalized)
        );
    }, [query, results]);

    const groups = ["Invoice", "Customer", "Page", "Item"] as const;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
<Dialog.Overlay className="fixed inset-0 z-[200] bg-[#111827]/25" />
                <Dialog.Content
                    className={cn(
                        "fixed left-1/2 top-[15%] z-[100]",
                        "w-[min(600px,calc(100vw-24px))]",
                        "-translate-x-1/2 overflow-hidden",
                        "rounded-[8px] border border-[#E1E5EB] bg-white",
                        "shadow-[0_12px_40px_rgba(15,23,42,0.18)]",
                        "outline-none"
                    )}
                >
                    <Dialog.Title className="sr-only">
                        Search the ERP
                    </Dialog.Title>

                    <Dialog.Description className="sr-only">
                        Search invoices, customers, pages and inventory items.
                    </Dialog.Description>

                    <div className="flex items-center gap-2 border-b border-[#E9EDF2] px-3">
                        <Search size={16} className="shrink-0 text-[#64748B]" />

                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search invoices, parties, items or actions"
                            aria-label="Search ERP"
                            wrapperClassName="flex-1 border-0 bg-transparent px-0"
                            inputClassName="h-10"
                        />

                        <Dialog.Close asChild>
                            <button
                                type="button"
                                aria-label="Close search"
                                className="rounded p-1 text-[#64748B] hover:bg-[#F1F4F8]"
                            >
                                <X size={15} />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto p-2">
                        {!query.trim() && (
                            <>
                                <div className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#8993A4]">
                                    Recent searches
                                </div>

                                <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                                    {[
                                        "INV-2026-0891",
                                        "Sri Murugan Textiles",
                                        "Nilgiri Gloves",
                                    ].map((term) => (
                                        <button
                                            key={term}
                                            type="button"
                                            onClick={() => setQuery(term)}
                                            className="rounded border border-[#E1E5EB] px-2 py-1 text-[10px] text-[#64748B] hover:bg-[#F5F7FA]"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>

                                <Separator />
                            </>
                        )}

                        {groups.map((type) => {
                            const matches = filteredResults.filter(
                                (result) => result.type === type
                            );

                            if (matches.length === 0) return null;

                            return (
                                <section key={type} className="py-1">
                                    <div className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#8993A4]">
                                        {type}s
                                    </div>

                                    {matches.map((result) => (
                                        <MenuItem
                                            key={result.id}
                                            icon={typeIcons[result.type]}
                                            label={result.title}
                                            description={result.description}
                                            href={result.href}
                                            onSelect={() => {
                                                onSelect?.(result);
                                                onOpenChange(false);
                                            }}
                                        />
                                    ))}
                                </section>
                            );
                        })}

                        {filteredResults.length === 0 && (
                            <div className="px-3 py-8 text-center">
                                <p className="text-[12px] font-medium text-[#273142]">
                                    No results found
                                </p>
                                <p className="mt-1 text-[11px] text-[#8993A4]">
                                    Try searching with another term.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between border-t border-[#E9EDF2] px-3 py-2 text-[9px] text-[#8993A4]">
                        <div className="flex items-center gap-3">
                            <span><KeyboardHint keys={["↑", "↓"]} /> Navigate</span>
                            <span><KeyboardHint keys={["Enter"]} /> Select</span>
                            <span><KeyboardHint keys={["Esc"]} /> Dismiss</span>
                        </div>

                        <span>Next category · Tab</span>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CommandPalette;