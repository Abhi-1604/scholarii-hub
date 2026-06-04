import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { CalendarPlus, Printer, FileText, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/schedule")({ component: SchedulePage });

const periods = [
  { p: "Period 1", t: "08:30 – 09:10 AM", subj: "Science", room: "Science Lab", teacher: "Mrs Dutta" },
  { p: "Period 2", t: "09:15 – 09:55 AM", subj: "English", room: "Room 208", teacher: "Mrs Patel" },
  { p: "Period 3", t: "10:00 – 10:40 AM", subj: "History", room: "Room 208", teacher: "Mr Sharma" },
  { p: "Short Break", t: "10:40 – 10:55 AM", break: true },
  { p: "Period 4", t: "10:55 – 11:35 AM", subj: "Mathematics", room: "Room 208", teacher: "Mr Khan", sub: true, current: true },
  { p: "Period 5", t: "11:40 AM – 12:20 PM", subj: "Computer", room: "Computer Lab", teacher: "Mrs Rao" },
  { p: "Period 6", t: "12:25 – 01:05 PM", subj: "PE", room: "Sports Ground", teacher: "Mr Roy" },
  { p: "Lunch Break", t: "01:05 – 01:40 PM", break: true },
  { p: "Period 7", t: "01:40 – 02:20 PM", subj: "Art", room: "Art Studio", teacher: "Mrs Dutta" },
  { p: "Period 8", t: "02:25 – 03:05 PM", subj: "Library", room: "Library", teacher: "Mrs Iyer" },
];

const proxiesServed = [2, 1, 3, 2, 4, 0, 1];
const freePeriods = [4, 4, 3, 4, 2, 4, 4];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function MiniBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-20 items-end gap-1">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div className="w-full rounded-t" style={{ height: `${(v / max) * 100}%`, background: color, minHeight: 4 }} />
          <span className="text-[9px] text-muted-foreground">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function SchedulePage() {
  const [cls, setCls] = useState("Class 8A");
  const [teacher, setTeacher] = useState("Mrs Sharma");

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Operations Schedule"
        description="Live operational visibility for today"
        action={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground"><UserPlus className="mr-1.5 h-4 w-4" />Assign Substitute</Button>
            <Button size="sm" variant="outline">View Full Timetable</Button>
            <Button size="sm" variant="outline">Mark Teacher Leave</Button>
            <Button size="sm" variant="outline"><CalendarPlus className="mr-1.5 h-4 w-4" />Schedule Event</Button>
            <Button size="sm" variant="outline"><FileText className="mr-1.5 h-4 w-4" />Daily Report</Button>
            <Button size="sm" variant="outline"><Printer className="mr-1.5 h-4 w-4" />Print</Button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Today</p>
          <p className="mt-1 text-2xl font-bold">Thursday, 4 June 2026</p>
          <p className="text-sm text-muted-foreground">Current time: 1:35 am</p>
          <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">Current Period</p>
            <p className="text-lg font-semibold text-primary">Period 4</p>
            <p className="text-xs text-muted-foreground">10:55 AM – 11:35 AM</p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warning" />
            <p className="font-semibold">Examination Day</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Exams running today with staggered rooms and invigilation coverage.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-xs text-muted-foreground">Exam coverage</p><p className="font-semibold">3 exams</p><p className="text-xs">Classes 10–12</p></div>
            <div><p className="text-xs text-muted-foreground">Rooms allocated</p><p className="font-semibold">Hall A, Hall B, Lab 3</p></div>
          </div>
        </Card>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 xl:grid-cols-7">
        {[
          ["Classes Running", "48"],
          ["Teachers Present", "16"],
          ["Teachers Absent", "2"],
          ["Substitutes Assigned", "3"],
          ["Events Today", "2"],
          ["Exams Today", "6"],
          ["Pending Replacements", "1"],
        ].map(([k, v]) => (
          <Card key={k} className="p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 text-2xl font-bold">{v}</p>
          </Card>
        ))}
      </div>

      <SectionCard
        title="Class Timetable"
        description="3 lectures • short break • 3 lectures • lunch • 2 lectures"
        action={
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
            {["Class 6A", "Class 7A", "Class 8A", "Class 9A", "Class 10A"].map((c) => <option key={c}>{c}</option>)}
          </select>
        }
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {periods.map((p) => p.break ? (
            <div key={p.p} className="rounded-lg border border-dashed border-border bg-muted/40 p-3 text-center">
              <p className="text-xs font-semibold text-muted-foreground">{p.p}</p>
              <p className="text-xs text-muted-foreground">{p.t}</p>
            </div>
          ) : (
            <div key={p.p} className={`rounded-lg border p-3 ${p.current ? "border-primary bg-primary/5" : "border-border"}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">{p.p}</p>
                {p.sub && <Badge variant="outline" className="text-[10px]">Substitute</Badge>}
              </div>
              <p className="text-[11px] text-muted-foreground">{p.t}</p>
              <p className="mt-2 font-semibold">{p.subj}</p>
              <p className="text-xs text-muted-foreground">{p.room}</p>
              <p className="text-xs">{p.teacher}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Teacher Schedule & Availability"
          description="Period-wise availability"
          className="lg:col-span-2"
          action={<Badge variant="outline">Current period: Period 4</Badge>}
        >
          <div className="mb-4 flex items-center gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
            <select value={teacher} onChange={(e) => setTeacher(e.target.value)} className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm">
              {["Mrs Sharma", "Mrs Patel", "Mr Verma", "Mrs Singh"].map((t) => <option key={t}>{t}</option>)}
            </select>
            <Button size="icon" variant="outline" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
          </div>

          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{teacher}</p>
                <p className="text-xs text-muted-foreground">Mathematics • Teaching Class 8A</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["P1✓", "P2✓", "P3 FREE", "P4✓", "P5 FREE", "P6✓", "P7 FREE", "P8 FREE"].map((s) => (
                <span key={s} className={`rounded-md px-2 py-1 text-[11px] font-medium ${s.includes("FREE") ? "bg-muted text-muted-foreground" : "bg-success/15 text-success"}`}>{s}</span>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Free periods: 3, 5, 7, 8</p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs font-semibold">Proxies Served – Last 7 Days</p>
              <MiniBar data={proxiesServed} color="oklch(0.62 0.18 275)" />
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs font-semibold">Free Periods – Last 7 Days</p>
              <MiniBar data={freePeriods} color="oklch(0.62 0.20 330)" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Available Now" description="Period 4">
          <ul className="space-y-2">
            {[
              ["Mrs Sharma", "Mathematics", "P6"],
              ["Mrs Patel", "English", "P6"],
              ["Mr Verma", "Science", "P7"],
              ["Mrs Singh", "Biology", "P7"],
            ].map(([n, s, p]) => (
              <li key={n} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                <div>
                  <p className="text-sm font-medium">{n}</p>
                  <p className="text-xs text-muted-foreground">{s}</p>
                </div>
                <span className="text-xs text-muted-foreground">Next: {p}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Today's Proxy Assignments">
        <ul className="space-y-2">
          {[
            { teacher: "Mrs Sharma", reason: "Sick Leave", sub: "Mr Khan", slot: "Period 4 • Class 8A", status: "Assigned", ok: true },
            { teacher: "Mr Patel", reason: "Training", sub: "No replacement", slot: "Period 5 • Class 9B", status: "Action Required", ok: false },
          ].map((p) => (
            <li key={p.teacher} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-semibold">{p.teacher} <span className="text-xs font-normal text-muted-foreground">— {p.reason}</span></p>
                <p className="text-xs text-muted-foreground">Substitute: {p.sub} • {p.slot}</p>
              </div>
              <Badge variant={p.ok ? "secondary" : "destructive"}>{p.status}</Badge>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="School Events Today">
          <ul className="space-y-2">
            {[
              ["Morning Assembly", "Main Ground • Mrs Joseph", "08:15 AM", "Completed", "secondary"],
              ["Science Exhibition", "Auditorium • Mr Roy", "12:30 PM", "Running", "default"],
              ["PTM", "Hall B • Mrs Patel", "02:00 PM", "Pending", "outline"],
            ].map(([n, v, t, s, b]) => (
              <li key={n as string} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-semibold">{n}</p>
                  <p className="text-xs text-muted-foreground">{v}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{t}</p>
                  <Badge variant={b as never} className="mt-1">{s}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Exam Operations" description="Live exam schedule">
          <div className="space-y-2">
            {[
              ["Mathematics", "Class 10", "10:00 AM – 1:00 PM", "Mr Khan", "Hall A"],
              ["Physics", "Class 12", "10:00 AM – 1:00 PM", "Mrs Singh", "Hall B"],
              ["Chemistry", "Class 11", "1:30 PM – 4:00 PM", "Mr Verma", "Lab 3"],
            ].map(([sub, cls, t, inv, room]) => (
              <div key={sub} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{sub} — {cls}</p>
                  <Badge variant="outline">{t}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Invigilator: {inv} • Room: {room}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
