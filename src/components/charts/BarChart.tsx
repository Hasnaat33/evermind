import { motion } from "framer-motion";

export interface BarGroup {
  label: string;
  values: number[];
}

interface BarChartProps {
  data: BarGroup[];
  colors: string[];
  labels: string[];
  className?: string;
}

export function BarChart({ data, colors, labels, className }: BarChartProps) {
  const width = 800;
  const height = 240;
  const pad = 12;
  const labelSpace = 28;
  const chartH = height - pad * 2;
  const max = Math.max(...data.flatMap((d) => d.values));

  const groupW = (width - pad * 2) / data.length;
  const barW = Math.min(26, (groupW * 0.7) / colors.length);

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height + labelSpace}`} className="w-full">
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={width - pad}
            y1={pad + chartH * f}
            y2={pad + chartH * f}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 6"
          />
        ))}

        {data.map((group, gi) => {
          const baseX = pad + gi * groupW;
          return (
            <g key={group.label}>
              {group.values.map((value, vi) => {
                const barH = (value / max) * chartH;
                const x = baseX + groupW / 2 - (group.values.length * barW) / 2 + vi * (barW + 4);
                const y = pad + chartH - barH;
                return (
                  <motion.rect
                    key={vi}
                    x={x}
                    y={height}
                    width={barW}
                    rx={Math.min(6, barW / 3)}
                    fill={colors[vi]}
                    fillOpacity="0.85"
                    initial={false}
                    animate={{ y, height: barH }}
                    transition={{ duration: 0.6, delay: gi * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                    whileHover={{ fillOpacity: 1, y: y - 4, height: barH + 4 }}
                    className="cursor-pointer"
                  >
                    <title>{`${group.label}: ${value}`}</title>
                  </motion.rect>
                );
              })}
              <text
                x={baseX + groupW / 2}
                y={height + labelSpace - 8}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {group.label}
              </text>
            </g>
          );
        })}

        {labels.map((label, i) => (
          <text
            key={label}
            x={width - pad - 10}
            y={pad + 14 + i * 16}
            textAnchor="end"
            className="fill-current text-[10px]"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
