import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  MessageSquare,
  Plus,
  Search,
  Send,
  Paperclip,
  Mic,
  PanelLeft,
  Sparkles,
  BookMarked,
  X,
} from "lucide-react";
import type { ChatMessage } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const starterPrompts = [
  "Summarize my Q4 planning so far",
  "What should I read next?",
  "Turn my ideas into a task list",
  "How's my health routine tracking?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-violet-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
      <span className="ml-1 text-[11px] text-muted-foreground">EverMind is thinking…</span>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const navigate = useNavigate();
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] sm:max-w-[70%]">
          <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-violet-500 to-blue-500 px-4 py-3 text-sm leading-relaxed text-white shadow-[0_6px_24px_-8px_rgba(139,92,246,0.6)]">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="mt-1 pr-1 text-right text-[10px] text-muted-foreground">{message.time}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3"
    >
      <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_4px_16px_-4px_rgba(139,92,246,0.6)]">
        <Brain className="size-4 text-white" />
      </div>
      <div className="max-w-[85%] min-w-0 sm:max-w-[75%]">
        <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          {message.citations && message.citations.length > 0 && (
            <div className="mt-3 border-t border-white/[0.07] pt-2.5">
              <p className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                <BookMarked className="size-3" /> Sources from your memories
              </p>
              <div className="flex flex-wrap gap-1.5">
                {message.citations.map((citation) => (
                  <button
                    key={citation.memoryId}
                    onClick={() => navigate("/memories")}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] text-violet-300 transition-all hover:bg-violet-500/20"
                  >
                    <Sparkles className="size-3" />
                    {citation.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="mt-1 pl-1 text-[10px] text-muted-foreground">{message.time}</p>
      </div>
    </motion.div>
  );
}

function ThreadList() {
  const threads = useAppStore((s) => s.threads);
  const activeThreadId = useAppStore((s) => s.activeThreadId);
  const setActiveThread = useAppStore((s) => s.setActiveThread);
  const createThread = useAppStore((s) => s.createThread);
  const [query, setQuery] = useState("");

  const filtered = threads.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h2 className="text-sm font-semibold tracking-tight">Conversations</h2>
        <Button size="icon-sm" variant="gradient" onClick={createThread} aria-label="New conversation">
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="relative px-3 pb-2">
        <Search className="pointer-events-none absolute top-1/2 left-6 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats…"
          className="glass h-8 rounded-full pl-9 text-xs"
        />
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
        <AnimatePresence initial={false}>
          {filtered.map((thread) => (
            <motion.button
              key={thread.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveThread(thread.id)}
              className={cn(
                "flex w-full cursor-pointer flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors",
                thread.id === activeThreadId
                  ? "border border-violet-400/25 bg-gradient-to-r from-violet-500/15 to-blue-500/5"
                  : "hover:bg-white/[0.05]",
              )}
            >
              <span
                className={cn(
                  "truncate text-[13px] font-medium",
                  thread.id === activeThreadId ? "text-white" : "text-foreground/80",
                )}
              >
                {thread.title}
              </span>
              <span className="w-full truncate text-[11px] text-muted-foreground">
                {thread.lastMessage || "Start the conversation"}
              </span>
              <span className="text-[10px] text-muted-foreground/60">{thread.time}</span>
            </motion.button>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            No conversations found
          </p>
        )}
      </div>
    </div>
  );
}

export function ChatPage() {
  const threads = useAppStore((s) => s.threads);
  const activeThreadId = useAppStore((s) => s.activeThreadId);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const isTyping = useAppStore((s) => s.isTyping);
  const preferences = useAppStore((s) => s.preferences);

  const [input, setInput] = useState("");
  const [threadsOpen, setThreadsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? threads[0];
  const messages = useMemo(() => activeThread?.messages ?? [], [activeThread]);
  const isEmpty = messages.length === 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, isTyping, activeThreadId]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex h-full">
      {/* Desktop thread list */}
      <aside className="glass-strong hidden w-72 shrink-0 border-r border-white/[0.07] lg:block">
        <ThreadList />
      </aside>

      {/* Mobile thread drawer */}
      <AnimatePresence>
        {threadsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setThreadsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 350, damping: 34 }}
              className="glass-strong fixed inset-y-0 left-0 z-50 w-72 border-r border-white/[0.07] lg:hidden"
            >
              <button
                onClick={() => setThreadsOpen(false)}
                className="absolute top-4 right-3 flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                aria-label="Close conversations"
              >
                <X className="size-4" />
              </button>
              <ThreadList />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Conversation */}
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="glass-strong flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.07] px-4">
          <button
            onClick={() => setThreadsOpen(true)}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground lg:hidden"
            aria-label="Show conversations"
          >
            <PanelLeft className="size-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold tracking-tight">
              {activeThread?.title}
            </h2>
          </div>
          <Badge variant="default" className="cursor-default">
            <Sparkles className="size-3" />
            {preferences.aiModel === "evermind-2" ? "EverMind 2" : "EverMind 2 · strong"}
          </Badge>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-8"
        >
          {isEmpty && !isTyping ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_8px_32px_-8px_rgba(139,92,246,0.7)]"
              >
                <MessageSquare className="size-7 text-white" />
              </motion.div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                Ask your second brain anything
              </h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Grounded answers, cited from your own memories — private by default.
              </p>
              <div className="mt-6 grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
                {starterPrompts.map((prompt, i) => (
                  <motion.button
                    key={prompt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    onClick={() => sendMessage(prompt)}
                    className="glass glass-hover cursor-pointer rounded-xl px-4 py-3 text-left text-xs leading-relaxed text-muted-foreground"
                  >
                    <span className="text-violet-300">“</span>
                    {prompt}
                    <span className="text-violet-300">”</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
                    <Brain className="size-4 text-white" />
                  </div>
                  <TypingIndicator />
                </motion.div>
              )}
            </>
          )}
        </div>

        <div className="shrink-0 px-4 pt-2 pb-5 sm:px-8">
          <div className="glass card-shadow mx-auto flex max-w-3xl items-end gap-2 rounded-2xl p-2">
            <button
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              aria-label="Attach"
            >
              <Paperclip className="size-4" />
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message your second brain…"
              className="h-9 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <button
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              aria-label="Voice input"
            >
              <Mic className="size-4" />
            </button>
            <Button
              variant="gradient"
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send className="size-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
            Enter to send · Shift + Enter for a new line · Answers cite your memories
          </p>
        </div>
      </section>
    </div>
  );
}
