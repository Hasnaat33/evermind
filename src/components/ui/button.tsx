import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_20px_-6px_rgba(139,92,246,0.55)] hover:bg-primary/90 active:scale-[0.98]",
        gradient:
          "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_4px_24px_-6px_rgba(139,92,246,0.6)] hover:shadow-[0_6px_32px_-6px_rgba(139,92,246,0.75)] hover:brightness-110 active:scale-[0.98]",
        outline:
          "border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 active:scale-[0.98]",
        ghost: "hover:bg-white/[0.06] hover:text-foreground",
        secondary:
          "bg-white/[0.06] text-foreground hover:bg-white/[0.1] active:scale-[0.98]",
        link: "text-violet-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
