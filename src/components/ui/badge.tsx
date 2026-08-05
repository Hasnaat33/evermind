import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-violet-500/30 bg-violet-500/15 text-violet-300",
        secondary: "border-white/10 bg-white/[0.05] text-muted-foreground",
        blue: "border-blue-500/30 bg-blue-500/15 text-blue-300",
        emerald: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
        amber: "border-amber-500/30 bg-amber-500/15 text-amber-300",
        rose: "border-rose-500/30 bg-rose-500/15 text-rose-300",
        outline: "border-white/15 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
