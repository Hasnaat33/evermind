import { Suspense, lazy, type ComponentType } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

const withDefault = (loader: () => Promise<Record<string, ComponentType>>, name: string) =>
  lazy(() => loader().then((m) => ({ default: m[name] })));

const DashboardPage = withDefault(() => import("@/pages/DashboardPage"), "DashboardPage");
const MemoriesPage = withDefault(() => import("@/pages/MemoriesPage"), "MemoriesPage");
const ChatPage = withDefault(() => import("@/pages/ChatPage"), "ChatPage");
const TasksPage = withDefault(() => import("@/pages/TasksPage"), "TasksPage");
const AnalyticsPage = withDefault(() => import("@/pages/AnalyticsPage"), "AnalyticsPage");
const SettingsPage = withDefault(() => import("@/pages/SettingsPage"), "SettingsPage");

function PageFallback() {
  return (
    <div className="flex h-full min-h-40 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_4px_20px_-4px_rgba(139,92,246,0.7)]">
          <Brain className="size-5 animate-pulse text-white" />
        </div>
        <p className="text-xs text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}

export function AppShell() {
  const location = useLocation();

  return (
    <div className="flex h-full overflow-hidden">
      <AmbientBackground />
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar />

        <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="h-full"
            >
              <Suspense fallback={<PageFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/memories" element={<MemoriesPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/ai-chat" element={<ChatPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<DashboardPage />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
