import type { LucideIcon } from "lucide-react";
import {
  Brain,
  BookOpen,
  Briefcase,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  Flame,
  FileText,
  Github,
  HeartPulse,
  History,
  Lightbulb,
  Mail,
  MessageCircle,
  RefreshCcw,
  Rocket,
  Slack,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Memories                                                            */
/* ------------------------------------------------------------------ */

export interface Memory {
  id: string;
  title: string;
  excerpt: string;
  aiSummary: string;
  tags: string[];
  date: string;
  timestamp: number;
  gradient: string;
  icon: LucideIcon;
}

export const initialMemories: Memory[] = [
  {
    id: "m1",
    timestamp: 1785715200000,
    title: "Product roadmap — Q4 planning",
    excerpt: "Finalize AI search beta, pricing tiers, and onboarding revamp before November.",
    aiSummary: "AI tagged this as a planning note. Three of your open tasks depend on this roadmap.",
    tags: ["Work", "Planning"],
    date: "Aug 3, 2026",
    gradient: "from-violet-500/25 to-fuchsia-500/10",
    icon: Rocket,
  },
  {
    id: "m2",
    timestamp: 1785628800000,
    title: "Quantum computing breakthrough article",
    excerpt: "New error-correction milestone could cut QC costs by 60% within 2 years.",
    aiSummary: "Flagged as trending in 'Science'. Worth revisiting for your newsletter draft.",
    tags: ["Science", "Reading"],
    date: "Aug 2, 2026",
    gradient: "from-blue-500/25 to-cyan-400/10",
    icon: Compass,
  },
  {
    id: "m3",
    timestamp: 1785542400000,
    title: "Team standup — sprint 24 notes",
    excerpt: "Shipping deadline moved to Friday. Design sync needed on the settings screen.",
    aiSummary: "Action item detected: reschedule design review. Tagged under 'Work'.",
    tags: ["Work", "Team"],
    date: "Aug 1, 2026",
    gradient: "from-purple-500/25 to-indigo-400/10",
    icon: Users,
  },
  {
    id: "m4",
    timestamp: 1785456000000,
    title: "Idea: AI-powered habit coach",
    excerpt: "Personalized micro-habits from journaling data. Target market: busy professionals.",
    aiSummary: "High-potential idea. Similar patterns in your 'Health' memories suggest overlap.",
    tags: ["Idea", "Health"],
    date: "Jul 31, 2026",
    gradient: "from-emerald-500/25 to-teal-400/10",
    icon: HeartPulse,
  },
  {
    id: "m5",
    timestamp: 1785283200000,
    title: "Books to read this month",
    excerpt: "The Design of Everyday Things, Atomic Habits, Zero to One, and Gödel, Escher, Bach.",
    aiSummary: "Reading list detected. Two titles align with your 'Product' interests.",
    tags: ["Reading", "Learning"],
    date: "Jul 29, 2026",
    gradient: "from-amber-500/25 to-orange-400/10",
    icon: BookOpen,
  },
  {
    id: "m6",
    timestamp: 1785110400000,
    title: "React 19 + Server Components patterns",
    excerpt: "RSC streaming, use() hook, and caching strategies for the new dashboard module.",
    aiSummary: "Technical reference. Saved from your 'Dev' captures — revisit before next sprint.",
    tags: ["Dev", "Learning"],
    date: "Jul 27, 2026",
    gradient: "from-sky-500/25 to-blue-400/10",
    icon: Brain,
  },
  {
    id: "m7",
    timestamp: 1784937600000,
    title: "Morning routine experiment",
    excerpt: "5 AM wake, 20 min journaling, 10 min meditation. Measured focus for 14 days.",
    aiSummary: "Trend detected: your deep-work hours improved 22% since this experiment started.",
    tags: ["Health", "Habit"],
    date: "Jul 25, 2026",
    gradient: "from-rose-500/25 to-pink-400/10",
    icon: Coffee,
  },
  {
    id: "m8",
    timestamp: 1784678400000,
    title: "Investor meeting prep",
    excerpt: "Key metrics: 3.2x MoM growth, 41% retention. Practice the pricing story.",
    aiSummary: "High priority. Related to your 'Work' tag — 2 follow-up tasks suggested.",
    tags: ["Work", "Strategy"],
    date: "Jul 22, 2026",
    gradient: "from-indigo-500/25 to-violet-400/10",
    icon: Briefcase,
  },
];

/* ------------------------------------------------------------------ */
/* KPI cards (dashboard + analytics)                                   */
/* ------------------------------------------------------------------ */

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
  sparkline: number[];
  accent: string;
}

