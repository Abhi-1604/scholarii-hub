import { useState } from "react";
import {
  FileDown, Plus, AlertTriangle, Lightbulb, ChevronRight, Sparkles,
  TrendingUp, CircleDot, Brain, Wallet, Users, GraduationCap, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiCard, Sparkline, StatusPill } from "@/components/scholarii/kpi-card";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { attendanceTrend, feeCollection, classPerformance } from "@/lib/scholarii/mock-data";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar,
} from "recharts";

const PRIMARY = "oklch(0.62 0.18 275)";
const PINK = "oklch(0.62 0.20 330)";
const GRID = "oklch(0.85 0.01 280)";

const periodTabs = ["Today", "This week", "This month", "This year"] as const;

const pulse = [
  { title: "Attendance", status: "healthy" as const, value: "91%", desc: "91% present today" },
  { title: "Fee Collection", status: "moderate" as const, value: "77% target", desc: "₹82.5L collected" },
  { title: "Teacher Workload", status: "attention" as const, value: "8 overloaded", desc: "Avg 6 classes/day" },
  { title: "Parent Engagement", status: "moderate" as const, value: "69%", desc: "Overall engagement score" },
  { title: "Academic Performance", status: "healthy" as const, value: "83%", desc: "School-wide average" },
  { title: "Compliance", status: "healthy" as const, value: "Good", desc: "All policies on track" },
];

const valueGen = [
  { value: "96", unit: "Hours Saved", desc: "Administrative hours saved" },
  { value: "7,800", unit: "Entries Avoided", desc: "Operational entries removed" },
  { value: "+9%", unit: "Fee Collection", desc: "Collection uplift" },
  { value: "70%", unit: "Faster Attendance", desc: "Attendance workflow" },
  { value: "3.4x", unit: "Faster Comms", desc: "Communication cycle" },
];

const liveFeed = [
  { icon: Wallet, title: "Fee Payment Received", desc: "₹15,000 from Class 8-B", time: "Just now" },
  { icon: Users, title: "New Admission Received", desc: "Class 7-B application submitted", time: "2m ago" },
  { icon: Wallet, title: "Fee Payment Received", desc: "₹25,000 from Class 9-A", time: "8m ago" },
  { icon: CircleDot, title: "Attendance Marked", desc: "Attendance recorded for Grade 9", time: "22m ago" },
  { icon: GraduationCap, title: "PTM Scheduled", desc: "PTA meeting confirmed for Class 10", time: "1h ago" },
];

