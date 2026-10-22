
"use client";

import { useCallback, useRef, useState } from "react";
import {
  Building2,
  ChevronDown,
  CircleHelp,
  PanelLeftClose,
  PanelLeftOpen,
  Pin,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { SidebarSection } from "@/components/shell/SidebarSection";
import { NAVIGATION_SECTIONS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import type {
  NavigationItemConfig,
  NavigationSectionConfig,
} from "./navigation-types";

export interface SidebarProps {
  pinned: boolean;
  activePath: string;
  onPinChange: (pinned: boolean) => void;
  sections?: NavigationSectionConfig[];
  onQuickCreate?: (item: NavigationItemConfig) => void;
}

export function Sidebar({
  pinned,
  activePath,
  onPinChange,
  sections = NAVIGATION_SECTIONS,
  onQuickCreate,
}: SidebarProps) {
  const [hovered, setHovered] = useState(false);
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openFlyout = useCallback(
    (label: string) => {
      clearCloseTimer();
      setActiveFlyout(label);
    },
    [clearCloseTimer]
  );

  const scheduleFlyoutClose = useCallback(
    (label: string) => {
      clearCloseTimer();

      closeTimer.current = setTimeout(() => {
        setActiveFlyout((current) =>
          current === label ? null : current
        );
        closeTimer.current = null;
      }, 180);
    },
    [clearCloseTimer]
  );

  const handleModuleClick = useCallback(
    (label: string) => {
      clearCloseTimer();
      setActiveFlyout(label);
    },
    [clearCloseTimer]
  );

  const expanded = pinned || hovered || activeFlyout !== null;

  return (
    <div
      className={cn(
        "relative h-[calc(100vh-44px)] shrink-0",
        pinned ? "w-[216px]" : "w-[56px]"
      )}
    >
      <aside
        onMouseEnter={() => {
          clearCloseTimer();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "fixed bottom-0 left-0 top-[44px] z-40",
          "flex min-h-0 flex-col",
          "bg-[#1E2433] text-white",
          "transition-[width] duration-150 ease-out",
          expanded ? "w-[216px]" : "w-[56px]"
        )}
      >
        {/* Hub header */}
        <div className="flex h-[42px] shrink-0 items-center px-2">
          <Button
            variant="ghost"
            size="sm"
            height={32}
            paddingX={expanded ? 7 : 0}
            gap={8}
            leftIcon={<Building2 size={15} />}
            label={
              expanded ? (
                <span className="min-w-0 flex-1 truncate text-[10px] font-semibold tracking-[0.02em]">
                  TAMIL NADU HUB
                </span>
              ) : null
            }
            rightIcon={
              expanded ? (
                <ChevronDown
                  size={12}
                  className="shrink-0 text-[#9AA7BB]"
                />
              ) : null
            }
            ariaLabel="Tamil Nadu Hub"
            onClick={() => {}}
            className={cn(
              "w-full justify-start border-transparent",
              "bg-transparent text-[#D5DDEA]",
              "hover:bg-[#263045] hover:text-white",
              !expanded && "justify-center"
            )}
          />
        </div>

        {/* Scrollable navigation with hidden scrollbar */}
        <nav
          aria-label="Main navigation"
          className={cn(
            "relative z-10 min-h-0 flex-1",
            "overflow-y-auto overflow-x-hidden px-2 pb-3 pt-2",
            "[scrollbar-width:none]",
            "[-ms-overflow-style:none]",
            "[&::-webkit-scrollbar]:hidden"
          )}
        >
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              collapsed={!expanded}
              activePath={activePath}
              activeFlyout={activeFlyout}
              onModuleEnter={openFlyout}
              onModuleLeave={scheduleFlyoutClose}
              onFlyoutEnter={openFlyout}
              onFlyoutLeave={scheduleFlyoutClose}
              onModuleClick={handleModuleClick}
            />
          ))}
        </nav>

        {/* Bottom controls */}
        <div className="mt-auto shrink-0 space-y-1 border-t border-[#30394B] px-2 py-2">
          <Button
            variant="ghost"
            size="sm"
            height={30}
            paddingX={expanded ? 8 : 0}
            gap={8}
            leftIcon={<CircleHelp size={15} />}
            label={expanded ? "Help & Support" : null}
            ariaLabel="Help and Support"
            onClick={() => {}}
            className={cn(
              "w-full justify-start border-transparent",
              "bg-transparent text-[#C8D2E1]",
              "hover:bg-[#263045] hover:text-white",
              !expanded && "justify-center"
            )}
          />

          {expanded ? (
            <Button
              variant="ghost"
              size="sm"
              height={30}
              paddingX={8}
              gap={8}
              leftIcon={
                pinned ? (
                  <PanelLeftClose size={15} />
                ) : (
                  <Pin size={15} />
                )
              }
              label={pinned ? "Collapse sidebar" : "Pin sidebar"}
              onClick={() => {
                clearCloseTimer();
                onPinChange(!pinned);
                setActiveFlyout(null);
              }}
              className="w-full justify-start border-transparent bg-transparent text-[#C8D2E1] hover:bg-[#263045] hover:text-white"
            />
          ) : (
            <Tooltip content="Pin sidebar" side="right">
              <Button
                variant="ghost"
                size="sm"
                height={30}
                paddingX={0}
                leftIcon={<PanelLeftOpen size={15} />}
                ariaLabel="Pin sidebar"
                onClick={() => onPinChange(true)}
                className="w-full justify-center border-transparent bg-transparent text-[#C8D2E1] hover:bg-[#263045] hover:text-white"
              />
            </Tooltip>
          )}
        </div>
      </aside>

      {/* Quick-create callback is intentionally delegated to the shell owner. */}
     
    </div>
  );
}

export default Sidebar;
