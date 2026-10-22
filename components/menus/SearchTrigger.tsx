"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { KeyboardHint } from "@/components/ui/KeyboardHint";

interface SearchTriggerProps {
  onOpen: () => void;
  placeholder?: string;
}

export function SearchTrigger({
  onOpen,
  placeholder = "Search invoices, parties, items or actions",
}: SearchTriggerProps) {
  return (
    <Button
      variant="search"
      size="xs"
      height={28}
      paddingX={8}
      gap={7}
      leftIcon={<Search />}
      label={
        <span className="min-w-0 flex-1 truncate text-left">
          {placeholder}
        </span>
      }
      rightIcon={<KeyboardHint keys={["Ctrl", "K"]} />}
      ariaLabel={placeholder}
      onClick={onOpen}
className="w-[clamp(200px,24vw,380px)] min-w-[180px] shrink justify-start"   />
  );
}

export default SearchTrigger;