import { motion } from "framer-motion";
import { Sparkles, CalendarDays } from "lucide-react";
import type { Memory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const tagVariants: Record<string, "default" | "blue" | "emerald" | "amber" | "rose" | "secondary"> = {
  Work: "default",
  Planning: "blue",
  Science: "blue",
  Reading: "amber",
  Team: "blue",
  Idea: "emerald",
  Health: "emerald",
  Learning: "amber",
  Dev: "rose",
  Habit: "emerald",
  Strategy: "blue",
  Capture: "default",
};

interface MemoryCardProps {
  memory: Memory;
  index: number;
  onSelect?: (memory: Memory) => void;
  compact?: boolean;
}

export function MemoryCard({ memory, index, onSelect, compact }: MemoryCardProps) {
  const Icon = memory.icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect?.(memory)}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        onSelect && "cursor-pointer",
      )}
    >
      <div className="glass glass-hover card-shadow relative flex h-full flex-col rounded-2xl p-4">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.06] transition-opacity duration-500 group-hover:opacity-20",
            memory.gradient,
          )}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110",
              memory.gradient,
            )}
          >
            <Icon className="size-4" />
          </div>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <CalendarDays className="size-3" />
            {memory.date}
          </span>
        </div>

        <h4 className="relative mt-3 line-clamp-1 text-sm font-semibold tracking-tight">
          {memory.title}
        </h4>
        <p className={cn("relative mt-1 text-xs leading-relaxed text-muted-foreground", compact ? "line-clamp-1" : "line-clamp-2")}>
          {memory.excerpt}
        </p>

        <div className={cn("relative mt-3 flex items-start gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2", compact && "hidden")}>
          <Sparkles className="mt-0.5 size-3 shrink-0 text-violet-400" />
          <p className="line-clamp-2 text-[11px] leading-relaxed text-violet-200/80 italic">
            {memory.aiSummary}
          </p>
        </div>

        <div className="relative mt-auto flex flex-wrap gap-1.5 pt-3">
          {memory.tags.map((tag) => (
            <Badge key={tag} variant={tagVariants[tag] ?? "secondary"}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
