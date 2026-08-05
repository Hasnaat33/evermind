import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  data: number[];
  rows: string[];
  columns: string[];
  rowLabels: string[];
  className?: string;
}

function cellColor(value: number) {
  if (value <= 0) return "rgba(255,255,255,0.035)";
  const stops = [
    "rgba(139,92,246,0.18)",
    "rgba(139,92,246,0.38)",
    "rgba(124,82,246,0.6)",
    "rgba(105,72,244,0.82)",
    "rgba(88,60,240,1)",
  ];
  return stops[Math.min(value - 1, stops.length - 1)];
}

export function ActivityHeatmap({
  data,
  rows,
  columns,
  rowLabels,
  className,
}: ActivityHeatmapProps) {
  const cols = columns.length;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-2">
        <div className="flex w-9 shrink-0 flex-col gap-1.5">
          {rowLabels.map((label) => (
            <div key={label} className="flex h-4.5 items-center text-[10px] text-muted-foreground">
              {label}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto pb-1">
          <div className="flex flex-col gap-1.5" style={{ minWidth: cols * 22 }}>
            <div className="flex gap-1.5">
              {columns.map((col) => (
                <div key={col} className="flex h-4.5 w-4.5 items-center justify-center text-[9px] text-muted-foreground/70">
                  {col}
                </div>
              ))}
            </div>
            {rows.map((_, ri) => (
              <div key={ri} className="flex gap-1.5">
                {Array.from({ length: cols }).map((_, ci) => {
                  const value = data[ri * cols + ci] ?? 0;
                  return (
                    <motion.div
                      key={ci}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: (ri * cols + ci) * 0.004 }}
                      className="size-4.5 cursor-pointer rounded-[5px] transition-transform hover:scale-125"
                      style={{ backgroundColor: cellColor(value) }}
                    >
                      <title>{`${rowLabels[ri]} ${columns[ci]}: ${value} captures`}</title>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        Less
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <span
            key={v}
            className="size-3 rounded-[4px]"
            style={{ backgroundColor: cellColor(v) }}
          />
        ))}
        More
      </div>
    </div>
  );
}