export const kpis: Kpi[] = [
  {
    id: "memories",
    label: "Total Memories",
    value: "1,284",
    delta: "+12.4%",
    trend: "up",
    icon: Brain,
    sparkline: [24, 28, 26, 32, 38, 36, 44, 52, 49, 58, 66, 74],
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "tasks",
    label: "Tasks Completed",
    value: "342",
    delta: "+8.2%",
    trend: "up",
    icon: CheckCircle2,
    sparkline: [18, 22, 20, 30, 28, 34, 38, 36, 42, 48, 46, 56],
    accent: "from-blue-500 to-cyan-400",
  },
  {
    id: "queries",
    label: "AI Queries",
    value: "1,024",
    delta: "+18.6%",
    trend: "up",
    icon: Sparkles,
    sparkline: [12, 18, 16, 24, 30, 28, 40, 44, 42, 52, 60, 72],
    accent: "from-purple-500 to-violet-400",
  },
  {
    id: "growth",
    label: "Weekly Growth",
    value: "23.5%",
    delta: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    sparkline: [30, 26, 34, 32, 40, 44, 42, 50, 55, 53, 60, 68],
    accent: "from-emerald-500 to-teal-400",
  },
];

export const analyticsKpis: Kpi[] = [
  {
    id: "velocity",
    label: "Capture Velocity",
    value: "47 / day",
    delta: "+15.2%",
    trend: "up",
    icon: Zap,
    sparkline: [22, 28, 30, 26, 38, 44, 42, 51, 48, 57, 62, 70],
    accent: "from-violet-500 to-purple-400",
  },
  {
    id: "recall",
    label: "Recall Rate",
    value: "86%",
    delta: "+6.4%",
    trend: "up",
    icon: History,
    sparkline: [58, 61, 60, 66, 70, 69, 74, 78, 77, 82, 84, 86],
    accent: "from-blue-500 to-cyan-400",
  },
  {
    id: "tags",
    label: "Active Tags",
    value: "34",
    delta: "+3",
    trend: "up",
    icon: Tag,
    sparkline: [18, 20, 21, 24, 23, 26, 27, 29, 30, 31, 33, 34],
    accent: "from-emerald-500 to-teal-400",
  },
  {
    id: "streak",
    label: "Day Streak",
    value: "6 days",
    delta: "+1",
    trend: "up",
    icon: Flame,
    sparkline: [1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6],
    accent: "from-rose-500 to-orange-400",
  },
];

/* ------------------------------------------------------------------ */
/* AI insights                                                         */
/* ------------------------------------------------------------------ */

export interface AiInsight {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: string;
  cta: string;
}

export const aiInsights: AiInsight[] = [
  {
    id: "i1",
    title: "Optimize your capture time",
    body: "Your memory density peaks between 9–11 AM. Scheduling a 15-minute capture block there could boost recall by up to 30%.",
    icon: Clock,
    accent: "from-violet-500/20 to-fuchsia-500/5 text-violet-300",
    cta: "Review capture stats",
  },
  {
    id: "i2",
    title: "Unresolved connections detected",
    body: "3 memories tagged 'Dev' reference the same unfinished refactor. Consolidating them into one project note is recommended.",
    icon: Lightbulb,
    accent: "from-blue-500/20 to-cyan-500/5 text-blue-300",
    cta: "See related memories",
  },
  {
    id: "i3",
    title: "Build a weekly review ritual",
    body: "You haven't revisited 40% of last month's memories. A 10-minute Sunday review could raise retention and spark 2× more idea connections.",
    icon: RefreshCcw,
    accent: "from-purple-500/20 to-blue-500/5 text-purple-300",
    cta: "Start a ritual",
  },
];

/* ------------------------------------------------------------------ */
/* Notifications                                                       */
/* ------------------------------------------------------------------ */

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
  accent: string;
}

export const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "AI tags applied",
    body: "3 new memories were auto-tagged with 'Work' and 'Planning'.",
    time: "2m ago",
    read: false,
    icon: Sparkles,
    accent: "bg-violet-500/15 text-violet-300",
  },
  {
    id: "n2",
    title: "Weekly digest ready",
    body: "Your AI-generated summary for the last 7 days is available.",
    time: "1h ago",
    read: false,
    icon: Mail,
    accent: "bg-blue-500/15 text-blue-300",
  },
  {
    id: "n3",
    title: "Task reminder",
    body: "\"Revise Q4 roadmap\" is due tomorrow at 9:00 AM.",
    time: "3h ago",
    read: false,
    icon: CalendarClock,
    accent: "bg-amber-500/15 text-amber-300",
  },
  {
    id: "n4",
    title: "Memory streak",
    body: "You captured 6 days in a row. Best streak yet — keep it up!",
    time: "Yesterday",
    read: true,
    icon: Flame,
    accent: "bg-rose-500/15 text-rose-300",
  },
];

