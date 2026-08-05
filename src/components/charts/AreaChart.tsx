import { useId } from "react";
import { motion } from "framer-motion";

interface Series {
  key: string;
  name: string;
  data: number[];
  color: string;
}

interface AreaChartProps {
  labels: string[];
  series: Series[];
  height?: number;
  className?: string;
}

function buildPath(data: number[], width: number, height: number, pad: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const innerH = height - pad * 2;

  const points = data.map((value, index) => {
    const x = index * step;
    const y = pad + innerH - ((value - min) / range) * innerH;
    return [x, y] as const;
  });

  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { d, points, innerH };
}

export function AreaChart({ labels, series, height = 240, className }: AreaChartProps) {
  const uid = useId();
  const width = 800;
  const pad = 12;
  const labelSpace = 28;

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height + labelSpace}`} className="w-full">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`${uid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={width - pad}
            y1={pad + (height - pad * 2) * f}
            y2={pad + (height - pad * 2) * f}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 6"
          />
        ))}

        {series.map((s) => {
          const { d, points, innerH } = buildPath(s.data, width - pad * 2, height - pad * 2, 0);
          const area = `${d} L ${points[points.length - 1][0]},${pad + innerH} L ${points[0][0]},${pad + innerH} Z`;
          return (
            <g key={s.key}>
              <motion.path
                d={area}
                fill={`url(#${uid}-${s.key})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.path
                d={d}
                transform={`translate(${pad} ${pad})`}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </g>
          );
        })}

        {labels.map((label, i) => (
          <text
            key={label}
            x={pad + (i * (width - pad * 2)) / (labels.length - 1)}
            y={height + labelSpace - 8}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
