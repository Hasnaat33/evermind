import { useId } from "react";

interface SparklineProps {
  data: number[];
  stroke?: string;
  fillFrom?: string;
  fillTo?: string;
  width?: number;
  height?: number;
  className?: string;
}

function buildPath(data: number[], width: number, height: number) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((value, index) => {
    const x = index * step;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });

  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { d, points };
}

export function Sparkline({
  data,
  stroke = "url(#spark-stroke)",
  fillFrom = "rgba(139,92,246,0.28)",
  fillTo = "rgba(59,130,246,0)",
  width = 120,
  height = 40,
  className,
}: SparklineProps) {
  const id = useId();
  const { d, points } = buildPath(data, width, height);
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      className={className}
      role="img"
      aria-label="Trend sparkline"
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillFrom} />
          <stop offset="100%" stopColor={fillTo} />
        </linearGradient>
      </defs>
      <path
        d={`${d} L ${last[0]},${height} L ${points[0][0]},${height} Z`}
        fill={`url(#${id}-fill)`}
      />
      <path
        d={d}
        fill="none"
        stroke={stroke.replace("spark-stroke", `${id}-stroke`)}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r="3" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
