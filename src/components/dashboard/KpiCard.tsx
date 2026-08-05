import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Kpi } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/ui/sparkline";

export function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const Icon = kpi.icon;
  const isUp = kpi.trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl"
    >
      <div className="glass glass-hover card-shadow relative h-full rounded-2xl p-5">
        <div
          className={cn(
            "pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30",
            kpi.accent,
          )}
        />
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg",
              kpi.accent,
            )}
          >
            <Icon className="size-5" />
          </div>
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              isUp
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-400",
            )}
          >
            {isUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {kpi.delta}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {kpi.label}
            </p>
            <p className="mt-1.5 text-2xl font-bold tracking-tight">{kpi.value}</p>
          </div>
          <div className="w-24 shrink-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:w-28">
            <Sparkline data={kpi.sparkline} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
