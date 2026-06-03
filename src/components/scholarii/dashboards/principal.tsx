import { Users, Briefcase, CalendarCheck, DollarSign, Plus, Megaphone, FileDown, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard, PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { attendanceTrend, feeCollection, classPerformance, recentActivities } from "@/lib/scholarii/mock-data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

const chartColors = {
  primary: "oklch(0.62 0.18 275)",
  pink: "oklch(0.62 0.20 330)",
  grid: "oklch(0.85 0.01 280)",
};

export default function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Principal 👋"
        description="Here's what's happening at your school today."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm"><Plus className="mr-1.5 h-4 w-4" />Add Student</Button>
            <Button variant="outline" size="sm"><Megaphone className="mr-1.5 h-4 w-4" />Announce</Button>
            <Button size="sm" className="bg-gradient-brand text-primary-foreground"><FileDown className="mr-1.5 h-4 w-4" />Report</Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value="1,284" trend="+12 this month" trendUp icon={Users} accent="primary" />
        <StatCard label="Total Teachers" value="68" trend="+3 hires" trendUp icon={Briefcase} accent="info" />
        <StatCard label="Attendance Today" value="94%" trend="+2% vs avg" trendUp icon={CalendarCheck} accent="success" />
        <StatCard label="Fees This Month" value="₹4.9L" trend="82% of target" trendUp icon={DollarSign} accent="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Monthly Attendance" description="Last 6 months" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="month" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" domain={[80, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="attendance" stroke={chartColors.primary} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Class Performance" description="Avg score by grade">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="class" stroke="currentColor" className="text-[10px]" />
                <YAxis stroke="currentColor" className="text-xs" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="score" fill={chartColors.pink} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Fee Collection" description="Monthly breakdown" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={feeCollection}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="month" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
                  formatter={(v: number) => `₹${v.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill={chartColors.primary} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Recent Activity" description="Across the school">
          <ul className="space-y-3">
            {recentActivities.map((a) => (
              <li key={a.text} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-brand" />
                <div className="min-w-0">
                  <p className="truncate text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <Card className="bg-gradient-soft p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Schedule a Parent-Teacher Meeting</h3>
            <p className="text-sm text-muted-foreground">Coordinate with teachers and notify parents in one click.</p>
          </div>
          <Button className="bg-gradient-brand text-primary-foreground"><CalendarPlus className="mr-1.5 h-4 w-4" />Schedule PTA</Button>
        </div>
      </Card>
    </div>
  );
}
