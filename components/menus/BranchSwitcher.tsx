
"use client";

import { useState, type ReactElement } from "react";
import { Building2, Check, Plus } from "lucide-react";
import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";

import { PopoverPanel } from "@/components/ui/PopoverPanel";
import { Separator } from "@/components/ui/Separator";
import { StatusDot } from "@/components/ui/StatusDot";
import { Button } from "@/components/ui/Button";

export interface BranchOption {
  id: string;
  name: string;
  gstin: string;
  location?: string;
  status?: "active" | "inactive";
}

interface BranchSwitcherProps {
  trigger: ReactElement;
  branches?: BranchOption[];
  currentBranchId: string;
  onSelect: (branch: BranchOption) => void;
  onAddBranch?: () => void;
}

const DEFAULT_BRANCHES: BranchOption[] = [
  {
    id: "chennai",
    name: "Chennai Distribution Center",
    gstin: "33AAAAA0000A1Z5",
    location: "Ambattur",
    status: "active",
  },
  {
    id: "coimbatore",
    name: "Coimbatore Central Hub",
    gstin: "33AAAAA0000A1Z6",
    location: "Peelamedu",
    status: "active",
  },
  {
    id: "madurai",
    name: "Madurai Logistics Node",
    gstin: "33AAAAA0000A1Z7",
    location: "Simmakkal",
    status: "active",
  },
];

export function BranchSwitcher({
  trigger,
  branches = DEFAULT_BRANCHES,
  currentBranchId,
  onSelect,
  onAddBranch,
}: BranchSwitcherProps) {
const [open, setOpen] = useTopBarPopup("branch");
  return (
    <PopoverPanel
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      width={320}
      padding={0}
      align="start"
      sideOffset={5}
      collisionPadding={10}
      contentClassName="overflow-hidden rounded-[5px]"
    >
      <div className="px-3 pb-2 pt-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
          Tamil Nadu Operational Hubs
        </h2>
      </div>

      <div className="space-y-1 px-2 pb-2">
        {branches.map((branch) => {
          const selected = branch.id === currentBranchId;
          const inactive = branch.status === "inactive";

          return (
            <button
              key={branch.id}
              type="button"
              disabled={inactive}
              onClick={() => {
                onSelect(branch);
                setOpen(false);
              }}
              className={[
                "flex w-full min-w-0 items-start gap-2.5",
                "rounded-[5px] border px-2.5 py-2.5",
                "text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[#0B57D0]",
                selected
                  ? "border-[#D6E5FF] bg-[#EEF4FF]"
                  : "border-transparent bg-white hover:border-[#E5EAF1] hover:bg-[#FAFBFD]",
                inactive ? "cursor-not-allowed opacity-50" : "",
              ].join(" ")}
            >
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                <StatusDot
                  variant={
                    selected
                      ? "info"
                      : branch.id === "coimbatore"
                        ? "success"
                        : "warning"
                  }
                  size="sm"
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-semibold leading-4 text-[#273142]">
                  {branch.name}
                </span>

                <span className="mt-0.5 block text-[10px] leading-[14px] text-[#64748B]">
                  GSTIN: {branch.gstin}
                  {branch.location ? ` · ${branch.location}` : ""}
                </span>
              </span>

              {selected && (
                <Check
                  size={15}
                  strokeWidth={2}
                  className="mt-1 shrink-0 text-[#0B57D0]"
                  aria-label="Selected branch"
                />
              )}
            </button>
          );
        })}
      </div>

      <Separator />

      <div className="flex min-h-[38px] items-center px-2">
        <Button
          variant="text"
          size="sm"
          height={32}
          paddingX={6}
          gap={6}
          leftIcon={<Plus size={13} />}
          label="Add New Branch / Godown"
          rightIcon={<Plus size={12} />}
          onClick={() => {
            setOpen(false);
            onAddBranch?.();
          }}
          className="w-full justify-start text-[10px] font-medium text-[#0B57D0]"
        />
      </div>
    </PopoverPanel>
  );
}

export default BranchSwitcher;
