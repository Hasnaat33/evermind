import { useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  analyticsKpis,
  captureTrend,
  weeklyActivity,
  topicClusters,
  activityGrid,
  activityDayLabels,
  activityHourLabels,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { KpiCard } from "@/components/dashboard/KpiCard";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { AreaChart } from "@/components/charts/AreaChart";
import { ActivityHeatmap } from "@/components/charts/ActivityHeatmap";
import { ProgressRing } from "@/components/charts/ProgressRing";

const ranges = ["7d", "30d", "90d"] as const;

interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs shadow-2xl">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="flex items-center gap-1.5 text-muted-foreground"
        >
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="capitalize">{entry.name}:</span>
          <span className="font-semibold text-foreground">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export function AnalyticsPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30d");

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How your second brain grows — capture velocity, recall, and topic depth
          </p>
        </div>
        <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                range === r
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_2px_10px_-2px_rgba(139,92,246,0.6)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsKpis.map((kpi, index) => (
          <KpiCard key={kpi.id} kpi={kpi} index={index} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="glass card-shadow rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Capture & query velocity</h2>
              <p className="text-xs text-muted-foreground">Weekly captures vs AI queries</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-violet-500" /> Captures
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-blue-500" /> AI queries
              </span>
            </div>
          </div>
          <AreaChart
            className="mt-4"
            labels={captureTrend.map((p) => p.week)}
            series={[
              { key: "captures", name: "Captures", data: captureTrend.map((p) => p.captures), color: "#8B5CF6" },
              { key: "queries", name: "AI queries", data: captureTrend.map((p) => p.queries), color: "#3B82F6" },
            ]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="glass card-shadow rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Topic distribution</h2>
              <p className="text-xs text-muted-foreground">Where your memories live</p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white">
              <BrainCircuit className="size-4" />
            </div>
          </div>
          <div className="relative mx-auto mt-4 h-44 max-w-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicClusters}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={78}
                  paddingAngle={3}
                  cornerRadius={4}
                  stroke="none"
                >
                  {topicClusters.map((cluster) => (
                    <Cell key={cluster.name} fill={cluster.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold tracking-tight">1,284</span>
              <span className="text-[10px] tracking-wide text-muted-foreground uppercase">
                memories
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {topicClusters.map((cluster) => {
              const pct = Math.round((cluster.count / 1284) * 100);
              return (
                <div key={cluster.name} className="flex items-center gap-2 text-xs">
                  <span className="size-2.5 rounded-sm" style={{ backgroundColor: cluster.color }} />
                  <span className="flex-1 text-muted-foreground">{cluster.name}</span>
                  <span className="font-medium">{cluster.count}</span>
                  <span className="w-9 text-right text-muted-foreground">{pct}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="glass card-shadow rounded-2xl p-5"
        >
          <h2 className="text-sm font-semibold">This week by day</h2>
          <p className="text-xs text-muted-foreground">Captures vs queries</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={weeklyActivity}
                barGap={3}
                barCategoryGap="26%"
                margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 6"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b8b9e", fontSize: 11 }}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b8b9e", fontSize: 11 }}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar
                  dataKey="captures"
                  name="Captures"
                  fill="#8B5CF6"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={16}
                />
                <Bar
                  dataKey="queries"
                  name="Queries"
                  fill="#3B82F6"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={16}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="glass card-shadow rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Capture activity</h2>
              <p className="text-xs text-muted-foreground">
                Peak window detected: <span className="text-violet-300">9–11 AM</span>
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-300">
              <TrendingUp className="size-3" /> +18% vs last week
            </span>
          </div>
          <ActivityHeatmap
            className="mt-5"
            data={activityGrid}
            rows={activityDayLabels}
            columns={activityHourLabels}
            rowLabels={activityDayLabels}
          />
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="glass card-shadow rounded-2xl p-6"
        >
          <ProgressRing value={86} label="Recall score" sublabel="Memories retrieved on demand" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.42 }}
          className="glass card-shadow rounded-2xl p-6"
        >
          <ProgressRing value={78} label="Organization score" sublabel="Tagged & cluster quality" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          className="glass glass-hover card-shadow group rounded-2xl p-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white">
              <Sparkles className="size-4" />
            </div>
            <h2 className="text-sm font-semibold">AI interpretation</h2>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Your memory network is growing <span className="text-violet-300 font-medium">+12.4% MoM</span>{" "}
            while queries grow faster (+18.6%) — a sign your recall habits are
            maturing. Ideas and Work tags are your densest clusters, both tied to
            Q4 goals.
          </p>
          <button className="mt-4 flex cursor-pointer items-center gap-1 text-xs font-medium text-violet-400 transition-colors hover:text-violet-300">
            View full report
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
