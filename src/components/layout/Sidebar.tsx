import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Brain,
  MessageSquare,
  CheckSquare,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/memories", label: "Memories", icon: Brain },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 px-2", collapsed && "justify-center px-0")}>
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_4px_20px_-4px_rgba(139,92,246,0.7)]">
        <Brain className="size-5 text-white" />
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 ring-2 ring-background" />
      </div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <div className="text-[15px] leading-tight font-bold tracking-tight">
              EverMind
            </div>
            <div className="text-[10px] leading-tight font-medium tracking-wide text-violet-400 uppercase">
              Second Brain
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({
  item,
  collapsed,
}: {
  item: (typeof navItems)[number];
  collapsed: boolean;
}) {
  const Icon = item.icon;
  const button = (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          collapsed && "justify-center px-0",
          isActive
            ? "text-white"
            : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-pill"
              className="absolute inset-0 rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-500/20 to-blue-500/10 shadow-[0_4px_20px_-6px_rgba(139,92,246,0.5)]"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <Icon
            className={cn(
              "relative size-[18px] shrink-0 transition-transform duration-200 group-hover:scale-110",
              isActive && "text-violet-300",
            )}
          />
          {!collapsed && (
            <span className="relative transition-all duration-200">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  if (!collapsed) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const mobileOpen = useAppStore((s) => s.mobileSidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);

  const nav = (
    <div
      className={cn(
        "flex h-full flex-col gap-6 border-r border-white/[0.07] bg-[#0c0c14]/70 px-3 py-5 backdrop-blur-2xl",
        collapsed && "items-center",
      )}
    >
      <div className="h-9">
        <Brand collapsed={collapsed} />
      </div>

      <nav className="flex w-full flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full overflow-hidden"
          >
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 via-transparent to-blue-500/10 p-4">
              <div className="absolute -top-8 -right-8 size-20 rounded-full bg-violet-500/30 blur-2xl" />
              <Zap className="size-5 text-violet-300" />
              <p className="mt-2 text-sm font-semibold">Go Pro</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Unlimited AI summaries, semantic search & 10× more captures.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="default" className="cursor-pointer hover:bg-violet-500/25">
                  Upgrade
                </Badge>
                <Badge variant="outline">$0 / mo</Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "w-full border-t border-white/[0.07] pt-4",
          collapsed && "flex justify-center",
        )}
      >
        <button
          onClick={toggleSidebar}
          className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="size-[18px]" />
          ) : (
            <>
              <ChevronsLeft className="size-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 256 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="sticky top-0 hidden h-full shrink-0 lg:block"
      >
        {nav}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 350, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              {nav}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute top-5 right-3 flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                aria-label="Close sidebar"
              >
                <X className="size-4" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
