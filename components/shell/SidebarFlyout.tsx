"use client";

import {
  useLayoutEffect,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "lucide-react";

import {
  Badge,
  type BadgeVariant,
} from "@/components/ui/Badge";
import { MenuItem } from "@/components/ui/MenuItem";
import { cn } from "@/lib/utils";
import type { NavigationItemConfig } from "./navigation-types";

interface SidebarFlyoutProps {
  title: string;
  items: NavigationItemConfig[];
  open: boolean;
  anchorRef: RefObject<HTMLDivElement | null>;
  activePath?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onItemSelect?: () => void;
}

interface Position {
  top: number;
  left: number;
}

const metaColors: Record<BadgeVariant, string> = {
  info: "!bg-[#2E4264] !text-[#C9DCFF] border border-[#40577D]",
  success: "!bg-[#104738] !text-[#82E6C3] border border-[#226653]",
  warning: "!bg-[#503615] !text-[#FFD38A] border border-[#745426]",
  danger: "!bg-[#5B2431] !text-[#FFB6C1] border border-[#853849]",
  neutral: "!bg-[#303B50] !text-[#D0D9E8] border border-[#46536B]",
};

function matchesPath(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarFlyout({
  title,
  items,
  open,
  anchorRef,
  activePath = "",
  onMouseEnter,
  onMouseLeave,
  onItemSelect,
}: SidebarFlyoutProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const popupHeight = Math.min(
        items.length * 32 + 12,
        window.innerHeight - 60
      );

      setPosition({
        top: Math.max(
          44,
          Math.min(rect.top, window.innerHeight - popupHeight - 8)
        ),
        left: Math.min(rect.right, window.innerWidth - 240),
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, anchorRef, items.length]);

  if (!open || !position || typeof document === "undefined") {
    return null;
  }

  const hasActiveRoute = items.some((item) =>
    matchesPath(activePath, item.href)
  );

  return createPortal(
    <div
      role="group"
      aria-label={`${title} submenu`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: 230,
        maxHeight: "calc(100vh - 60px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        zIndex: 200,
      }}
      className={cn(
        "rounded-[5px] border border-[#303B50]",
        "bg-[#202A3B] p-2 text-white",
        "shadow-[0_5px_16px_rgba(0,0,0,0.2)]",
        "[&::-webkit-scrollbar]:hidden"
      )}
    >
      <div className="space-y-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          const active = matchesPath(activePath, item.href);
          const hovered = hoveredItem === item.label;
          const selected =
            active || hovered || (!hasActiveRoute && index === 0);

          const variant = item.metaVariant ?? "neutral";

          return (
            <div
              key={`${item.label}-${item.href ?? ""}`}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <MenuItem
                tone="dark"
                href={item.href}
                icon={<Icon />}
                label={item.label}
                selected={selected}
                rightContent={
                  <span className="ml-auto flex shrink-0 items-center gap-1">
                    {item.meta &&
                      (item.metaDisplay === "badge" ? (
                        <Badge
                          variant={variant}
                          appearance="soft"
                          size="sm"
                          className={cn(
                            "h-[21px] min-w-[28px] rounded-[4px]",
                            "justify-center px-1.5 text-[10px]",
                            "font-medium leading-none",
                            metaColors[variant]
                          )}
                        >
                          {item.meta}
                        </Badge>
                      ) : (
                        <span className="whitespace-nowrap text-[10px] text-[#A8B5C9]">
                          {item.meta}
                        </span>
                      ))}

                    {item.showArrow && (
                      <ChevronRight
                        size={12}
                        className="text-[#A8B5C9]"
                      />
                    )}
                  </span>
                }
                onSelect={onItemSelect}
                className={cn(
                  "min-h-[30px] gap-2 rounded-[4px]",
                  "px-2 py-1.5 text-[11px]",
                  selected && "bg-[#2B3B58]"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
}

export default SidebarFlyout;