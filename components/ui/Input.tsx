"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size"
  > {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  inputClassName?: string;
}

const inputSizes = {
  sm: "h-7 text-[11px]",
  md: "h-8 text-[12px]",
  lg: "h-9 text-[13px]",
};

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(function Input(
  {
    label,
    leftIcon,
    rightIcon,
    error,
    size = "md",
    wrapperClassName,
    inputClassName,
    className,
    id,
    disabled,
    ...props
  },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("min-w-0", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-[12px] font-medium text-[#334155]"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex min-w-0 items-center gap-2",
          "rounded-[5px] border border-[#E1E5EB]",
          "bg-white px-2.5",
          "transition-colors focus-within:border-[#0B57D0]",
          "focus-within:ring-1 focus-within:ring-[#0B57D0]/20",
          error && "border-[#DC2626]",
          disabled && "cursor-not-allowed bg-[#F5F6F8]",
          inputSizes[size],
          wrapperClassName
        )}
      >
        {leftIcon && (
          <span
            className="flex shrink-0 items-center text-[#8993A4] [&_svg]:h-3.5 [&_svg]:w-3.5"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          {...props}
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            error ? `${inputId}-error` : props["aria-describedby"]
          }
          className={cn(
            "h-full min-w-0 flex-1 border-0 bg-transparent",
            "outline-none placeholder:text-[#98A2B3]",
            "disabled:cursor-not-allowed",
            inputClassName
          )}
        />

        {rightIcon && (
          <span
            className="flex shrink-0 items-center text-[#8993A4] [&_svg]:h-3.5 [&_svg]:w-3.5"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-[11px] text-[#DC2626]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;