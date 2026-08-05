import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  size?: number;
  thickness?: number;
  label: string;
  sublabel?: string;
  className?: string;
}

export function ProgressRing({
  value,
  size = 140,
  thickness = 10,
  label,
  sublabel,
  className,
}: ProgressRingProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = (value / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={thickness}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - target }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tracking-tight">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold tracking-tight">{label}</p>
        {sublabel && (
          <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
