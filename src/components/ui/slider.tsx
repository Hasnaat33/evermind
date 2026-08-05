import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/[0.08]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-4 cursor-grab rounded-full border border-white/20 bg-white shadow-md outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-violet-500/60 active:cursor-grabbing" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
