"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PopoverPanel } from "@/components/ui/PopoverPanel";
import { MenuItem } from "@/components/ui/MenuItem";

interface DateRangeSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const DATE_RANGES = [
  "This Month · Oct 2026",
  "Last Month · Sep 2026",
  "This Quarter",
  "This Financial Year",
];

export function DateRangeSelector({
  value = "This Month · Oct 2026",
  onChange,
}: DateRangeSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopoverPanel
      trigger={
        <Button
          variant="outline"
          size="xs"
          height={28}
          paddingX={8}
          gap={5}
          leftIcon={<CalendarDays />}
          label={value}
          rightIcon={<ChevronDown />}
        />
      }
      open={open}
      onOpenChange={setOpen}
      width={210}
      padding={6}
      align="end"
    >
      {DATE_RANGES.map((range) => (
        <MenuItem
          key={range}
          label={range}
          selected={range === value}
          onSelect={() => {
            onChange?.(range);
            setOpen(false);
          }}
        />
      ))}
    </PopoverPanel>
  );
}

export default DateRangeSelector;