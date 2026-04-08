interface ProgressRingProps {
  value: number;
  size?: number;
}

export function ProgressRing({ value, size = 64 }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(142,142,142,0.18)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-foreground">{clamped}%</span>
    </div>
  );
}
