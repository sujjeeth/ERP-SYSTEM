
"use client";

import { useState, type ReactElement } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";


import { PopoverPanel } from "@/components/ui/PopoverPanel";
import { MenuItem } from "@/components/ui/MenuItem";
import { KeyboardHint } from "@/components/ui/KeyboardHint";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

interface ShortcutItem {
  id: string;
  label: string;
  keys: string[];
  href?: string;
}

interface ShortcutPanelProps {
  trigger: ReactElement;
  shortcuts?: ShortcutItem[];
  onRun?: (shortcut: ShortcutItem) => void;
  onPinDashboard?: () => void;
}

const DEFAULT_SHORTCUTS: ShortcutItem[] = [
  {
    id: "sales-register",
    label: "Daily Sales Register",
    keys: ["Alt+1"],
    href: "/reports",
  },
  {
    id: "debtors-aging",
    label: "Overdue Debtors Aging",
    keys: ["Alt+2"],
    href: "/reports",
  },
  {
    id: "stock-count",
    label: "Physical Stock Count",
    keys: ["Alt+3"],
    href: "/inventory",
  },
];

export function ShortcutPanel({
  trigger,
  shortcuts = DEFAULT_SHORTCUTS,
  onRun,
  onPinDashboard,
}: ShortcutPanelProps) {
  const router = useRouter();
const [open, setOpen] = useTopBarPopup("favorite");
  return (
    <PopoverPanel
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      width={300}
      padding={0}
      align="start"
      sideOffset={5}
      collisionPadding={10}
      contentClassName="overflow-hidden rounded-[5px]"
    >
      <div className="px-3 pb-2 pt-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#94A3B8]">
          Quick Pinned Shortcuts
        </h2>
      </div>

      <div className="space-y-0.5 px-2 pb-2">
        {shortcuts.map((shortcut) => (
          <MenuItem
            key={shortcut.id}
            icon={
              <Star
                size={13}
                fill="#F59E0B"
                stroke="#D97706"
              />
            }
            label={shortcut.label}
            rightContent={
              <KeyboardHint
                keys={shortcut.keys}
                size="sm"
              />
            }
            onSelect={() => {
              setOpen(false);

              if (onRun) {
                onRun(shortcut);
              } else if (shortcut.href) {
                router.push(shortcut.href);
              }
            }}
            className="min-h-[34px] px-2.5 py-2 text-[11px]"
          />
        ))}
      </div>

      <Separator />

      <div className="flex min-h-[40px] items-center justify-between gap-2 px-2">
        <Button
          variant="text"
          size="sm"
          height={32}
          paddingX={4}
          gap={5}
          leftIcon={<span className="text-[12px]">+</span>}
          label="Pin Current Dashboard"
          onClick={() => {
            setOpen(false);
            onPinDashboard?.();
          }}
          className="min-w-0 justify-start text-[10px] font-medium text-[#0B57D0]"
        />

        <KeyboardHint keys={["Ctrl+D"]} size="sm" />
      </div>
    </PopoverPanel>
  );
}

export default ShortcutPanel;
