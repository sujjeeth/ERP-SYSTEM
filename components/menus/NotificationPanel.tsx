"use client";

import { useState } from "react";
import type { ReactElement } from "react";

import { useTopBarPopup } from "@/components/menus/TopBarPopupContext";

import {
  Bell,
  CheckCheck,
  CircleAlert,
  FileText,
  Package,
} from "lucide-react";

import { PopoverPanel } from "@/components/ui/PopoverPanel";
import { MenuItem } from "@/components/ui/MenuItem";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Badge } from "@/components/ui/Badge";

interface NotificationItem {
  id: string;
  label: string;
  description: string;
  time: string;
  href: string;
  type: "warning" | "document" | "inventory";
  unread?: boolean;
}

interface NotificationPanelProps {
  trigger: ReactElement;
  items?: NotificationItem[];
  onMarkAllRead?: () => void;
  onSelect?: (item: NotificationItem) => void;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "overdue",
    label: "Overdue invoices",
    description: "5 invoices require attention",
    time: "Today",
    href: "/sales/invoices",
    type: "warning",
    unread: true,
  },
  {
    id: "eway",
    label: "E-Way Bill update",
    description: "Shipment status updated",
    time: "10:45 AM",
    href: "/gst/eway-bills",
    type: "document",
    unread: true,
  },
  {
    id: "stock",
    label: "Low stock alert",
    description: "9 SKUs below reorder level",
    time: "09:20 AM",
    href: "/inventory/reorder-alerts",
    type: "inventory",
  },
];

const notificationIcons = {
  warning: <CircleAlert />,
  document: <FileText />,
  inventory: <Package />,
};

export function NotificationPanel({
  trigger,
  items = DEFAULT_NOTIFICATIONS,
  onMarkAllRead,
  onSelect,
}: NotificationPanelProps) {
const [open, setOpen] = useTopBarPopup("notifications");
  const unreadCount = items.filter((item) => item.unread).length;

  return (
    <PopoverPanel
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      width={310}
      padding={8}
      align="end"
    >
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2">
          <Bell size={14} />
          <h2 className="text-[12px] font-semibold text-[#273142]">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <Badge variant="danger" size="xs">
              {unreadCount}
            </Badge>
          )}
        </div>

        <Button
          variant="ghost"
          size="xs"
          leftIcon={<CheckCheck />}
          ariaLabel="Mark all notifications as read"
          onClick={onMarkAllRead}
        />
      </div>

      <Separator />

      <div className="py-1">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            icon={notificationIcons[item.type]}
            label={item.label}
            description={`${item.description} · ${item.time}`}
            href={item.href}
            rightContent={
              item.unread ? (
                <span className="h-1.5 w-1.5 rounded-full bg-[#0B57D0]" />
              ) : null
            }
            onSelect={() => {
              setOpen(false);
              onSelect?.(item);
            }}
            className="py-2.5"
          />
        ))}
      </div>
    </PopoverPanel>
  );
}

export default NotificationPanel;