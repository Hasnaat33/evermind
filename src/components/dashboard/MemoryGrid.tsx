import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { MemoryCard } from "@/components/memories/MemoryCard";

export function MemoryGrid() {
  const memories = useAppStore((s) => s.memories);
  const searchQuery = useAppStore((s) => s.searchQuery);

  const filtered = memories.filter((m) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.excerpt.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Memory Grid</h2>
          <p className="text-xs text-muted-foreground">
            {searchQuery.trim()
              ? `${filtered.length} results for "${searchQuery.trim()}"`
              : "Recently captured thoughts, tagged and summarized by AI"}
          </p>
        </div>
        <button className="cursor-pointer text-sm font-medium text-violet-400 transition-colors hover:text-violet-300">
          View all →
        </button>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="glass card-shadow flex flex-col items-center justify-center rounded-2xl py-16 text-center">
          <Sparkles className="size-8 text-violet-400/60" />
          <p className="mt-3 text-sm font-medium">No memories found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try a different search term or capture something new.
          </p>
        </div>
      )}
    </section>
  );
}
