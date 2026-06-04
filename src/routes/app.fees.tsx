import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { Send, FileDown, Plus, FileText, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/fees")({ component: FinancePage });

const healthMetrics = [
  { k: "Collection Health", v: "87", label: "Healthy", desc: "82% of monthly target achieved", c: "success" },
  { k: "Fee Recovery", v: "76", label: "Good", desc: "76% of total fees recovered", c: "success" },
  { k: "Defaulter Risk", v: "High", label: "24 students", desc: "Overdue exceeding 60 days", c: "destructive" },
  { k: "Cash Flow Status", v: "Stable", label: "On Track", desc: "Liquidity healthy", c: "info" },
  { k: "Payment Compliance", v: "92", label: "Excellent", desc: "92% maintain schedules", c: "success" },
];

const payments = [
  ["Rahul Sharma", "Grade 4", "Today • UPI", 12000],
  ["Priya Singh", "Grade 5", "Yesterday • Card", 18500],
  ["Aditya Kumar", "Grade 3", "2 days ago • Cash", 15000],
  ["Maya Patel", "Grade 5", "3 days ago • Net Banking", 22000],
  ["Vivaan Verma", "Grade 2", "3 days ago • UPI", 14200],
] as const;

const insights = [
  "Grade 3 has the highest fee default rate at 32% pending collection.",
  "Collection performance improved by 12% compared to last month.",
  "24 students have overdue fees exceeding 60 days requiring immediate action.",
  "Current trends indicate monthly target achievement is likely at 82%.",
  "Grade 5 shows exceptional collection compliance at 92%.",
];

function FinancePage() {
  const [tab, setTab] = useState<"month" | "year">("month");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance"
        description="Comprehensive financial overview, collection performance, and revenue tracking."
        action={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />Record Payment</Button>
            <Button size="sm" variant="outline"><Send className="mr-1.5 h-4 w-4" />Send Reminder</Button>
            <Button size="sm" variant="outline"><FileText className="mr-1.5 h-4 w-4" />Generate Report</Button>
            <Button size="sm" variant="outline"><FileDown className="mr-1.5 h-4 w-4" />Export</Button>
          </div>
        }
      />

      <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
        {(["month", "year"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1 text-xs font-medium transition ${tab === t ? "bg-background shadow text-foreground" : "text-muted-foreground"}`}>
            {t === "month" ? "This Month" : "This Year"}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {[
          ["Total Collection", "₹4.8L", "−6% vs last month", "text-destructive"],
          ["Target Achievement", "82%", "On track", "text-success"],
          ["Outstanding Dues", "₹14.2L", "Pending", "text-warning"],
          ["Fee Defaulters", "84", "Students", "text-destructive"],
          ["Expected Collection", "₹5.4L", "Forecast", ""],
          ["Health Score", "87/100", "Healthy", "text-success"],
        ].map(([k, v, s, c]) => (
          <Card key={k} className="p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 text-2xl font-bold">{v}</p>
            <p className={`text-[11px] ${c}`}>{s}</p>
          </Card>
        ))}
      </div>

      <SectionCard title="Financial Health Metrics">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {healthMetrics.map((m) => (
            <Card key={m.k} className={`p-4 border-l-4 border-l-${m.c}`} style={{ borderLeftColor: `var(--${m.c})` }}>
              <p className="text-xs text-muted-foreground">{m.k}</p>
              <p className="mt-1 text-2xl font-bold">{m.v}</p>
              <p className={`text-xs font-medium text-${m.c}`}>{m.label}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{m.desc}</p>
            </Card>
          ))}
        </div>
      </SectionCard>

      <Card className="bg-gradient-soft p-5">
        <div className="grid gap-4 sm:grid-cols-4">
          <div><p className="text-xs text-muted-foreground">Monthly Target</p><p className="text-xl font-bold">₹80L</p></div>
          <div><p className="text-xs text-muted-foreground">Collected So Far</p><p className="text-xl font-bold text-success">₹68.4L</p></div>
          <div><p className="text-xs text-muted-foreground">Remaining</p><p className="text-xl font-bold text-warning">₹11.6L</p></div>
          <div>
            <p className="text-xs text-muted-foreground">Progress</p>
            <p className="text-xl font-bold">82%</p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-brand" style={{ width: "82%" }} />
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Payment Status Summary">
          <ul className="space-y-3">
            {[
              ["Paid", 340, "bg-success", 78],
              ["Partial", 48, "bg-warning", 11],
              ["Pending", 28, "bg-orange-500", 6],
              ["Overdue", 14, "bg-destructive", 3],
            ].map(([k, v, c, pct]) => (
              <li key={k as string}>
                <div className="mb-1 flex justify-between text-sm"><span>{k}</span><span className="font-semibold">{v} Students</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${c}`} style={{ width: `${pct}%` }} /></div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Recent Payments" action={<Button variant="outline" size="sm">View All</Button>}>
          <ul className="space-y-2">
            {payments.map(([n, g, t, amt]) => (
              <li key={n} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{n}</p>
                  <p className="text-[11px] text-muted-foreground">{g} • {t}</p>
                </div>
                <span className="font-bold text-success">₹{amt.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Scholarii Finance Insights" action={<Badge variant="outline"><Sparkles className="mr-1 h-3 w-3" />AI</Badge>}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {insights.map((t, i) => (
            <Card key={i} className="border-l-4 border-l-teal-500 p-3" style={{ borderLeftColor: "oklch(0.7 0.12 195)" }}>
              <p className="text-xs">{t}</p>
            </Card>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
