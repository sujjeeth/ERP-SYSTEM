"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { TopBar } from "@/components/shell/TopBar";
import { Sidebar } from "@/components/shell/Sidebar";
import { Workspace } from "@/components/shell/Workspace";
import type { GlobalPanel } from "@/components/shell/TopBar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  initialSidebarPinned?: boolean;
  onGlobalPanelOpen?: (panel: GlobalPanel) => void;
  className?: string;
}

export function AppShell({
  children,
  initialSidebarPinned = false,
  onGlobalPanelOpen,
  className,
}: AppShellProps) {
  const pathname = usePathname() || "/";
  const [sidebarPinned, setSidebarPinned] = useState(
    initialSidebarPinned
  );

  return (
    <div className={cn("min-h-screen bg-[#F5F6F8]", className)}>
      <TopBar
        onOpenPanel={onGlobalPanelOpen}
        className="fixed inset-x-0 top-0 z-[100]"
      />

      <div className="flex min-h-screen items-stretch pt-[44px]">
        <Sidebar
          pinned={sidebarPinned}
          activePath={pathname}
          onPinChange={setSidebarPinned}
        />

        <Workspace className="min-h-[calc(100vh-44px)]">
          {children}
        </Workspace>
      </div>
    </div>
  );
}

export default AppShell;