export default function PrincipalDashboard() {
  const [tab, setTab] = useState<typeof periodTabs[number]>("This week");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Dr. Asha"
        description="Real-time school operations command center"
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm"><FileDown className="mr-1.5 h-4 w-4" />Report</Button>
            <Button size="sm" className="bg-gradient-brand text-primary-foreground shadow-glow">
              <Plus className="mr-1.5 h-4 w-4" />Quick Action
            </Button>
          </div>
        }
      />

      {/* KPI ROW */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Key Performance Indicators</h2>
            <p className="text-xs text-muted-foreground">Live metrics, updated every minute</p>
          </div>
          <button className="text-xs font-medium text-primary hover:underline">Click to drill down →</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard title="Student Attendance" value="91%" subtitle="392 / 430 present" trend={1} status="healthy" spark={[88, 89, 87, 90, 92, 90, 91]} />
          <KpiCard title="Teacher Attendance" value="15 / 18" subtitle="2 On Leave • 1 Late" trend={0} status="moderate" spark={[16, 15, 17, 16, 14, 15, 15]} />
          <KpiCard title="Fee Collection" value="₹82.5L" subtitle="77% of target" trend={-8} status="moderate" spark={[90, 86, 84, 82, 80, 79, 77]} />
          <KpiCard title="Academic Performance" value="83%" subtitle="Science ↑ Hindi ↓" trend={3} status="healthy" spark={[78, 79, 80, 81, 82, 82, 83]} />
          <KpiCard title="Parent Engagement" value="69%" subtitle="214 engaged families" trend={-2} status="moderate" spark={[72, 71, 70, 71, 70, 69, 69]} />
          <KpiCard title="Teacher Workload" value="8" subtitle="8 overloaded teachers" trend={8} status="attention" spark={[4, 5, 5, 6, 7, 7, 8]} />
        </div>
      </section>

      {/* SCHOOL PULSE */}
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold">School Pulse</h2>
          <p className="text-xs text-muted-foreground">Real-time operational health snapshot</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {pulse.map((p) => (
            <Card key={p.title} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">{p.title}</span>
                <StatusPill status={p.status} label={p.status === "healthy" ? "Healthy" : p.status === "moderate" ? "Moderate" : "Attention"} />
              </div>
              <p className="mt-2 text-xl font-semibold">{p.value}</p>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
              <button className="mt-2 text-[11px] font-medium text-primary hover:underline">View details →</button>
            </Card>
          ))}
        </div>

        <Card className="mt-3 bg-gradient-soft p-5">
          <h3 className="font-semibold">Operational Summary</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            School is operating at healthy capacity with 91% attendance and on-track academic performance.
            Fee collection and teacher workload need leadership attention this week.
          </p>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Key Issues</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-warning" /> Fee collection needs attention</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-destructive" /> High teacher workload detected</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* SCHOLARII IMPACT */}
      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Scholarii Impact & Adoption</h2>
            <p className="text-xs text-muted-foreground">AI-powered operational uplift</p>
          </div>
          <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
            {periodTabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  tab === t ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="relative overflow-hidden border-l-4 border-l-success p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Scholarii Adoption Score</p>
            <p className="mt-2 text-5xl font-bold tracking-tight">86<span className="text-2xl text-muted-foreground">%</span></p>
            <p className="mt-1 text-sm font-medium text-success">Excellent Adoption</p>
            <div className="mt-5 space-y-2.5">
              {[
                ["Teacher Usage", 92],
                ["Student Usage", 88],
                ["Parent Usage", 81],
                ["Automation Usage", 85],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Teacher AI Queries", "2,840"],
                ["Student AI Queries", "7,920"],
                ["Admin Hours Saved", "96"],
                ["School Brain Docs", "380"],
                ["AI Tasks Completed", "3,120"],
                ["Staff Adoption", "93%"],
                ["Parent Adoption", "81%"],
                ["Automations Run", "920"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border p-3">
                  <p className="text-[11px] text-muted-foreground">{k}</p>
                  <p className="mt-1 text-lg font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {valueGen.map((v) => (
            <Card key={v.unit} className="p-4">
              <p className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">{v.value}</p>
              <p className="mt-1 text-sm font-medium">{v.unit}</p>
              <p className="text-xs text-muted-foreground">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* THREE COLUMN */}
      <section className="grid gap-4 lg:grid-cols-12">
        {/* LEFT */}
        <div className="space-y-4 lg:col-span-3">
          <SectionCard title="Live Summary" description="Today's attendance">
            <ul className="space-y-3">
              {[
                { k: "Present", v: 392, p: 91, c: "bg-success" },
                { k: "Absent", v: 38, p: 9, c: "bg-destructive" },
                { k: "Chronic", v: 38, p: 9, c: "bg-warning" },
              ].map((row) => (
                <li key={row.k}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{row.k}</span>
                    <span className="font-semibold">{row.v} <span className="text-muted-foreground">({row.p}%)</span></span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${row.c}`} style={{ width: `${row.p}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            title="Live Activity"
            description="Across the school"
            action={<Badge className="border-success/30 bg-success/15 text-success" variant="outline"><span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" />Live</Badge>}
          >
            <ul className="space-y-3">
              {liveFeed.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
            <button className="mt-3 text-xs font-medium text-primary hover:underline">View all activity →</button>
          </SectionCard>
        </div>

        {/* CENTER */}
        <div className="space-y-4 lg:col-span-6">
          <SectionCard title="Student Attendance Trend" description="Last 8 months" action={<Badge variant="outline">Last 8mo</Badge>}>
            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[80, 100]} className="text-xs" />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="attendance" stroke={PRIMARY} strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Class Performance by Grade" description="Average score">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={classPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                  <XAxis dataKey="class" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="score" fill={PINK} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Fee Trends" description="Monthly collection">
            <div className="h-48">
              <ResponsiveContainer>
                <BarChart data={feeCollection}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} formatter={(v: number) => `₹${v.toLocaleString()}`} />
                  <Bar dataKey="amount" fill={PRIMARY} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        {/* RIGHT — AI Insights */}
        <div className="lg:col-span-3">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold"><Brain className="h-4 w-4 text-primary" />AI Insights</h3>
              <Badge className="border-success/30 bg-success/15 text-success" variant="outline">
                <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" />Live
              </Badge>
            </div>

            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Risk Overview</p>
            <ul className="space-y-2 text-sm">
              {[
                ["At-Risk", 38, "bg-destructive"],
                ["Chronic Absent", 38, "bg-warning"],
                ["Fee Default", 40, "bg-warning"],
                ["Overloaded", 8, "bg-warning"],
              ].map(([k, v, c]) => (
                <li key={k as string} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${c}`} />{k}</span>
                  <span className="font-semibold">{v}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Warnings</p>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="space-y-2">
                {[
                  ["Growing fee defaults — 40 students have outstanding fees.", "View Defaulters →"],
                  ["Teacher workload imbalance — 8 teachers (44%) overloaded.", "View Workload →"],
                  ["High task backlog — 4 teachers have significant backlog.", "View Tasks →"],
                ].map(([msg, cta]) => (
                  <div key={msg} className="rounded-lg border border-warning/30 bg-warning/5 p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                      <p className="text-xs">{msg}</p>
                    </div>
                    <button className="mt-1.5 text-[11px] font-medium text-primary hover:underline">{cta}</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Recommendations</p>
                <Badge className="bg-gradient-brand text-primary-foreground">3</Badge>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="text-xs">Send fee payment reminders — contact 40 families with overdue fees.</p>
                </div>
                <Button size="sm" className="mt-2 h-7 w-full bg-gradient-brand text-primary-foreground">
                  Send Reminders <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SYSTEM STATUS */}
      <section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, k: "Total Students", v: "430", d: "Enrolled this term" },
            { icon: Briefcase, k: "Total Teachers", v: "18", d: "Active faculty" },
            { icon: TrendingUp, k: "Admission Pipeline", v: "320", d: "Admitted this term" },
            { icon: Wallet, k: "Fee Target", v: "₹107.5L", d: "Monthly target" },
          ].map((c) => (
            <Card key={c.k} className="flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.k}</p>
                <p className="text-lg font-semibold">{c.v}</p>
                <p className="text-[11px] text-muted-foreground">{c.d}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
