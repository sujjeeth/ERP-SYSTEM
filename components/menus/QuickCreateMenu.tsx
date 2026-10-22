
"use client";

import {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { useRouter } from "next/navigation";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  Banknote,
  ChevronDown,
  FileText,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";


import type { ButtonProps } from "@/components/ui/Button";
import { KeyboardHint } from "@/components/ui/KeyboardHint";

interface QuickCreateAction {
  id: string;
  label: string;
  description: string;
  shortcut: string;
  icon: ReactElement;
  href: string;
}

interface QuickCreateMenuProps {
  trigger: ReactElement<ButtonProps>;
  actions?: QuickCreateAction[];
  onSelect?: (action: QuickCreateAction) => void;
}

const DEFAULT_ACTIONS: QuickCreateAction[] = [
  {
    id: "sales-invoice",
    label: "Sales Invoice",
    description: "GST B2B / B2C bill",
    shortcut: "Alt+N",
    icon: <FileText size={15} className="text-[#0B57D0]" />,
    href: "/sales/invoices",
  },
  {
    id: "receive-payment",
    label: "Receive Payment",
    description: "NEFT / Cash / UPI",
    shortcut: "Alt+P",
    icon: <Banknote size={15} className="text-[#059669]" />,
    href: "/sales/receipts",
  },
  {
    id: "vendor-bill",
    label: "Vendor Bill",
    description: "Inward ITC purchase",
    shortcut: "Alt+B",
    icon: <ShoppingCart size={15} className="text-[#0B57D0]" />,
    href: "/purchases/bills",
  },
  {
    id: "eway-bill",
    label: "E-Way Bill",
    description: "NIC 1-click dispatch",
    shortcut: "Alt+W",
    icon: <Truck size={15} className="text-[#EA580C]" />,
    href: "/gst/eway-bills",
  },
];

export function QuickCreateMenu({
  trigger,
  actions = DEFAULT_ACTIONS,
  onSelect,
}: QuickCreateMenuProps) {
  const router = useRouter();
const [open, setOpen] = useTopBarPopup("quick-create");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 220);
  }, [clearCloseTimer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (
        event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        event.key.toLowerCase() === "c"
      ) {
        event.preventDefault();
        openMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
    };
  }, [openMenu, clearCloseTimer]);

  // Keep the shared Button. Change only its trailing icon area.
  const enhancedTrigger = cloneElement<ButtonProps>(trigger, {
    rightIcon: (
      <span className="inline-flex items-center gap-1">
        {open && <KeyboardHint keys={["Alt", "C"]} />}
        <ChevronDown size={12} />
      </span>
    ),
  });

  return (
    <div
      className="inline-flex shrink-0"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={(nextOpen) => {
          clearCloseTimer();
          setOpen(nextOpen);
        }}
      >
        <PopoverPrimitive.Trigger asChild>
          {enhancedTrigger}
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            align="start"
            sideOffset={4}
            collisionPadding={8}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            onOpenAutoFocus={(event) => event.preventDefault()}
            style={{ width: "min(500px, calc(100vw - 24px))" }}
            className="z-[150] rounded-[5px] border border-[#E1E5EB] bg-white p-3 text-[#273142] shadow-[0_5px_16px_rgba(15,23,42,0.14)] outline-none"
          >
            <h2 className="mb-3 px-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-[#94A3B8]">
              Instant Record Creation
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {actions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    clearCloseTimer();
                    setOpen(false);

                    if (onSelect) {
                      onSelect(action);
                    } else {
                      router.push(action.href);
                    }
                  }}
                  className="flex h-[70px] min-w-0 flex-col justify-start gap-1 rounded-[5px] border border-[#E8EDF3] bg-white px-2.5 py-2 text-left transition-colors hover:bg-[#FAFBFD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B57D0]"
                >
                  <span className="flex w-full items-center justify-between gap-1">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {action.icon}
                    </span>

                    <span className="rounded-[3px] bg-[#F1F4F8] px-1.5 py-1 text-[8px] font-normal leading-none text-[#8190A5]">
                      {action.shortcut}
                    </span>
                  </span>

                  <span className="block w-full truncate text-[11px] font-semibold leading-[14px] text-[#273142]">
                    {action.label}
                  </span>

                  <span className="block w-full truncate text-[9px] font-normal leading-[12px] text-[#94A3B8]">
                    {action.description}
                  </span>
                </button>
              ))}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}

export default QuickCreateMenu;
