
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SidebarFlyout } from "@/components/shell/SidebarFlyout";
import { cn } from "@/lib/utils";
import type { NavigationItemConfig } from "./navigation-types";

interface SidebarItemProps {
  item: NavigationItemConfig;
  collapsed: boolean;
  activePath: string;
  activeFlyout: string | null;
  onModuleEnter: (label: string) => void;
  onModuleLeave: (label: string) => void;
  onFlyoutEnter: (label: string) => void;
  onFlyoutLeave: (label: string) => void;
  onModuleClick: (label: string) => void;
  onQuickCreate?: (item: NavigationItemConfig) => void;
}

function matchesPath(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarItem({
  item,
  collapsed,
  activePath,
  activeFlyout,
  onModuleEnter,
  onModuleLeave,
  onFlyoutEnter,
  onFlyoutLeave,
  onModuleClick,
  onQuickCreate,
}: SidebarItemProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);
  const flyoutOpen = hasChildren && activeFlyout === item.label;

  const active =
    matchesPath(activePath, item.href) ||
    Boolean(
      item.children?.some((child) =>
        matchesPath(activePath, child.href)
      )
    );

  const highlighted = active || hovered || flyoutOpen;

  const rowClass = cn(
    "flex h-8 w-full min-w-0 items-center rounded-[4px]",
    "transition-colors duration-100",
    highlighted
      ? "bg-[#263045] shadow-[inset_2px_0_0_#0B57D0]"
      : "bg-transparent"
  );

  const iconNode = (
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center",
        highlighted ? "text-[#3B82F6]" : "text-[#A8B4C7]"
      )}
      aria-hidden="true"
    >
      <Icon size={15} strokeWidth={1.8} />
    </span>
  );

  if (hasChildren) {
    return (
      <div
        ref={anchorRef}
        className="relative w-full"
        onMouseEnter={() => {
          setHovered(true);
          onModuleEnter(item.label);
        }}
        onMouseLeave={() => {
          setHovered(false);
          onModuleLeave(item.label);
        }}
      >
        <div className={rowClass}>
          <Button
            variant="ghost"
            size="sm"
            height={32}
            paddingX={collapsed ? 0 : 8}
            gap={8}
            leftIcon={iconNode}
            label={
              collapsed ? null : (
                <span className="min-w-0 flex-1 truncate text-left">
                  {item.label}
                </span>
              )
            }
            ariaLabel={item.label}
            aria-expanded={flyoutOpen}
            onClick={() => onModuleClick(item.label)}
            className={cn(
              "h-full min-w-0 flex-1 justify-start",
              "border-transparent bg-transparent text-[#C8D2E1]",
              "shadow-none hover:bg-transparent hover:text-white",
              collapsed && "justify-center px-0"
            )}
          />

          {!collapsed && (
            <div className="flex h-8 w-[24px] shrink-0 items-center justify-center">
              {hovered ? (
                <Button
                  variant="primary"
                  size="xs"
                  height={18}
                  paddingX={0}
                  leftIcon={<Plus size={12} />}
                  ariaLabel={`Quick create for ${item.label}`}
                  onClick={() => onQuickCreate?.(item)}
                  className="h-[18px] w-[18px] justify-center rounded-[3px]"
                />
              ) : (
                <ChevronRight
                  size={13}
                  className="shrink-0 text-[#8E9AAF]"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>

        <SidebarFlyout
          title={item.label}
          items={item.children ?? []}
          open={flyoutOpen && !collapsed}
          anchorRef={anchorRef}
          activePath={activePath}
          onMouseEnter={() => onFlyoutEnter(item.label)}
          onMouseLeave={() => onFlyoutLeave(item.label)}
          onItemSelect={() => onModuleLeave(item.label)}
        />
      </div>
    );
  }

  if (!item.href) {
    return (
      <div
        className={cn(
          rowClass,
          "gap-2 px-2 text-[12px] font-medium text-[#C8D2E1]",
          collapsed && "justify-center px-0"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={collapsed ? item.label : undefined}
      >
        {iconNode}

        {!collapsed && (
          <span className="min-w-0 flex-1 truncate">
            {item.label}
          </span>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      aria-label={collapsed ? item.label : undefined}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        rowClass,
        "flex gap-2 px-2 no-underline",
        "text-[12px] font-medium text-[#C8D2E1]",
        "hover:text-white",
        collapsed && "justify-center px-0"
      )}
    >
      {iconNode}
      {!collapsed && (
        <span className="min-w-0 flex-1 truncate">
          {item.label}
        </span>
      )}
    </Link>
  );
}

export default SidebarItem;
