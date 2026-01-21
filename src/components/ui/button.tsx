"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#EAB308] text-[#0f0d24] hover:bg-[#EAB308]/90 focus-visible:ring-[#EAB308]",
        secondary:
          "bg-[#1e1b4b] text-white hover:bg-[#312e81] focus-visible:ring-[#1e1b4b]",
        ghost:
          "bg-transparent text-white hover:bg-[#1e1b4b] focus-visible:ring-[#1e1b4b]",
        outline:
          "border border-[#EAB308] bg-transparent text-[#EAB308] hover:bg-[#EAB308] hover:text-[#0f0d24] focus-visible:ring-[#EAB308]",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
