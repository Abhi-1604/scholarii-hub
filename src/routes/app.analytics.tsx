import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { classPerformance } from "@/lib/scholarii/mock-data";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsPage,
});

const enrollment = [
  { year: "2021", students: 980 },
  { year: "2022", students: 1080 },
  { year: "2023", students: 1180 },
  { year: "2024", students: 1240 },
  { year: "2025", students: 1284 },
];

const subjectAvg = [
  { subject: "Math", score: 78 },
  { subject: "Science", score: 82 },
  { subject: "English", score: 85 },
  { subject: "History", score: 74 },
  { subject: "Arts", score: 88 },
  { subject: "PE", score: 92 },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Deep insights into school performance" />
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Enrollment trend">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={enrollment}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 280)" />
                <XAxis dataKey="year" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="students" fill="oklch(0.62 0.18 275)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Subject averages">
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={subjectAvg}>
                <PolarGrid stroke="oklch(0.85 0.01 280)" />
                <PolarAngleAxis dataKey="subject" className="text-xs" />
                <PolarRadiusAxis className="text-[10px]" />
                <Radar dataKey="score" stroke="oklch(0.62 0.20 330)" fill="oklch(0.62 0.20 330)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Class-wise performance">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 280)" />
              <XAxis dataKey="class" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="score" fill="oklch(0.62 0.18 275)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
      <Card className="bg-gradient-soft p-6">
        <h3 className="text-lg font-semibold">Custom reports</h3>
        <p className="mt-1 text-sm text-muted-foreground">Build any report with our drag-and-drop report builder — coming soon.</p>
      </Card>
    </div>
  );
}
