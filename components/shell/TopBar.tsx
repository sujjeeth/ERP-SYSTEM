
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Bell,
  ListChecks,
  Building2,
  ChevronDown,
  House,
  Plus,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

import { HomeMenu } from "@/components/menus/HomeMenu";
import { BranchSwitcher } from "@/components/menus/BranchSwitcher";
import { QuickCreateMenu } from "@/components/menus/QuickCreateMenu";
import { WatchlistPanel } from "@/components/menus/WatchlistPanel";
import { ProfileMenu } from "@/components/menus/ProfileMenu";
import { ShortcutPanel } from "@/components/menus/ShortcutPanel";
import { NotificationPanel } from "@/components/menus/NotificationPanel";
import { GlobalSearch } from "@/components/menus/GlobalSearch";

import type { BranchOption } from "@/components/menus/BranchSwitcher";
import { cn } from "@/lib/utils";

export type GlobalPanel =
  | "home"
  | "search"
  | "favorite"
  | "watchlist"
  | "branch"
  | "quick-create"
  | "notifications"
  | "settings"
  | "profile";

interface TopBarProps {
  currentBranch?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onOpenPanel?: (panel: GlobalPanel) => void;
  className?: string;
}

const BRANCHES: BranchOption[] = [
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

export function TopBar({
  currentBranch,
  userName = "Kavitha Selvam",
  userRole = "Admin · TN Hub",
  notificationCount = 3,
  onOpenPanel,
  className,
}: TopBarProps) {
  const router = useRouter();

  const initialBranchId =
    BRANCHES.find((branch) => branch.name === currentBranch)?.id ??
    "chennai";

  const [currentBranchId, setCurrentBranchId] =
    useState(initialBranchId);

  const selectedBranch =
    BRANCHES.find((branch) => branch.id === currentBranchId) ??
    BRANCHES[0];

  return (
    <header
      className={cn(
        "relative z-50 flex h-[44px] w-full shrink-0",
        "items-center gap-2.5 border-b border-[#E5E7EB]",
        "bg-white px-2.5",
        className
      )}
    >
      {/* Brand */}
      <Link
        href="/"
        aria-label="Kural ERP Home"
        className="flex shrink-0 items-center gap-1.5"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-[#0B57D0] text-white">
          <ShieldCheck size={17} strokeWidth={2} />
        </span>

        <span className="hidden min-w-0 flex-col sm:flex">
          <span className="text-[10px] font-bold leading-[12px] text-[#273142]">
            Kural ERP
          </span>
          <span className="text-[8px] leading-[10px] text-[#7A8799]">
            Enterprise Cloud
          </span>
        </span>
      </Link>

      {/* Home */}
      <div className="shrink-0">
        <HomeMenu
          trigger={
            <Button
              variant="ghost"
              size="xs"
              height={28}
              paddingX={7}
              gap={5}
              leftIcon={<House size={14} />}
              label="Home"
              rightIcon={<ChevronDown size={12} />}
              className="border-0 bg-transparent shadow-none outline-none hover:bg-[#F5F7FA] focus-visible:ring-0"
            />
          }
        />
      </div>

      {/* Global search, anchored dropdown */}
      <GlobalSearch
        onOpen={() => onOpenPanel?.("search")}
      />

      {/* Pinned shortcuts */}
      <div className="shrink-0">
        <ShortcutPanel
          trigger={
            <Button
              variant="ghost"
              size="xs"
              height={28}
              paddingX={0}
              leftIcon={
                <Star
                  size={14}
                  strokeWidth={1.8}
                  className="text-[#D97706]"
                />
              }
              ariaLabel="Pinned shortcuts"
              className="w-7 justify-center rounded-[5px] border border-[#F0E1B6] bg-[#FFFBEB] text-[#B77908] hover:bg-[#FFF5D6]"
            />
          }
        />
      </div>

      {/* Watchlist */}
      <div className="hidden shrink-0 sm:block">
        <WatchlistPanel
          trigger={
            <Button
              variant="outline"
              size="xs"
              height={28}
              paddingX={8}
              gap={6}
              leftIcon={<ListChecks size={14} strokeWidth={1.8} />}
              label="Watchlist"
              rightIcon={
                <span className="rounded-[3px] bg-[#EAF7EF] px-1.5 py-0.5 text-[9px] font-medium leading-none text-[#18794E]">
                  Live
                </span>
              }
            />
          }
          onOpenOperationsCenter={() => router.push("/operations")}
          onConfigure={() => router.push("/settings/watchlist")}
        />
      </div>


      {/* Quick Create: its menu controls the hover shortcut */}
      <div className="shrink-0">
        <QuickCreateMenu
          trigger={
            <Button
              variant="primary"
              size="xs"
              height={30}
              paddingX={8}
              gap={5}
              leftIcon={<Plus size={14} />}
              label="Quick Create"
              rightIcon={<ChevronDown size={12} />}
              className="rounded-[5px]"
            />
          }
        />
      </div>
      {/* Branch selector */}
      <div className="hidden min-w-0 shrink xl:block">
        <BranchSwitcher
          trigger={
            <Button
              variant="outline"
              size="xs"
              height={28}
              paddingX={7}
              gap={5}
              leftIcon={<Building2 size={14} strokeWidth={1.8} />}
              label={
                <span className="max-w-[145px] truncate">
                  {selectedBranch.name}
                </span>
              }
              rightIcon={<ChevronDown size={12} />}
            />
          }
          branches={BRANCHES}
          currentBranchId={currentBranchId}
          onSelect={(branch) => {
            setCurrentBranchId(branch.id);
            onOpenPanel?.("branch");
          }}
          onAddBranch={() => router.push("/settings/branches")}
        />
      </div>


      <div className="min-w-1 flex-1" />

      {/* Notifications */}
      <div className="shrink-0">
        <NotificationPanel
          trigger={
            <span className="relative inline-flex">
              <Button
                variant="ghost"
                size="xs"
                height={28}
                paddingX={0}
                leftIcon={<Bell size={15} />}
                ariaLabel={`Notifications: ${notificationCount}`}
                className="w-7 justify-center"
              />

              {notificationCount > 0 && (
                <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#DC2626] px-0.5 text-[8px] font-semibold text-white">
                  {notificationCount > 99
                    ? "99+"
                    : notificationCount}
                </span>
              )}
            </span>
          }
        />
      </div>

      {/* Settings */}
      <Button
        variant="ghost"
        size="xs"
        height={28}
        paddingX={0}
        leftIcon={<Settings size={15} />}
        ariaLabel="Settings"
        onClick={() => onOpenPanel?.("settings")}
        className="w-7 shrink-0 justify-center"
      />

      {/* Profile */}
      <div className="shrink-0">
        <ProfileMenu
          userName={userName}
          role={userRole}
          branch="Tamil Nadu Hub"
          trigger={
            <Button
              variant="ghost"
              size="xs"
              height={34}
              paddingX={4}
              gap={7}
              leftIcon={<Avatar fallback="KS" size="md" />}
              label={
                <span className="hidden min-w-0 flex-col text-left lg:flex">
                  <span className="max-w-[105px] truncate text-[10px] font-semibold leading-[13px] text-[#273142]">
                    {userName}
                  </span>
                  <span className="max-w-[105px] truncate text-[9px] leading-[11px] text-[#8993A4]">
                    {userRole}
                  </span>
                </span>
              }
              ariaLabel={`User profile: ${userName}`}
            />
          }
        />
      </div>
    </header>
  );
}

export default TopBar;
