"use client";

import { useState } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ActivityItem } from "@/components/dashboard/ActivityItem";

import { activityItems } from "@/data/dashboard-mock-data";
import type { ActivityItemData } from "@/types/dashboard";

interface ActivityFeedProps {
  items?: ActivityItemData[];
  onRefresh?: () => void | Promise<void>;
  onViewAll?: () => void;
}

export function ActivityFeed({
  items = activityItems,
  onRefresh,
  onViewAll,
}: ActivityFeedProps) {
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await onRefresh?.();
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="gap-2 border-b border-[#E9EDF2] px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <CardTitle className="shrink-0 text-[12px]">
            Recent Activity
          </CardTitle>

          <Badge
            variant="neutral"
            appearance="soft"
            size="xs"
            dot
          >
            Live feed
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="xs"
          leftIcon={<RefreshCw />}
          ariaLabel="Refresh activity"
          loading={refreshing}
          onClick={handleRefresh}
          className="shrink-0"
        />
      </CardHeader>

      <div className="divide-y divide-[#EDF0F4] px-3">
        {items.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t border-[#E9EDF2] px-3 py-2">
        <Button
          variant="text"
          size="xs"
          fullWidth
          rightIcon={<ArrowRight />}
          label="View complete audit log"
          onClick={
            onViewAll ??
            (() => {
              window.location.href = "/audit-log";
            })
          }
          className="justify-start"
        />
      </div>
    </Card>
  );
}

export default ActivityFeed;