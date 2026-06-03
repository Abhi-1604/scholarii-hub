import { CalendarCheck, ClipboardList, GraduationCap, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard, PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { assignments, announcements } from "@/lib/scholarii/mock-data";

const todayClasses = [
  { time: "08:00", subject: "Mathematics", room: "204", now: false },
  { time: "09:00", subject: "Science", room: "Lab 2", now: true },
  { time: "10:00", subject: "English", room: "101", now: false },
  { time: "11:30", subject: "History", room: "306", now: false },
  { time: "13:00", subject: "Physical Ed", room: "Field", now: false },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hi Aarav 👋" description="Here's your day." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance" value="92%" icon={CalendarCheck} accent="success" />
        <StatCard label="Pending Assignments" value="2" icon={ClipboardList} accent="warning" />
        <StatCard label="Upcoming Exams" value="4" icon={GraduationCap} accent="info" />
        <StatCard label="Fees" value="Paid" icon={Wallet} accent="success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Today's Classes" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {todayClasses.map((c) => (
              <li key={c.time} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-14 place-items-center rounded-lg text-xs font-medium ${c.now ? "bg-gradient-brand text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{c.time}</span>
                  <div>
                    <p className="text-sm font-medium">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">Room {c.room}</p>
                  </div>
                </div>
                {c.now && <Badge className="bg-success/15 text-success">Now</Badge>}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Pending Assignments">
          <ul className="space-y-3">
            {assignments.filter((a) => a.status === "pending").map((a) => (
              <li key={a.id} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.subject} · Due {a.dueDate}</p>
                <Progress value={60} className="mt-2 h-1.5" />
                <Button size="sm" className="mt-2 w-full bg-gradient-brand text-primary-foreground">Submit</Button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Announcements">
        <ul className="space-y-3">
          {announcements.slice(0, 3).map((a) => (
            <li key={a.id} className="flex gap-3 rounded-lg border border-border p-3">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.priority === "high" ? "bg-destructive" : "bg-primary"}`} />
              <div>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
