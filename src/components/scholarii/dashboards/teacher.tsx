import { BookOpen, Users, ClipboardList, CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard, PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { todaySchedule, assignments } from "@/lib/scholarii/mock-data";

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hello, Priya 👩‍🏫" description="Your day at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="My Classes" value="6" icon={BookOpen} accent="primary" />
        <StatCard label="Total Students" value="184" icon={Users} accent="info" />
        <StatCard label="Pending to Grade" value="12" icon={ClipboardList} accent="warning" />
        <StatCard label="PTA This Week" value="3" icon={CalendarDays} accent="success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Today's Schedule" description="5 periods" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {todaySchedule.map((p) => (
              <li key={p.time} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-brand text-xs text-primary-foreground">{p.class}</div>
                  <div>
                    <p className="text-sm font-medium">{p.subject} · Class {p.class}</p>
                    <p className="text-xs text-muted-foreground">{p.time} · Room {p.room}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Mark Attendance</Button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="To Grade" description="Recent submissions">
          <ul className="space-y-3">
            {assignments.filter((a) => a.status !== "graded").map((a) => (
              <li key={a.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{a.title}</p>
                  <Badge variant={a.status === "submitted" ? "default" : "secondary"} className="capitalize">{a.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.subject} · Due {a.dueDate}</p>
                <Button size="sm" variant="ghost" className="mt-2 h-7 px-2 text-xs">
                  <CheckCircle2 className="mr-1 h-3 w-3" />Grade now
                </Button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
