
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MenuItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  rightContent?: React.ReactNode;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  tone?: "light" | "dark";
  onSelect?: () => void;
  className?: string;
}

export function MenuItem({
  icon,
  label,
  description,
  rightContent,
  href,
  selected = false,
  disabled = false,
  tone = "light",
  onSelect,
  className,
}: MenuItemProps) {
  const itemClass = cn(
    "flex w-full min-w-0 items-center gap-2",
    "rounded-[4px] px-2 py-2 text-left",
    "transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-1",
    "focus-visible:ring-[#0B57D0]",
    tone === "light" && [
      "text-[12px] text-[#334155]",
      "hover:bg-[#F3F6FA]",
      selected && "bg-[#EEF4FF] text-[#0B57D0]",
    ],
    tone === "dark" && [
      "text-[10px] text-[#C7D0DF]",
      "hover:bg-[#283449] hover:text-white",
      selected && "bg-[#2B3B58] text-white",
    ],
    disabled && "pointer-events-none opacity-50",
    className
  );

  const content = (
    <>
      {icon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            "[&_svg]:h-[13px] [&_svg]:w-[13px]",
            tone === "dark"
              ? selected
                ? "text-[#3B82F6]"
                : "text-[#8FA1BC]"
              : selected
                ? "text-[#0B57D0]"
                : "text-[#64748B]"
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">
          {label}
        </span>

        {description && (
          <span
            className={cn(
              "mt-0.5 block truncate text-[9px]",
              tone === "dark"
                ? "text-[#8FA1BC]"
                : "text-[#8993A4]"
            )}
          >
            {description}
          </span>
        )}
      </span>

      {rightContent && (
        <span className="ml-auto flex shrink-0 items-center gap-1">
          {rightContent}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={itemClass}
        aria-disabled={disabled || undefined}
        aria-current={selected ? "page" : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }

          onSelect?.();
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={itemClass}
      disabled={disabled}
      onClick={onSelect}
    >
      {content}
    </button>
  );
}

export default MenuItem;
