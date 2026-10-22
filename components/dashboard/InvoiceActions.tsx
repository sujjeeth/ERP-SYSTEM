"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InvoiceActionsProps {
  invoiceId: string;
  onRemind?: (invoiceId: string) => void;
  disabled?: boolean;
}

export function InvoiceActions({
  invoiceId,
  onRemind,
  disabled = false,
}: InvoiceActionsProps) {
  return (
    <Button
      variant="outline"
      size="xs"
      height={26}
      paddingX={7}
      gap={5}
      leftIcon={<Send />}
      label="Remind"
      disabled={disabled}
      onClick={() => onRemind?.(invoiceId)}
    />
  );
}

export default InvoiceActions;