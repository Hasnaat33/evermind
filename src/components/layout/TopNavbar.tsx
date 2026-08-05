import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  LogOut,
  Settings,
  Sparkles,
  CheckCheck,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function PageTitle({ path }: { path: string }) {
  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/memories": "Memories",
    "/chat": "AI Chat",
    "/tasks": "Tasks",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };
  return (
    <motion.h1
      key={path}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="text-base font-semibold tracking-tight lg:text-lg"
    >
      {titles[path] ?? "EverMind"}
    </motion.h1>
  );
}

function GlobalSearch() {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 transition-colors",
          focused ? "text-violet-400" : "text-muted-foreground",
        )}
      />
      <Input
        ref={inputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search memories, tags, people..."
        className="glass h-9 rounded-full pl-9 pr-14 backdrop-blur-xl transition-all duration-300 focus-visible:border-violet-500/50"
      />
      <kbd className="absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
        <Command className="size-2.5" /> K
      </kbd>
    </div>
  );
}

function NotificationsMenu() {
  const notifications = useAppStore((s) => s.notifications);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="glass relative flex size-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-white/[0.08]"
          aria-label="Notifications"
        >
          <Bell className="size-[18px] text-muted-foreground transition-colors hover:text-foreground" />
          <AnimatePresence>
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-1 right-1 flex size-2.5"
              >
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 ring-2 ring-background" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="px-0 text-sm font-semibold text-foreground">
            Notifications
          </DropdownMenuLabel>
          <button
            onClick={markAllNotificationsRead}
            className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-violet-400 transition-colors hover:bg-violet-500/10"
          >
            <CheckCheck className="size-3.5" /> Mark all read
          </button>
        </div>
        <DropdownMenuSeparator />
        <div className="flex max-h-80 flex-col overflow-y-auto">
          <AnimatePresence initial={false}>
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                >
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", n.accent)}>
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{n.title}</p>
                      {!n.read && (
                        <span className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[10px] tracking-wide text-muted-foreground/60 uppercase">{n.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer outline-none" aria-label="Account menu">
          <Avatar className="size-9 ring-2 ring-violet-500/40 transition-all duration-300 hover:ring-violet-500/80">
            <AvatarFallback className="text-xs">AD</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="size-10">
            <AvatarFallback className="text-sm">AD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Alex Devlin</p>
            <p className="truncate text-xs text-muted-foreground">alex@evermind.ai</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/")}>
          <Sparkles className="text-violet-400" /> Pro workspace
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TopNavbar() {
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);
  const location = useLocation();

  return (
    <header className="glass-strong sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.07] border-t-0 px-4 sm:px-6">
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden items-center gap-2 lg:flex">
        <PageTitle path={location.pathname} />
      </div>

      <div className="flex flex-1 justify-center px-2 sm:justify-end sm:px-0">
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
          <GlobalSearch />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <NotificationsMenu />
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <UserMenu />
      </div>
    </header>
  );
}
