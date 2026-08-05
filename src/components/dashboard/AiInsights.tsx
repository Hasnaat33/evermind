import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { aiInsights } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AiInsights() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-[0_4px_16px_-4px_rgba(59,130,246,0.6)]">
          <BrainCircuit className="size-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold">AI Insights</h2>
          <p className="text-xs text-muted-foreground">Based on your data, you should…</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {aiInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
              whileHover={{ x: 4 }}
              className="glass glass-hover group card-shadow relative flex-1 overflow-hidden rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br", insight.accent)}>
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold tracking-tight">{insight.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {insight.body}
                  </p>
                  <button className="mt-2.5 flex cursor-pointer items-center gap-1 text-xs font-medium text-violet-400 transition-colors hover:text-violet-300">
                    {insight.cta}
                    <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
