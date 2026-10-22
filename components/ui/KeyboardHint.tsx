import { cn } from "@/lib/utils";

export interface KeyboardHintProps {
  keys: string | string[];
  size?: "xs" | "sm";
  className?: string;
}

export function KeyboardHint({
  keys,
  size = "xs",
  className,
}: KeyboardHintProps) {
  const keyList =
    typeof keys === "string"
      ? keys.trim().split(/\s+/)
      : keys;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-0.5",
        className
      )}
      aria-label={keyList.join(" + ")}
    >
      {keyList.map((key, index) => (
        <kbd
          key={`${key}-${index}`}
          className={cn(
            "inline-flex items-center justify-center",
            "rounded-[3px] border border-[#E2E6EC]",
            "bg-[#FAFBFC] font-medium text-[#64748B]",
            size === "xs"
              ? "min-h-[16px] min-w-[16px] px-1 text-[9px]"
              : "min-h-[20px] min-w-[20px] px-1.5 text-[10px]"
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

export default KeyboardHint;