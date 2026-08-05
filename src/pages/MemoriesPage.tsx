import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  Star,
  Trash2,
  Sparkles,
  CalendarDays,
  ArrowUpDown,
  Wand2,
} from "lucide-react";
import type { Memory } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { MemoryCard } from "@/components/memories/MemoryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ViewMode = "grid" | "list";
type SortMode = "recent" | "oldest" | "az";

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

function ListRow({
  memory,
  onSelect,
}: {
  memory: Memory;
  onSelect: (m: Memory) => void;
}) {
  const Icon = memory.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(memory)}
      className="glass glass-hover card-shadow group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3"
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110",
          memory.gradient,
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold tracking-tight">{memory.title}</h4>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{memory.excerpt}</p>
      </div>
      <div className="hidden flex-wrap gap-1.5 sm:flex">
        {memory.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant={tagVariants[tag] ?? "secondary"}>
            {tag}
          </Badge>
        ))}
      </div>
      <span className="hidden shrink-0 items-center gap-1 text-[11px] text-muted-foreground md:flex">
        <CalendarDays className="size-3" />
        {memory.date}
      </span>
    </motion.div>
  );
}

function MemoryDetailDialog({
  memory,
  onClose,
}: {
  memory: Memory | null;
  onClose: () => void;
}) {
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const deleteMemory = useAppStore((s) => s.deleteMemory);
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const Icon = memory?.icon;

  const isFavorite = memory ? favoriteIds.includes(memory.id) : false;

  return (
    <Dialog open={!!memory} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        {memory && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                    memory.gradient,
                  )}
                >
                  {Icon && <Icon className="size-5" />}
                </div>
                <DialogTitle className="text-lg">{memory.title}</DialogTitle>
              </div>
              <DialogDescription className="pt-1">
                <span className="flex items-center gap-1.5 text-xs">
                  <CalendarDays className="size-3" /> Captured {memory.date}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-foreground/90">{memory.excerpt}</p>

              <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-500/5 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-300">
                  <Sparkles className="size-3.5" /> AI Summary
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-violet-100/80 italic">
                  {memory.aiSummary}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {memory.tags.map((tag) => (
                  <Badge key={tag} variant={tagVariants[tag] ?? "secondary"}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  deleteMemory(memory.id);
                  onClose();
                }}
                className="mr-auto text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
              >
                <Trash2 className="size-4" /> Delete
              </Button>
              <Button variant="outline" onClick={() => toggleFavorite(memory.id)}>
                <Star
                  className={cn(
                    "size-4",
                    isFavorite && "fill-amber-400 text-amber-400",
                  )}
                />
                {isFavorite ? "Favorited" : "Favorite"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function MemoriesPage() {
  const memories = useAppStore((s) => s.memories);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const favoriteIds = useAppStore((s) => s.favoriteIds);
  const addMemory = useAppStore((s) => s.addMemory);

  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortMode>("recent");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selected, setSelected] = useState<Memory | null>(null);
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captureText, setCaptureText] = useState("");
  const [captured, setCaptured] = useState(false);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    memories.forEach((m) =>
      m.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)),
    );
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [memories]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = memories.filter((m) => {
      if (favoritesOnly && !favoriteIds.includes(m.id)) return false;
      if (activeTag !== "All" && !m.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.excerpt.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    result = [...result];
    if (sort === "recent") result.sort((a, b) => b.timestamp - a.timestamp);
    if (sort === "oldest") result.sort((a, b) => a.timestamp - b.timestamp);
    if (sort === "az") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [memories, searchQuery, activeTag, favoritesOnly, sort, favoriteIds]);

  const handleCapture = () => {
    if (!captureText.trim()) return;
    addMemory(captureText);
    setCaptureText("");
    setCaptured(true);
    window.setTimeout(() => {
      setCaptured(false);
      setCaptureOpen(false);
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            Memories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="text-gradient font-semibold">{memories.length}</span>{" "}
            memories · every thought, searchable by tag and meaning
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFavoritesOnly((v) => !v)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
              favoritesOnly
                ? "border-amber-400/30 bg-amber-500/10 text-amber-300"
                : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
            )}
          >
            <Star className={cn("size-4", favoritesOnly && "fill-amber-400 text-amber-400")} />
            <span className="hidden sm:inline">Favorites</span>
          </button>
          <Button variant="gradient" size="sm" onClick={() => setCaptureOpen(true)}>
            <Plus className="size-4" /> New memory
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="glass card-shadow sticky top-16 z-20 -mx-4 mb-6 flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-xl sm:mx-0"
      >
        <div className="relative min-w-0 flex-1 basis-full sm:basis-56">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories…"
            className="glass h-9 rounded-full pl-9"
          />
        </div>

        <div className="scrollbar-none flex flex-1 gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTag("All")}
            className={cn(
              "shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all",
              activeTag === "All"
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_2px_12px_-2px_rgba(139,92,246,0.6)]"
                : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground",
            )}
          >
            All · {memories.length}
          </button>
          {tagCounts.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? "All" : tag)}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                activeTag === tag
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                  : "border border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground",
              )}
            >
              {tag} · {count}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSort(sort === "recent" ? "oldest" : sort === "oldest" ? "az" : "recent")}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-white/[0.06] hover:text-foreground"
          >
            <ArrowUpDown className="size-3.5" />
            {sort === "recent" ? "Recent" : sort === "oldest" ? "Oldest" : "A–Z"}
          </button>
          <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
            {(["grid", "list"] as ViewMode[]).map((mode) => {
              const Icon = mode === "grid" ? LayoutGrid : List;
              return (
                <button
                  key={mode}
                  onClick={() => setView(mode)}
                  className={cn(
                    "flex size-8 cursor-pointer items-center justify-center rounded-md transition-all",
                    view === mode
                      ? "bg-white/[0.1] text-violet-300"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-label={`${mode} view`}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="glass card-shadow flex flex-col items-center justify-center rounded-2xl py-20 text-center">
          <Search className="size-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium">No memories match</p>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            Try clearing filters, or capture something new to grow your second brain.
          </p>
        </div>
      ) : view === "grid" ? (
        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={index}
                onSelect={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div layout className="flex flex-col gap-2.5">
          <AnimatePresence mode="popLayout">
            {filtered.map((memory) => (
              <ListRow key={memory.id} memory={memory} onSelect={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <MemoryDetailDialog memory={selected} onClose={() => setSelected(null)} />

      <Dialog open={captureOpen} onOpenChange={setCaptureOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-md">
                <Wand2 className="size-4" />
              </div>
              <DialogTitle>New memory</DialogTitle>
            </div>
            <DialogDescription>
              AI will tag and summarize it the moment you save.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={captureText}
            onChange={(e) => setCaptureText(e.target.value)}
            placeholder="What would you like to remember?"
            className="min-h-28"
            autoFocus
          />
          <AnimatePresence>
            {captured && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium text-emerald-400"
              >
                Captured and indexed. AI summary ready.
              </motion.p>
            )}
          </AnimatePresence>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCaptureOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              onClick={handleCapture}
              disabled={!captureText.trim()}
            >
              <Sparkles className="size-4" /> Save memory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
