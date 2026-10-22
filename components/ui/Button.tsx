
"use client";

import * as React from "react";
import {
  cva,
  type VariantProps,
} from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "gap-1.5 rounded-[5px] font-medium",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[#0B57D0] focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-[#0B57D0] text-white hover:bg-[#094ab3]",

        outline:
          "border border-[#E0E4EA] bg-white text-[#273142] hover:bg-[#F5F7FA]",

        ghost:
          "border border-transparent bg-transparent text-[#475569] hover:bg-[#F1F4F8]",

        text:
          "border border-transparent bg-transparent text-[#0B57D0] hover:text-[#094ab3]",

        search:
          "border border-[#E1E5EB] bg-[#FAFBFC] text-[#64748B] hover:bg-white",
      },

      size: {
        xs: "h-6 px-2 text-[11px]",
        sm: "h-7 px-2.5 text-[12px]",
        md: "h-8 px-3 text-[13px]",
      },

      fullWidth: {
        true: "w-full",
        false: "",
      },
    },

    defaultVariants: {
      variant: "outline",
      size: "sm",
      fullWidth: false,
    },
  }
);

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
  > {
  leftIcon?: React.ReactNode;
  label?: React.ReactNode;
  rightIcon?: React.ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;

  height?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  gap?: number;
  iconSize?: number;

  fullWidth?: boolean;
  loading?: boolean;
  ariaLabel?: string;

  children?: React.ReactNode;
}

function toCssLength(
  value: number | string
): string {
  return typeof value === "number"
    ? `${value}px`
    : value;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button(
  {
    leftIcon,
    label,
    rightIcon,
    variant = "outline",
    size = "sm",
    height,
    paddingX,
    paddingY,
    gap,
    iconSize = 14,
    fullWidth = false,
    loading = false,
    ariaLabel,
    disabled,
    className,
    style,
    type = "button",
    children,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const customStyle = {
    ...style,
    ...(height !== undefined
      ? { height: toCssLength(height) }
      : {}),
    ...(paddingX !== undefined
      ? { paddingInline: toCssLength(paddingX) }
      : {}),
    ...(paddingY !== undefined
      ? { paddingBlock: toCssLength(paddingY) }
      : {}),
    ...(gap !== undefined
      ? { gap: `${gap}px` }
      : {}),
    "--button-icon-size": `${iconSize}px`,
  } as React.CSSProperties;

  const buttonLabel = label ?? children;

  const resolvedAriaLabel =
    ariaLabel ??
    (typeof buttonLabel === "string"
      ? buttonLabel
      : undefined);

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-label={resolvedAriaLabel}
      aria-busy={loading || undefined}
      style={customStyle}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        "[&_svg]:h-[var(--button-icon-size)]",
        "[&_svg]:w-[var(--button-icon-size)]",
        className
      )}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        leftIcon
      )}

      {buttonLabel != null && (
        <span>{buttonLabel}</span>
      )}

      {!loading && rightIcon}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
