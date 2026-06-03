import { useState } from "react";
import { CalendarCheck, ClipboardList, GraduationCap, Wallet, Wallet as Pay, FileText, MessageCircle, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard, PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { announcements } from "@/lib/scholarii/mock-data";

const children = [
  { id: "C1", name: "Aarav Verma", class: "Grade 8-A" },
  { id: "C2", name: "Ira Verma", class: "Grade 5-B" },
];

export default function ParentDashboard() {
  const [selected, setSelected] = useState(children[0].id);
  const child = children.find((c) => c.id === selected)!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome, Mr. Verma 👋"
        description={`Viewing ${child.name} · ${child.class}`}
        action={
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {children.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance" value="92%" icon={CalendarCheck} accent="success" />
        <StatCard label="Pending Assignments" value="2" icon={ClipboardList} accent="warning" />
        <StatCard label="Latest Grade" value="A-" icon={GraduationCap} accent="primary" />
        <StatCard label="Fees" value="₹12k Due" icon={Wallet} accent="info" />
      </div>

      <SectionCard title="Quick Actions">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Pay, label: "Pay Fees" },
            { icon: FileText, label: "Report Card" },
            { icon: MessageCircle, label: "Contact Teacher" },
            { icon: CalendarPlus, label: "Apply for Leave" },
          ].map((q) => (
            <Button key={q.label} variant="outline" className="h-20 flex-col gap-2">
              <q.icon className="h-5 w-5 text-primary" />
              <span className="text-xs">{q.label}</span>
            </Button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="School Updates">
        <ul className="space-y-3">
          {announcements.slice(0, 4).map((a) => (
            <li key={a.id} className="rounded-lg border border-border p-3">
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
