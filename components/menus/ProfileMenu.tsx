"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import {
  Building2,
  Keyboard,
  KeyRound,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";

import { Avatar } from "@/components/ui/Avatar";
import { MenuItem } from "@/components/ui/MenuItem";
import { Separator } from "@/components/ui/Separator";
import { PopoverPanel } from "@/components/ui/PopoverPanel";

interface ProfileMenuProps {
  trigger: ReactElement;
  userName?: string;
  role?: string;
  branch?: string;
  onSignOut?: () => void;
}

export function ProfileMenu({
  trigger,
  userName = "Kavitha Selvam",
  role = "Administrator",
  branch = "Tamil Nadu Hub",
  onSignOut,
}: ProfileMenuProps) {
const [open, setOpen] = useTopBarPopup("profile");
  return (
    <PopoverPanel
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      width={260}
      padding={8}
      align="end"
    >
      <div className="flex items-center gap-2.5 px-2 py-3">
        <Avatar fallback="KS" size="lg" />

        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-[#273142]">
            {userName}
          </p>
          <p className="text-[10px] text-[#64748B]">{role}</p>
          <p className="text-[9px] text-[#8993A4]">{branch}</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-0.5 py-2">
        <MenuItem
          icon={<UserRound />}
          label="My Profile & Security"
          href="/settings/profile"
          onSelect={() => setOpen(false)}
        />

        <MenuItem
          icon={<Building2 />}
          label="Company Details"
          href="/settings/company"
          onSelect={() => setOpen(false)}
        />

        <MenuItem
          icon={<KeyRound />}
          label="E-Way Bill NIC API Keys"
          href="/settings/integrations"
          onSelect={() => setOpen(false)}
        />

        <MenuItem
          icon={<Keyboard />}
          label="Keyboard Shortcuts Reference"
          href="/settings/shortcuts"
          onSelect={() => setOpen(false)}
        />
      </div>

      <Separator />

      <div className="pt-1">
        <MenuItem
          icon={<LogOut />}
          label="Sign Out"
          onSelect={() => {
            setOpen(false);
            onSignOut?.();
          }}
          className="text-[#DC2626] hover:bg-[#FFF0F0]"
        />
      </div>
    </PopoverPanel>
  );
}

export default ProfileMenu;