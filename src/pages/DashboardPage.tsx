import { motion } from "framer-motion";
import { CheckCircle2, CloudCog } from "lucide-react";
import { kpis } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { QuickCapture } from "@/components/dashboard/QuickCapture";
import { MemoryGrid } from "@/components/dashboard/MemoryGrid";
import { AiInsights } from "@/components/dashboard/AiInsights";
import { Badge } from "@/components/ui/badge";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function DashboardPage() {
  const totalMemories = useAppStore((s) => s.totalMemories);
  const queryCount = useAppStore((s) => s.queryCount);

  const liveKpis = kpis.map((kpi) => {
    if (kpi.id === "memories")
      return { ...kpi, value: totalMemories.toLocaleString() };
    if (kpi.id === "queries") return { ...kpi, value: queryCount.toLocaleString() };
    return kpi;
  });

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            {greeting()}, <span className="text-gradient">Alex</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate()} — here's what your second brain remembers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald">
            <CheckCircle2 className="size-3" /> AI synced
          </Badge>
          <Badge variant="outline" className="hidden sm:inline-flex">
            <CloudCog className="size-3" /> {totalMemories} memories indexed
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {liveKpis.map((kpi, index) => (
          <KpiCard key={kpi.id} kpi={kpi} index={index} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QuickCapture />
        </div>
        <AiInsights />
      </div>

      <div className="mt-10">
        <MemoryGrid />
      </div>
    </div>
  );
}
