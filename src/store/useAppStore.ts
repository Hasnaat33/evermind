import { create } from "zustand";
import {
  initialMemories,
  initialNotifications,
  initialTasks,
  initialThreads,
  initialIntegrations,
  accentOptions,
  type AccentName,
  type ChatMessage,
  type ChatThread,
  type Integration,
  type Memory,
  type Notification,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/mock-data";
import { generateAiReply } from "@/lib/ai-replies";
import { Brain, BookOpen, PenLine } from "lucide-react";

interface Profile {
  name: string;
  email: string;
  role: string;
  bio: string;
  initials: string;
}

interface Preferences {
  denseMode: boolean;
  reduceMotion: boolean;
  autoSummarize: boolean;
  semanticSearch: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
  aiModel: string;
  temperature: number;
  cloudBackup: boolean;
  incognitoMode: boolean;
}

interface AppState {
  /* layout */
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  searchQuery: string;

  /* memories */
  memories: Memory[];
  totalMemories: number;
  queryCount: number;
  favoriteIds: string[];

  /* tasks */
  tasks: Task[];

  /* chat */
  threads: ChatThread[];
  activeThreadId: string;
  isTyping: boolean;

  /* notifications */
  notifications: Notification[];

  /* settings */
  profile: Profile;
  preferences: Preferences;
  integrations: Integration[];
  accent: AccentName;

  /* actions */
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  addMemory: (title: string) => void;
  deleteMemory: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addTask: (title: string, priority: TaskPriority) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  setActiveThread: (id: string) => void;
  createThread: () => void;
  sendMessage: (text: string) => void;
  completeAiReply: () => void;
  markAllNotificationsRead: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
  updatePreferences: (patch: Partial<Preferences>) => void;
  toggleIntegration: (id: string) => void;
  setAccent: (accent: AccentName) => void;
}

const keywordTags: { keywords: string[]; tag: string }[] = [
  { keywords: ["work", "roadmap", "sprint", "meeting", "deadline", "investor"], tag: "Work" },
  { keywords: ["idea", "concept", "brainstorm", "hack"], tag: "Idea" },
  { keywords: ["read", "book", "article", "paper", "listen"], tag: "Reading" },
  { keywords: ["react", "code", "dev", "api", "typescript", "bug", "deploy"], tag: "Dev" },
  { keywords: ["health", "fitness", "sleep", "run", "gym", "meditat"], tag: "Health" },
  { keywords: ["plan", "goal", "quarter", "strategy"], tag: "Planning" },
];

function generateTags(title: string): string[] {
  const text = title.toLowerCase();
  const found = keywordTags
    .filter(({ keywords }) => keywords.some((k) => text.includes(k)))
    .map(({ tag }) => tag);
  const unique = [...new Set(found)];
  return unique.length > 0 ? unique.slice(0, 3) : ["Capture"];
}

const summaries = [
  "AI tagged this memory and linked it to 2 related captures from last week.",
  "Key insight extracted. This connects to your 'Dev' notes from Tuesday.",
  "Trending topic in your second brain. Consider a follow-up capture tomorrow.",
  "Actionable signal found — 3 related memories share this theme.",
];

function pickSummary(id: string) {
  return summaries[Number(id) % summaries.length];
}

const greetingIcons = [Brain, BookOpen, PenLine];

function nowLabel() {
  const d = new Date();
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export const useAppStore = create<AppState>()((set, get) => ({
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  searchQuery: "",
  memories: initialMemories,
  totalMemories: 1284,
  queryCount: 1024,
  favoriteIds: ["m1", "m5"],
  tasks: initialTasks,
  threads: initialThreads,
  activeThreadId: initialThreads[0].id,
  isTyping: false,
  notifications: initialNotifications,
  profile: {
    name: "Alex Devlin",
    email: "alex@evermind.ai",
    role: "Founder & CEO",
    bio: "Building EverMind — your AI-powered second brain.",
    initials: "AD",
  },
  preferences: {
    denseMode: false,
    reduceMotion: false,
    autoSummarize: true,
    semanticSearch: true,
    weeklyDigest: true,
    productUpdates: false,
    aiModel: "evermind-2",
    temperature: 0.7,
    cloudBackup: true,
    incognitoMode: false,
  },
  integrations: initialIntegrations,
  accent: "violet",

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addMemory: (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const id = `m-${Date.now()}`;
    const Icon = greetingIcons[Number(id) % greetingIcons.length];
    const memory: Memory = {
      id,
      title: trimmed,
      excerpt: "Captured just now via Quick Capture.",
      aiSummary: pickSummary(id),
      tags: generateTags(trimmed),
      date: "Just now",
      timestamp: Date.now(),
      gradient: "from-violet-500/25 to-blue-500/10",
      icon: Icon,
    };
    set((s) => ({
      memories: [memory, ...s.memories],
      totalMemories: s.totalMemories + 1,
      queryCount: s.queryCount + 1,
    }));
  },

  deleteMemory: (id) =>
    set((s) => ({
      memories: s.memories.filter((m) => m.id !== id),
      favoriteIds: s.favoriteIds.filter((f) => f !== id),
    })),

  toggleFavorite: (id) =>
    set((s) => ({
      favoriteIds: s.favoriteIds.includes(id)
        ? s.favoriteIds.filter((f) => f !== id)
        : [...s.favoriteIds, id],
    })),

  addTask: (title, priority) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const task: Task = {
      id: `t-${Date.now()}`,
      title: trimmed,
      priority,
      status: "todo",
      due: "No date",
      category: "Manual",
      aiExtracted: false,
    };
    set((s) => ({ tasks: [task, ...s.tasks] }));
  },

  setTaskStatus: (id, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  deleteTask: (id) =>
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  setActiveThread: (id) => set({ activeThreadId: id }),

  createThread: () => {
    const id = `th-${Date.now()}`;
    const thread: ChatThread = {
      id,
      title: "New conversation",
      time: "Just now",
      lastMessage: "",
      messages: [],
    };
    set((s) => ({ threads: [thread, ...s.threads], activeThreadId: id }));
  },

  sendMessage: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const { threads, activeThreadId, memories } = get();
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
      time: nowLabel(),
    };
    const updated = threads.map((t) =>
      t.id === activeThreadId
        ? { ...t, messages: [...t.messages, message], lastMessage: trimmed }
        : t,
    );
    set({ threads: updated, isTyping: true });
    window.setTimeout(() => {
      const reply = generateAiReply(trimmed, memories);
      const replyMessage: ChatMessage = {
        id: `msg-${Date.now()}-r`,
        role: "assistant",
        content: reply.content,
        time: nowLabel(),
        citations: reply.citations,
      };
      set((s) => ({
        isTyping: false,
        threads: s.threads.map((t) =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, replyMessage], time: "Just now" }
            : t,
        ),
      }));
    }, 1400);
  },

  completeAiReply: () => set({ isTyping: false }),

  markAllNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  updateProfile: (patch) =>
    set((s) => ({
      profile: { ...s.profile, ...patch },
    })),

  updatePreferences: (patch) =>
    set((s) => ({
      preferences: { ...s.preferences, ...patch },
    })),

  toggleIntegration: (id) =>
    set((s) => ({
      integrations: s.integrations.map((i) =>
        i.id === id ? { ...i, connected: !i.connected } : i,
      ),
    })),

  setAccent: (accent) => {
    const hex = accentOptions.find((a) => a.name === accent)?.hex ?? "#8B5CF6";
    document.documentElement.style.setProperty("--primary", hex);
    document.documentElement.style.setProperty("--ring", hex);
    set({ accent });
  },
}));

export type { Integration };