/* ------------------------------------------------------------------ */
/* Tasks                                                               */
/* ------------------------------------------------------------------ */

export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  due: string;
  category: string;
  aiExtracted: boolean;
}

export const initialTasks: Task[] = [
  { id: "t1", title: "Revise Q4 product roadmap", priority: "high", status: "in-progress", due: "Aug 7, 2026", category: "Work", aiExtracted: true },
  { id: "t2", title: "Send investor follow-up deck", priority: "high", status: "todo", due: "Aug 8, 2026", category: "Strategy", aiExtracted: true },
  { id: "t3", title: "Reschedule design sync meeting", priority: "medium", status: "todo", due: "Aug 7, 2026", category: "Work", aiExtracted: true },
  { id: "t4", title: "Read 'Atomic Habits' chapters 4–6", priority: "low", status: "in-progress", due: "Aug 10, 2026", category: "Learning", aiExtracted: false },
  { id: "t5", title: "Draft newsletter on quantum computing", priority: "medium", status: "todo", due: "Aug 12, 2026", category: "Reading", aiExtracted: false },
  { id: "t6", title: "Finish 14-day morning routine log", priority: "medium", status: "done", due: "Aug 4, 2026", category: "Health", aiExtracted: false },
  { id: "t7", title: "Prototype AI habit coach idea", priority: "high", status: "done", due: "Jul 30, 2026", category: "Idea", aiExtracted: false },
  { id: "t8", title: "Migrate dashboard module to RSC", priority: "medium", status: "in-progress", due: "Aug 15, 2026", category: "Dev", aiExtracted: true },
  { id: "t9", title: "Book flight for September conference", priority: "low", status: "todo", due: "Aug 20, 2026", category: "Work", aiExtracted: false },
];

/* ------------------------------------------------------------------ */
/* AI Chat                                                             */
/* ------------------------------------------------------------------ */

export interface ChatCitation {
  title: string;
  memoryId: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  citations?: ChatCitation[];
}

export interface ChatThread {
  id: string;
  title: string;
  time: string;
  lastMessage: string;
  messages: ChatMessage[];
}

