
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import {
  Clock3,
  FileText,
  LayoutDashboard,
  Package,
  Search,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";

import { Input } from "@/components/ui/Input";
import { MenuItem } from "@/components/ui/MenuItem";
import { Badge } from "@/components/ui/Badge";
import { KeyboardHint } from "@/components/ui/KeyboardHint";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

type SearchGroup = "Pages" | "Invoices" | "Customers" | "Items";

interface SearchRecord {
  id: string;
  title: string;
  group: SearchGroup;
  description: string;
  href: string;
  icon: LucideIcon;
  status?: string;
  statusVariant?: "success" | "danger" | "warning" | "neutral";
}

interface GlobalSearchProps {
  onOpen?: () => void;
}

const RECENT_SEARCHES = [
  "INV-2026-0891",
  "Sri Murugan Textiles",
  "Nitrile Gloves (GLV-NTR-M)",
  "Kongu Precision Works",
];

const RESULTS: SearchRecord[] = [
  {
    id: "page-invoices",
    title: "Invoices & Billing Register",
    group: "Pages",
    description: "Sales · 142 records this month",
    href: "/sales/invoices",
    icon: FileText,
    status: "WORKSPACE",
  },
  {
    id: "page-ledger",
    title: "Customer Ledger & Aging Summary",
    group: "Pages",
    description: "Reports · Outstanding party balances",
    href: "/accounting/customer-ledger",
    icon: LayoutDashboard,
    status: "REPORT",
  },
  {
    id: "inv-0891",
    title: "INV-2026-0891",
    group: "Invoices",
    description:
      "Sri Murugan Textiles · ₹1,45,000 · Overdue (10 days)",
    href: "/sales/invoices",
    icon: FileText,
    status: "Unpaid",
    statusVariant: "danger",
  },
  {
    id: "inv-0742",
    title: "INV-2026-0742",
    group: "Invoices",
    description:
      "Sri Murugan Garments · ₹62,300 · Paid (18 Sep)",
    href: "/sales/invoices",
    icon: FileText,
    status: "Settled",
    statusVariant: "success",
  },
  {
    id: "customer-murugan",
    title: "Sri Murugan Textiles",
    group: "Customers",
    description:
      "Tiruppur · GSTIN: 33ABCPM1204K1Z2 · ₹13.84 L balance",
    href: "/parties",
    icon: Users,
  },
  {
    id: "customer-kongu",
    title: "Kongu Precision Works",
    group: "Customers",
    description: "Coimbatore · Customer account",
    href: "/parties",
    icon: Users,
  },
  {
    id: "item-gloves",
    title: "Nitrile Gloves (GLV-NTR-M)",
    group: "Items",
    description: "Inventory · Medium nitrile gloves",
    href: "/inventory/items",
    icon: Package,
  },
];

const SEARCH_GROUPS: SearchGroup[] = [
  "Pages",
  "Invoices",
  "Customers",
  "Items",
];

/**
 * Highlights every case-insensitive occurrence of the search query.
 * The original text and punctuation are preserved.
 */
function highlightMatches(
  text: string,
  query: string
): ReactNode {
  const needle = query.trim();

  if (!needle) {
    return text;
  }

  const lowerText = text.toLocaleLowerCase();
  const lowerNeedle = needle.toLocaleLowerCase();

  const parts: ReactNode[] = [];
  let cursor = 0;
  let matchNumber = 0;

  while (cursor < text.length) {
    const index = lowerText.indexOf(lowerNeedle, cursor);

    if (index === -1) {
      parts.push(text.slice(cursor));
      break;
    }

    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }

    parts.push(
      <mark
        key={`match-${matchNumber++}`}
        className="rounded-[2px] bg-[#FEF0B8] px-0.5 font-semibold text-[#8A4B08]"
      >
        {text.slice(index, index + needle.length)}
      </mark>
    );

    cursor = index + needle.length;
  }

  return <>{parts}</>;
}

