import { useMemo, useState, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Plus,
  Trash2,
  Sparkles,
  CalendarDays,
  Zap,
  Flag,
  CheckCircle2,
  CircleDashed,
  Loader2,
  GripVertical,
  Inbox,
} from "lucide-react";
import type { Task, TaskPriority, TaskStatus } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressRing } from "@/components/charts/ProgressRing";

const priorityBadge: Record<TaskPriority, "rose" | "amber" | "blue"> = {
  high: "rose",
  medium: "amber",
  low: "blue",
};

const columns: {
  status: TaskStatus;
  title: string;
  hint: string;
  icon: typeof CircleDashed;
  iconClass: string;
}[] = [
  {
    status: "todo",
    title: "To do",
    hint: "Drop tasks to queue them up",
    icon: CircleDashed,
    iconClass: "text-slate-300",
  },
  {
    status: "in-progress",
    title: "In progress",
    hint: "Currently being worked on",
    icon: Loader2,
    iconClass: "text-blue-300",
  },
  {
    status: "done",
    title: "Done",
    hint: "Completed this week",
    icon: CheckCircle2,
    iconClass: "text-emerald-300",
  },
];

function TaskCheckbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={checked ? "Mark as not done" : "Mark as done"}
      className={cn(
        "flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-all duration-200",
        checked
          ? "border-transparent bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_2px_12px_-2px_rgba(139,92,246,0.6)]"
          : "border-white/20 bg-white/[0.03] hover:border-violet-400/60 hover:bg-violet-500/10",
      )}
    >
      <AnimatePresence>
        {checked && (
          <motion.svg
            key="check"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <path
              d="M2.5 6.2L5 8.7L9.5 3.5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

function TaskCard({
  task,
  dragging,
  onDragStart,
  onDragEnd,
}: {
  task: Task;
  dragging: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void;
  onDragEnd: () => void;
}) {
  const setTaskStatus = useAppStore((s) => s.setTaskStatus);
  const deleteTask = useAppStore((s) => s.deleteTask);
  const done = task.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25 }}
    >
      <div
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}
        onDragEnd={onDragEnd}
        className={cn(
          "group cursor-grab rounded-xl border border-white/10 bg-white/[0.04] p-3.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-200",
          "hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_8px_32px_-10px_rgba(139,92,246,0.35)]",
          "active:cursor-grabbing",
          dragging && "rotate-2 opacity-40 ring-2 ring-violet-500/50",
          done && "opacity-60",
        )}
      >
        <div className="flex items-start gap-2.5">
          <GripVertical className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
          <TaskCheckbox
            checked={done}
            onToggle={() => setTaskStatus(task.id, done ? "todo" : "done")}
          />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-sm leading-snug font-medium transition-all duration-300",
                done && "text-muted-foreground line-through decoration-violet-400/50",
              )}
            >
              {task.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Badge variant={priorityBadge[task.priority]} className="cursor-default capitalize">
                <Flag className="size-3" />
                {task.priority}
              </Badge>
              <Badge variant="secondary" className="cursor-default">
                {task.category}
              </Badge>
              {task.aiExtracted && (
                <Badge variant="default" className="cursor-default">
                  <Sparkles className="size-3" /> AI
                </Badge>
              )}
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <CalendarDays className="size-3" />
                {task.due}
              </span>
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-400 group-hover:opacity-100"
            aria-label="Delete task"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function TasksPage() {
  const tasks = useAppStore((s) => s.tasks);
  const addTask = useAppStore((s) => s.addTask);
  const setTaskStatus = useAppStore((s) => s.setTaskStatus);

  const [newTitle, setNewTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<TaskStatus | null>(null);

  const byStatus = useMemo(
    () => ({
      todo: tasks.filter((t) => t.status === "todo"),
      "in-progress": tasks.filter((t) => t.status === "in-progress"),
      done: tasks.filter((t) => t.status === "done"),
    }),
    [tasks],
  );

  const completion = tasks.length === 0 ? 0 : Math.round((byStatus.done.length / tasks.length) * 100);
  const focusTarget = tasks.filter((t) => t.priority === "high" && t.status !== "done").length;

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTask(newTitle, priority);
    setNewTitle("");
  };

  const handleExtract = () => {
    if (extracting || extracted) return;
    setExtracting(true);
    window.setTimeout(() => {
      addTask("Consolidate dashboard refactor notes", "high");
      addTask("Reply to investor follow-up", "medium");
      setExtracting(false);
      setExtracted(true);
      window.setTimeout(() => setExtracted(false), 3000);
    }, 1500);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    setDraggingId(id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overColumn !== status) setOverColumn(status);
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggingId) {
      setTaskStatus(draggingId, status);
    }
    setDraggingId(null);
    setOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverColumn(null);
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
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {byStatus.done.length} of {tasks.length} done ·{" "}
            <span className="text-gradient font-semibold">{completion}%</span> completion this
            week — drag cards between columns
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="hidden cursor-default sm:inline-flex">
            <Zap className="size-3 text-violet-400" /> {focusTarget} high-priority open
          </Badge>
          <ProgressRing value={completion} size={64} thickness={6} label="" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="glass card-shadow rounded-2xl p-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a task… press Enter to save"
            className="h-10 flex-1 basis-48 border-0 bg-white/[0.03] shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
            {(["high", "medium", "low"] as TaskPriority[]).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={cn(
                  "cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-all",
                  priority === p
                    ? "bg-white/[0.1] text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="gradient" onClick={handleAdd} disabled={!newTitle.trim()}>
            <Plus className="size-4" /> Add task
          </Button>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((column, colIndex) => {
          const Icon = column.icon;
          const columnTasks = byStatus[column.status];
          const isOver = overColumn === column.status;
          return (
            <motion.div
              key={column.status}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + colIndex * 0.08 }}
              onDragOver={(e) => handleDragOver(e, column.status)}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOverColumn((s) => (s === column.status ? null : s));
                }
              }}
              onDrop={() => handleDrop(column.status)}
              className={cn(
                "glass card-shadow flex min-h-64 flex-col rounded-2xl p-3 transition-all duration-200",
                isOver && "border-violet-400/40 bg-violet-500/[0.06] ring-1 ring-violet-400/30",
              )}
            >
              <div className="flex items-center justify-between px-2 pt-1 pb-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("size-4", column.iconClass)} />
                  <h2 className="text-sm font-semibold tracking-tight">{column.title}</h2>
                  <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {columnTasks.length}
                  </span>
                </div>
                <span className="hidden text-[10px] text-muted-foreground/60 lg:block">
                  {column.hint}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto pb-1 pr-0.5">
                <AnimatePresence mode="popLayout" initial={false}>
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      dragging={draggingId === task.id}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </AnimatePresence>

                {columnTasks.length === 0 && (
                  <div
                    className={cn(
                      "flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-10 text-center transition-colors",
                      isOver
                        ? "border-violet-400/50 bg-violet-500/10"
                        : "border-white/10 bg-white/[0.02]",
                    )}
                  >
                    {draggingId ? (
                      <>
                        <Inbox className="size-5 text-violet-300" />
                        <p className="text-xs font-medium text-violet-300">Drop it here</p>
                      </>
                    ) : (
                      <>
                        <Inbox className="size-5 text-muted-foreground/40" />
                        <p className="text-xs text-muted-foreground">No tasks yet</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass glass-hover card-shadow relative overflow-hidden rounded-2xl p-5"
        >
          <div className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-violet-500/20 blur-2xl" />
          <div className="relative flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-md">
              <Sparkles className="size-4" />
            </div>
            <h3 className="text-sm font-semibold">AI Task Extraction</h3>
          </div>
          <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
            Scan your latest memories and auto-create tasks from detected action items —
            meetings, deadlines, follow-ups.
          </p>
          <Button
            variant="gradient"
            size="sm"
            className="relative mt-4 w-full"
            onClick={handleExtract}
            disabled={extracting || extracted}
          >
            {extracting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Scanning memories…
              </>
            ) : extracted ? (
              <>
                <Check className="size-4" /> 2 tasks extracted
              </>
            ) : (
              <>
                <Zap className="size-4" /> Extract tasks
              </>
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="glass card-shadow rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold">This week</h3>
          <div className="mt-3 space-y-2.5">
            {[
              { label: "Completed", value: byStatus.done.length, color: "from-violet-500 to-blue-500" },
              { label: "In progress", value: byStatus["in-progress"].length, color: "from-blue-500 to-cyan-400" },
              { label: "Up next", value: byStatus.todo.length, color: "from-white/20 to-white/10" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-semibold">{row.value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.value / Math.max(tasks.length, 1)) * 100}%` }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={cn("h-full rounded-full bg-gradient-to-r", row.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.36 }}
          className="glass card-shadow rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold">Focus tip</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            You have{" "}
            <span className="text-rose-400 font-semibold">{focusTarget} high-priority</span> open
            tasks. Tackle those before noon — your capture data shows peak focus between 9–11 AM.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