export const initialThreads: ChatThread[] = [
  {
    id: "th1",
    title: "Q4 planning review",
    time: "2h ago",
    lastMessage: "Summarize my Q4 planning so far and tell me what's missing.",
    messages: [
      {
        id: "c1",
        role: "user",
        content: "Summarize my Q4 planning so far and tell me what's missing.",
        time: "2h ago",
      },
      {
        id: "c2",
        role: "assistant",
        content:
          "Your Q4 plans currently cover the AI search beta, pricing tiers, and an onboarding revamp. Investor notes flag 3.2x MoM growth and 41% retention as the headline metrics to lead with.\n\nBased on your memories, three things are still missing: a launch checklist, a migration plan for the dashboard module, and a follow-up action after the investor meeting. Want me to draft a task list for those?",
        time: "2h ago",
        citations: [
          { title: "Product roadmap — Q4 planning", memoryId: "m1" },
          { title: "Investor meeting prep", memoryId: "m8" },
          { title: "Team standup — sprint 24 notes", memoryId: "m3" },
        ],
      },
    ],
  },
  {
    id: "th2",
    title: "AI habit coach idea",
    time: "Yesterday",
    lastMessage: "What's the strongest angle for my AI habit coach idea?",
    messages: [
      {
        id: "c3",
        role: "user",
        content: "What's the strongest angle for my AI habit coach idea?",
        time: "Yesterday",
      },
      {
        id: "c4",
        role: "assistant",
        content:
          "Your capture on the habit coach points at busy professionals as the target. The strongest angle is micro-habits from journaling data — the morning routine experiment already shows a 22% focus improvement, which is a great proof point.\n\nPair that with the 9–11 AM capture window insight and you have a differentiated pitch: a coach that adapts to behavior instead of generic reminders.",
        time: "Yesterday",
        citations: [
          { title: "Idea: AI-powered habit coach", memoryId: "m4" },
          { title: "Morning routine experiment", memoryId: "m7" },
        ],
      },
    ],
  },
  {
    id: "th3",
    title: "Reading list next picks",
    time: "2 days ago",
    lastMessage: "Which book from my list should I start with?",
    messages: [
      {
        id: "c5",
        role: "user",
        content: "Which book from my list should I start with?",
        time: "2 days ago",
      },
      {
        id: "c6",
        role: "assistant",
        content:
          "Given your current focus on product thinking, start with 'The Design of Everyday Things' — it directly feeds the onboarding revamp in your Q4 roadmap. 'Atomic Habits' pairs well with the morning routine experiment for your health goals. Read them in that order.",
        time: "2 days ago",
        citations: [{ title: "Books to read this month", memoryId: "m5" }],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Analytics                                                           */
/* ------------------------------------------------------------------ */

export interface WeekPoint {
  week: string;
  captures: number;
  queries: number;
}

export const captureTrend: WeekPoint[] = [
  { week: "May 18", captures: 22, queries: 12 },
  { week: "May 25", captures: 28, queries: 16 },
  { week: "Jun 1", captures: 26, queries: 22 },
  { week: "Jun 8", captures: 34, queries: 26 },
  { week: "Jun 15", captures: 41, queries: 30 },
  { week: "Jun 22", captures: 38, queries: 36 },
  { week: "Jun 29", captures: 47, queries: 41 },
  { week: "Jul 6", captures: 52, queries: 46 },
  { week: "Jul 13", captures: 49, queries: 52 },
  { week: "Jul 20", captures: 58, queries: 58 },
  { week: "Jul 27", captures: 64, queries: 66 },
  { week: "Aug 3", captures: 70, queries: 74 },
];

export interface DayPoint {
  day: string;
  captures: number;
  queries: number;
}

export const weeklyActivity: DayPoint[] = [
  { day: "Mon", captures: 34, queries: 26 },
  { day: "Tue", captures: 42, queries: 31 },
  { day: "Wed", captures: 38, queries: 29 },
  { day: "Thu", captures: 55, queries: 44 },
  { day: "Fri", captures: 46, queries: 37 },
  { day: "Sat", captures: 21, queries: 12 },
  { day: "Sun", captures: 27, queries: 18 },
];

export interface TopicCluster {
  name: string;
  count: number;
  color: string;
}

export const topicClusters: TopicCluster[] = [
  { name: "Work", count: 412, color: "#8B5CF6" },
  { name: "Dev", count: 268, color: "#3B82F6" },
  { name: "Reading", count: 204, color: "#F59E0B" },
  { name: "Health", count: 152, color: "#10B981" },
  { name: "Ideas", count: 128, color: "#F43F5E" },
  { name: "Other", count: 120, color: "#64748B" },
];

export const activityGrid: number[] = [
  2, 1, 0, 0, 1, 3, 4, 5, 4, 2, 1, 0,
  1, 0, 0, 1, 2, 4, 5, 5, 3, 2, 1, 0,
  0, 0, 1, 2, 3, 5, 5, 4, 4, 2, 1, 1,
  2, 1, 0, 1, 2, 4, 5, 5, 5, 3, 2, 1,
  1, 2, 1, 2, 3, 4, 4, 4, 3, 2, 1, 0,
  0, 0, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0,
  0, 1, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0,
];

export const activityDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const activityHourLabels = [
  "12a", "2a", "4a", "6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p",
];

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export type AccentName = "violet" | "blue" | "emerald" | "rose";

export const accentOptions: { name: AccentName; hex: string; label: string }[] = [
  { name: "violet", hex: "#8B5CF6", label: "Violet" },
  { name: "blue", hex: "#3B82F6", label: "Blue" },
  { name: "emerald", hex: "#10B981", label: "Emerald" },
  { name: "rose", hex: "#F43F5E", label: "Rose" },
];

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  connected: boolean;
}

export const initialIntegrations: Integration[] = [
  { id: "gdrive", name: "Google Drive", description: "Sync docs & files into your second brain", icon: FileText, accent: "from-emerald-500 to-teal-400", connected: true },
  { id: "notion", name: "Notion", description: "Import workspace notes and databases", icon: BookOpen, accent: "from-slate-400 to-slate-600", connected: true },
  { id: "slack", name: "Slack", description: "Capture ideas straight from conversations", icon: Slack, accent: "from-violet-500 to-fuchsia-400", connected: true },
  { id: "github", name: "GitHub", description: "Link code, issues and PRs to memories", icon: Github, accent: "from-slate-200 to-slate-500", connected: false },
  { id: "calendar", name: "Google Calendar", description: "Auto-connect meeting notes to events", icon: CalendarDays, accent: "from-blue-500 to-cyan-400", connected: false },
  { id: "whatsapp", name: "WhatsApp", description: "Forward voice notes and chats to capture", icon: MessageCircle, accent: "from-emerald-500 to-green-400", connected: false },
];
