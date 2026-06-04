import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/app/academics")({ component: AcademicsPage });

const exams = [
  { name: "Unit-1 Exam", status: "Conducted", date: "Apr 15–20, 2026", active: true },
  { name: "Mid-Semester Exam", status: "Conducted", date: "May 10–15, 2026" },
  { name: "Unit-2 Exam", status: "Pending", date: "Jun 20–25, 2026" },
  { name: "Final Exams", status: "Pending", date: "Jul 15–30, 2026" },
];

const topStudents = [
  ["Ishaan Verma", 78, 351],
  ["Aditya Rao", 75, 337],
  ["Ishaan Gupta", 75, 339],
  ["Maya Patel", 74, 334],
  ["Diya Patel", 72, 324],
] as const;

const bottomStudents = [
  ["Saanvi Nair", 24, 110],
  ["Saanvi Gupta", 27, 121],
  ["Rohan Nair", 30, 135],
  ["Rohan Rao", 36, 163],
  ["Aarav Rao", 38, 172],
] as const;

function AcademicsPage() {
  const [cls, setCls] = useState("Class 10A");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Performance & Analytics"
        description="Track exam results and student performance across classes."
      />

      <SectionCard title="Overall School Performance — Unit-1 Exam">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Total Students", "430", ""],
            ["School Average", "74%", ""],
            ["Students Passed", "408", "text-success"],
            ["Students Failed", "22", "text-destructive"],
            ["Pass Rate", "95%", "text-success"],
          ].map(([k, v, c]) => (
            <Card key={k} className="p-4"><p className="text-xs text-muted-foreground">{k}</p><p className={`mt-1 text-2xl font-bold ${c}`}>{v}</p></Card>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Exam Status">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((e) => (
            <Card key={e.name} className={`p-4 ${e.active ? "border-primary bg-primary/5" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{e.name}</p>
                <Badge variant={e.status === "Conducted" ? "secondary" : "outline"}>
                  {e.status === "Conducted" ? "✓" : "⏳"} {e.status}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{e.date}</p>
            </Card>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Unit-1 Exam — Details">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Total Marks", "450"],
            ["Per Subject", "90"],
            ["Subjects", "5"],
            ["Duration", "6 days"],
            ["Classes", "6"],
          ].map(([k, v]) => (
            <Card key={k} className="p-4"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-1 text-xl font-bold">{v}</p></Card>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Class Performance"
        action={
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
            {["Class 8A", "Class 9A", "Class 10A", "Class 11A", "Class 12A"].map((c) => <option key={c}>{c}</option>)}
          </select>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {[
            ["Total Students", "72"],
            ["Passed", "65"],
            ["Failed", "7"],
            ["Pass %", "90%"],
            ["Class Avg", "55%"],
            ["Best Subject", "Social Studies"],
            ["Weakest", "Science"],
          ].map(([k, v]) => (
            <Card key={k} className="p-3"><p className="text-[11px] text-muted-foreground">{k}</p><p className="mt-1 text-sm font-semibold">{v}</p></Card>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Top 5 Performing Students" description="Class 10A">
          <ul className="space-y-2">
            {topStudents.map(([n, pct, m], i) => (
              <li key={n} className="flex items-center justify-between rounded-lg border border-success/30 bg-success/5 p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-success text-xs font-bold text-success-foreground">{i + 1}</span>
                  <div><p className="text-sm font-medium">{n}</p><p className="text-xs text-muted-foreground">{m}/450 Marks</p></div>
                </div>
                <span className="font-bold text-success">{pct}%</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="mt-3 w-full"><ChevronDown className="mr-1 h-4 w-4" />Load More</Button>
        </SectionCard>

        <SectionCard title="Bottom 5 Performing Students" description="Need attention">
          <ul className="space-y-2">
            {bottomStudents.map(([n, pct, m], i) => (
              <li key={n} className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">{i + 1}</span>
                  <div><p className="text-sm font-medium">{n}</p><p className="text-xs text-muted-foreground">{m}/450 Marks</p></div>
                </div>
                <span className="font-bold text-destructive">{pct}%</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="mt-3 w-full"><ChevronDown className="mr-1 h-4 w-4" />Load More</Button>
        </SectionCard>
      </div>
    </div>
  );
}
