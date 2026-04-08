export function LoadingSkeleton({ className = "h-28 rounded-[1.5rem]" }: { className?: string }) {
  return <div className={`animate-pulse bg-secondary/45 ${className}`} />;
}
