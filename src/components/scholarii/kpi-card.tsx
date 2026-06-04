import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type Status = "healthy" | "moderate" | "attention";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number; // % change vs yesterday
  status?: Status;
  spark?: number[];
}

const dot: Record<Status, string> = {
  healthy: "bg-success",
  moderate: "bg-warning",
  attention: "bg-destructive",
};

const stroke: Record<Status, string> = {
  healthy: "oklch(0.72 0.15 160)",
  moderate: "oklch(0.78 0.16 75)",
  attention: "oklch(0.65 0.22 25)",
};

export function Sparkline({ data, color = "oklch(0.62 0.18 275)", height = 32 }: { data: number[]; color?: string; height?: number }) {
  if (!data.length) return null;
  const w = 120;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} strokeLinecap="round" strokeLinejoin="round" />
      <polygon fill={`url(#sg-${color})`} points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  );
}

export function KpiCard({ title, value, subtitle, trend, status = "healthy", spark }: KpiCardProps) {
  const TrendIcon = trend === undefined ? Minus : trend > 0 ? ArrowUp : trend < 0 ? ArrowDown : Minus;
  const trendColor = trend === undefined || trend === 0 ? "text-muted-foreground" : trend > 0 ? "text-success" : "text-destructive";

  return (
    <Card className="relative flex min-w-[220px] flex-col gap-2 overflow-hidden p-4 transition hover:-translate-y-0.5 hover:shadow-elegant">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <span className={`h-2 w-2 shrink-0 rounded-full ${dot[status]} ring-2 ring-background`} aria-hidden />
      </div>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground line-clamp-1">{subtitle}</p>}
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon className="h-3 w-3" />
          <span>{Math.abs(trend)}% vs yesterday</span>
        </div>
      )}
      {spark && <div className="-mb-1"><Sparkline data={spark} color={stroke[status]} /></div>}
    </Card>
  );
}

export function StatusPill({ status, label }: { status: Status; label: string }) {
  const map: Record<Status, string> = {
    healthy: "bg-success/15 text-success border-success/30",
    moderate: "bg-warning/15 text-warning border-warning/30",
    attention: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${map[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} /> {label}
    </span>
  );
}
