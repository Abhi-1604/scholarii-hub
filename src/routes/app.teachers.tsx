import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { teachers } from "@/lib/scholarii/mock-data";
import { Plus, FileText, Download, CalendarPlus, Search } from "lucide-react";

export const Route = createFileRoute("/app/teachers")({ component: TeachersPage });

const alerts = [
  { title: "Teacher Absence Alert", v: "3 teachers", desc: "Absent or late today" },
  { title: "Workload Alert", v: "4 teachers", desc: "No free periods" },
  { title: "Substitute Alert", v: "2 classes", desc: "Need substitutes" },
  { title: "Department Alert", v: "Science Dept", desc: "Coverage gap" },
  { title: "Leave Alert", v: "3 requests", desc: "Pending approval" },
];

const departments = [
  { name: "Mathematics", staff: 8, present: 7, absent: 1, perf: 82, priority: "High" },
  { name: "Science", staff: 9, present: 9, absent: 0, perf: 85, priority: "Normal" },
  { name: "Languages", staff: 10, present: 9, absent: 1, perf: 88, priority: "High" },
  { name: "Social Studies", staff: 11, present: 7, absent: 0, perf: 91, priority: "Normal" },
  { name: "Sports", staff: 8, present: 8, absent: 1, perf: 94, priority: "High" },
  { name: "Administration", staff: 9, present: 9, absent: 0, perf: 97, priority: "Normal" },
];

const donut = [
  { label: "Teaching", value: 11, color: "oklch(0.72 0.15 160)" },
  { label: "Available", value: 4, color: "oklch(0.6 0.18 240)" },
  { label: "On Leave", value: 2, color: "oklch(0.78 0.16 75)" },
  { label: "Half Day", value: 1, color: "oklch(0.85 0.14 90)" },
];

function Donut() {
  const total = donut.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  const r = 38, c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        {donut.map((d) => {
          const dash = (d.value / total) * c;
          const el = <circle key={d.label} r={r} cx="50" cy="50" fill="transparent" stroke={d.color} strokeWidth="12" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-acc} />;
          acc += dash;
          return el;
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold">{total}</p>
        <p className="text-[10px] text-muted-foreground">Teachers</p>
      </div>
    </div>
  );
}

function TeachersPage() {
  const [q, setQ] = useState("");
  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management & Workforce Intelligence"
        description="Operational visibility for staffing, workload, and coverage in one command center."
        action={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />Add Staff</Button>
            <Button size="sm" variant="outline">Leaves</Button>
            <Button size="sm" variant="outline"><FileText className="mr-1.5 h-4 w-4" />Staff Report</Button>
            <Button size="sm" variant="outline"><Download className="mr-1.5 h-4 w-4" />Export</Button>
            <Button size="sm" variant="outline"><CalendarPlus className="mr-1.5 h-4 w-4" />Schedule Meeting</Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total Staff", "28", "18 Teachers + 10 Admin", ""],
          ["Present Today", "15", "65%", "text-success"],
          ["On Leave", "2", "Teachers", "text-warning"],
          ["Half Day Leave", "2", "Staff", ""],
          ["Currently Teaching", "11", "Active", "text-success"],
          ["Currently Free", "4", "Available", "text-info"],
          ["Overloaded", "4", "Teachers", "text-warning"],
          ["Pending Substitutions", "2", "Unassigned", "text-destructive"],
        ].map(([k, v, s, c]) => (
          <Card key={k} className="p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className={`mt-1 text-2xl font-bold ${c}`}>{v}</p>
            <p className="text-[11px] text-muted-foreground">{s}</p>
          </Card>
        ))}
      </div>

      <SectionCard title="Workforce Intelligence" description="Immediate staffing issues requiring attention." action={<Badge variant="outline">Live alerts</Badge>}>
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:col-span-3">
            {alerts.map((a) => (
              <div key={a.title} className="rounded-lg border border-border p-3">
                <p className="text-xs font-semibold">{a.title}</p>
                <p className="mt-1 text-lg font-bold">{a.v}</p>
                <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                <button className="mt-1 text-[11px] font-medium text-primary hover:underline">View Details →</button>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs font-semibold">Live Staff Mix</p>
            <Donut />
            <ul className="mt-2 space-y-1 text-[11px]">
              {donut.map((d) => (
                <li key={d.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.label}</span>
                  <span className="font-semibold">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>

      <Card className="overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">Staff Directory</h3>
          <p className="text-sm text-muted-foreground">Search, filter, and open staff profiles.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[260px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, employee ID, department, subject…" className="pl-9" />
            </div>
            {["All departments", "All subjects", "All status", "All availability"].map((f) => (
              <select key={f} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"><option>{f}</option></select>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t, i) => {
                const wl = 4 + (i % 6);
                const att = 80 + ((i * 3) % 18);
                const status = t.status === "leave" ? "On Leave" : i % 3 === 0 ? "Teaching" : "Active";
                return (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-gradient-brand text-[11px] text-primary-foreground">{t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm font-medium">{t.name}</p>
                          <p className="text-[11px] text-muted-foreground">{t.subject}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">EMP-{2100 + i}</TableCell>
                    <TableCell className="text-sm">{t.subject}</TableCell>
                    <TableCell>
                      <Badge variant={status === "On Leave" ? "destructive" : status === "Teaching" ? "default" : "secondary"}>{status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{att}%</TableCell>
                    <TableCell><span className={`font-medium ${wl >= 8 ? "text-destructive" : wl >= 6 ? "text-warning" : "text-success"}`}>{wl}</span></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{status === "On Leave" ? "On Leave" : status === "Teaching" ? "Teaching" : "Available"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <SectionCard title="Department Overview">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <Card key={d.name} className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{d.name}</p>
                <Badge variant={d.priority === "High" ? "destructive" : "secondary"}>{d.priority}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div><p className="text-muted-foreground">Staff</p><p className="font-semibold">{d.staff}</p></div>
                <div><p className="text-muted-foreground">Present</p><p className="font-semibold text-success">{d.present}</p></div>
                <div><p className="text-muted-foreground">Absent</p><p className="font-semibold text-destructive">{d.absent}</p></div>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">Performance</span><span className="font-semibold">{d.perf}%</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-brand" style={{ width: `${d.perf}%` }} /></div>
              </div>
            </Card>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Currently Available">
          <ul className="space-y-2">
            {[
              ["Shaurya Kapoor", "Physical Education"],
              ["Myra Nair", "Languages"],
              ["Ira Iyer", "Science"],
              ["Vihaan Gupta", "Physical Education"],
            ].map(([n, s]) => (
              <li key={n} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                <div><p className="text-sm font-medium">{n}</p><p className="text-xs text-muted-foreground">{s}</p></div>
                <span className="text-xs text-muted-foreground">Free until Period 5</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Today's Substitute Management">
          <ul className="space-y-2">
            {[
              { t: "Mrs Sharma", slot: "Class 8A • Period 4", sub: "Mr Khan", status: "Assigned", ok: true },
              { t: "Mr Verma", slot: "Class 9B • Period 0", sub: "Not Assigned", status: "Critical", ok: false },
            ].map((r) => (
              <li key={r.t} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-semibold">{r.t}</p>
                  <p className="text-xs text-muted-foreground">{r.slot} • Substitute: {r.sub}</p>
                </div>
                <Badge variant={r.ok ? "secondary" : "destructive"}>{r.status}</Badge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
