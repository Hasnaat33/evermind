import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Plus, Zap, Lightbulb } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const suggestions = [
  { icon: Zap, label: "Quick idea" },
  { icon: Lightbulb, label: "Meeting notes" },
  { icon: Sparkles, label: "Reading list" },
];

export function QuickCapture() {
  const addMemory = useAppStore((s) => s.addMemory);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [isTagging, setIsTagging] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;
    setIsTagging(true);
    setSaved(true);

    // Simulated AI tag latency for a premium micro-interaction
    window.setTimeout(() => {
      addMemory(text);
      setText("");
      setAiTags(["Capture", "Work"]);
      window.setTimeout(() => {
        setIsTagging(false);
        setAiTags([]);
        setSaved(false);
      }, 2200);
    }, 600);
  };

  return (
    <div className="glass card-shadow group relative flex h-full flex-col overflow-hidden rounded-2xl p-5">
      <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-violet-500/15 blur-3xl transition-opacity duration-500 group-focus-within:opacity-100" />

      <div className="relative flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_4px_16px_-4px_rgba(139,92,246,0.6)]">
          <Wand2 className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Quick Capture</h3>
          <p className="text-xs text-muted-foreground">
            Save a thought — AI tags and summarizes it instantly
          </p>
        </div>
        <Badge variant="blue" className="ml-auto hidden sm:inline-flex">
          <Sparkles className="size-3" /> AI
        </Badge>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind? E.g. Remember to review the investor deck before Friday…"
        className="mt-4 min-h-28 flex-1 bg-white/[0.02] text-[15px] leading-relaxed"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
        }}
      />

      <AnimatePresence>
        {isTagging && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative mt-3 flex flex-wrap items-center gap-2"
          >
            <div className="flex items-center gap-1.5 text-xs text-violet-300">
              <Wand2 className="size-3.5 animate-pulse" />
              <span className="mr-1">AI tagging…</span>
            </div>
            <AnimatePresence>
              {aiTags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, type: "spring", stiffness: 400, damping: 22 }}
                >
                  <Badge variant="default">{tag}</Badge>
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {saved && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative mt-2 text-xs font-medium text-emerald-400"
          >
            Saved to your second brain
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map(({ icon: SIcon, label }) => (
            <button
              key={label}
              onClick={() => setText(label)}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <SIcon className="size-3" /> {label}
            </button>
          ))}
        </div>
        <Button
          variant="gradient"
          size="sm"
          onClick={handleSave}
          disabled={!text.trim() || isTagging}
          className="px-4"
        >
          <Plus className="size-4" /> Save memory
        </Button>
      </div>
    </div>
  );
}