export function GlobalSearch({ onOpen }: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

const [open, setOpen] = useTopBarPopup("search");  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchGroup | "All">("All");
  const [recentSearches, setRecentSearches] =
    useState(RECENT_SEARCHES);

  const openSearch = () => {
    setOpen(true);
    onOpen?.();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() !== "k") return;

      event.preventDefault();
      setOpen(true);
      onOpen?.();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onOpen]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const filteredResults = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();

    return RESULTS.filter((item) => {
      if (scope !== "All" && item.group !== scope) {
        return false;
      }

      if (!needle) {
        return true;
      }

      // Keep page shortcuts available while searching records.
      if (item.group === "Pages") {
        return true;
      }

      return (
        item.title.toLocaleLowerCase().includes(needle) ||
        item.description.toLocaleLowerCase().includes(needle) ||
        item.group.toLocaleLowerCase().includes(needle)
      );
    });
  }, [query, scope]);

  const hasResults = filteredResults.length > 0;

  function openResult(item: SearchRecord) {
    const term = query.trim();

    if (term) {
      setRecentSearches((current) =>
        [term, ...current.filter((entry) => entry !== term)].slice(
          0,
          6
        )
      );
    }

    setOpen(false);
    router.push(item.href);
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Popover.Anchor asChild>
        <div
          className={cn(
            "ml-1.5 flex h-7 w-[clamp(210px,24vw,320px)]",
            "min-w-[400px] shrink items-center gap-1",
            "rounded-[5px] border border-[#E1E5EB]",
            "bg-[#FAFBFC] px-1.5 transition-colors",
            open
              ? "border-[#75A5FF] bg-white ring-1 ring-[#BBD2FF]"
              : "hover:bg-white"
          )}
          onClick={openSearch}
        >
          <select
            aria-label="Search category"
            value={scope}
            onChange={(event) =>
              setScope(event.target.value as SearchGroup | "All")
            }
            onClick={(event) => event.stopPropagation()}
            className="h-5 w-[43px] shrink-0 cursor-pointer bg-transparent text-[9px] text-[#475569] outline-none"
          >
            <option value="All">All</option>

            {SEARCH_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <Separator
            orientation="vertical"
            className="h-4 shrink-0"
          />

          <div className="min-w-0 flex-1">
            <Input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpen(false);
                  inputRef.current?.blur();
                }

                if (
                  event.key === "Enter" &&
                  filteredResults.length > 0
                ) {
                  event.preventDefault();
                  openResult(filteredResults[0]);
                }
              }}
              placeholder="Search..."
              aria-label="Search invoices, parties, items and pages"
              size="sm"
              leftIcon={<Search size={12} />}
              wrapperClassName="h-6 gap-1 border-0 bg-transparent px-0 focus-within:border-0 focus-within:ring-0"
              inputClassName={cn(
                "text-[10px] text-[#273142]",
                "caret-[#0B57D0]",
                "placeholder:text-[#94A3B8]",
                "selection:bg-[#DCEAFF]",
                "selection:text-[#17243A]",
                "opacity-100"
              )}
            />
          </div>

          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={(event) => {
                event.stopPropagation();
                setQuery("");
                inputRef.current?.focus();
              }}
              className="shrink-0 text-[#94A3B8] hover:text-[#334155]"
            >
              <X size={11} />
            </button>
          )}

          <KeyboardHint keys={["Ctrl", "K"]} />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={5}
          collisionPadding={10}
          onOpenAutoFocus={(event) => event.preventDefault()}
          style={{ width: "min(350px, calc(100vw - 24px))" }}
          className="z-[180] overflow-hidden rounded-[6px] border border-[#E1E5EB] bg-white text-[#273142] shadow-[0_10px_30px_rgba(15,23,42,0.16)] outline-none"
        >
          {/* Recent searches */}
          <div className="px-3 pb-2 pt-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[9px] font-semibold uppercase tracking-[0.07em] text-[#7B8AA2]">
                Recent searches
              </h3>

              <button
                type="button"
                onClick={() => setRecentSearches([])}
                className="text-[9px] text-[#0B57D0] hover:underline"
              >
                Clear history
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    inputRef.current?.focus();
                  }}
                  className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#E1E7F0] bg-white px-2 py-1 text-[9px] text-[#475569] hover:bg-[#F8FAFC]"
                >
                  <Clock3
                    size={9}
                    className="shrink-0 text-[#94A3B8]"
                  />

                  <span className="truncate">
                    {highlightMatches(term, query)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Grouped results */}
          <div className="max-h-[390px] overflow-y-auto px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SEARCH_GROUPS.map((group) => {
              const groupItems = filteredResults.filter(
                (item) => item.group === group
              );

              if (groupItems.length === 0) {
                return null;
              }

              return (
                <section key={group} className="py-1">
                  <div className="flex items-center justify-between px-1.5 py-1.5">
                    <h3 className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#7B8AA2]">
                      {group} ({groupItems.length})
                    </h3>
                  </div>

                  {groupItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <MenuItem
                        key={item.id}
                        icon={<Icon />}
                        label={
                          <span className="text-[10px] font-semibold text-[#273142]">
                            {highlightMatches(item.title, query)}
                          </span>
                        }
                        description={
                          <span className="text-[9px] text-[#7A8799]">
                            {highlightMatches(item.description, query)}
                          </span>
                        }
                        rightContent={
                          item.status ? (
                            <Badge
                              variant={
                                item.statusVariant ?? "neutral"
                              }
                              size="xs"
                            >
                              {item.status}
                            </Badge>
                          ) : null
                        }
                        onSelect={() => openResult(item)}
                        className="min-h-[34px] px-1.5 py-1.5"
                      />
                    );
                  })}
                </section>
              );
            })}

            {!hasResults && (
              <p className="px-2 py-7 text-center text-[11px] text-[#8993A4]">
                No matching records found.
              </p>
            )}
          </div>

          <Separator />

          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FAFBFD] px-3 py-2">
            <div className="flex items-center gap-2 text-[9px] text-[#7B8AA2]">
              <span className="inline-flex items-center gap-1">
                <KeyboardHint keys={["↑", "↓"]} />
                Navigate
              </span>

              <span className="inline-flex items-center gap-1">
                <KeyboardHint keys={["Esc"]} />
                Dismiss
              </span>
            </div>

            <span className="text-[9px] text-[#94A3B8]">
              Tab Next category
            </span>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default GlobalSearch;
