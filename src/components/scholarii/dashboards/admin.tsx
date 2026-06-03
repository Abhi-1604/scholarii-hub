import { Users, Activity, DollarSign, ListTodo, UserPlus, Receipt, FileDown, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard, PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { recentActivities } from "@/lib/scholarii/mock-data";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Console" description="System overview" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value="1,420" icon={Users} accent="primary" />
        <StatCard label="Active Sessions" value="287" icon={Activity} accent="info" />
        <StatCard label="Collected Today" value="₹78,500" icon={DollarSign} accent="success" />
        <StatCard label="Pending Tasks" value="9" icon={ListTodo} accent="warning" />
      </div>

      <SectionCard title="Quick Actions">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: UserPlus, label: "Add User" },
            { icon: Receipt, label: "Record Payment" },
            { icon: FileDown, label: "Generate Report" },
            { icon: Database, label: "System Backup" },
          ].map((q) => (
            <Button key={q.label} variant="outline" className="h-20 flex-col gap-2">
              <q.icon className="h-5 w-5 text-primary" />
              <span className="text-xs">{q.label}</span>
            </Button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Recent System Activity">
        <ul className="space-y-3">
          {recentActivities.map((a) => (
            <li key={a.text} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-brand" />
              <div>
                <p className="text-sm">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
