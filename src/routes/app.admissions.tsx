import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { Plus, Upload, Download, Search } from "lucide-react";

export const Route = createFileRoute("/app/admissions")({ component: AdmissionsPage });

const apps = Array.from({ length: 22 }, (_, i) => ({
  student: ["Arya Kapoor", "Vihaan Mehta", "Ananya Singh", "Kabir Rao", "Diya Nair", "Reyansh Iyer", "Saanvi Patel", "Aarav Khan", "Myra Bose", "Ishaan Das"][i % 10],
  parent: ["Rohan K.", "Priya M.", "Ankit S.", "Neha R.", "Vivek N.", "Sneha I.", "Manish P.", "Asha K.", "Ritu B.", "Sahil D."][i % 10],
  cls: `Grade ${(i % 8) + 1}`,
  date: `2026-0${(i % 6) + 1}-${10 + (i % 18)}`,
  status: i % 3 === 0 ? "Approved" : "New",
  docs: `${2 + (i % 3)}/4`,
}));

function AdmissionsPage() {
  const [q, setQ] = useState("");
  const filtered = apps.filter((a) => a.student.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admissions & Enrollment"
        description="Admissions centre — pipeline, capacity, and quick approvals."
        action={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />New Admission</Button>
            <Button size="sm" variant="outline"><Upload className="mr-1.5 h-4 w-4" />Import Applications</Button>
            <Button size="sm" variant="outline"><Download className="mr-1.5 h-4 w-4" />Export Report</Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {[
          ["Total Inquiries", "542", "+12% this month", "text-success"],
          ["Applications Submitted", "106", "", ""],
          ["Admissions Confirmed", "11", "", ""],
          ["Conversion Rate", "10%", "", ""],
          ["Pending Approvals", "12", "Action needed", "text-warning"],
          ["Seats Remaining", "18", "", ""],
        ].map(([k, v, sub, c]) => (
          <Card key={k} className="p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 text-2xl font-bold">{v}</p>
            {sub && <p className={`text-[11px] ${c}`}>{sub}</p>}
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Admission Funnel" description="Academic Year 2026">
          <ul className="space-y-3">
            {[
              ["Inquiries", 542, "bg-info"],
              ["Applications", 106, "bg-primary"],
              ["Enrolled", 11, "bg-success"],
              ["Students Leaving", 28, "bg-muted-foreground/60"],
            ].map(([k, v, c]) => {
              const pct = Math.min(100, (Number(v) / 542) * 100);
              return (
                <li key={k as string}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{k}</span>
                    <span className="font-semibold">{v}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${c}`} style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard title="Recent Applications" description="22 total" className="lg:col-span-2">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student, parent…" className="pl-9" />
            </div>
            <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"><option>All statuses</option></select>
            <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"><option>All classes</option></select>
            <Button variant="ghost" size="sm" onClick={() => setQ("")}>Clear</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead><TableHead>Parent</TableHead><TableHead>Class</TableHead>
                  <TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Docs</TableHead><TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(0, 10).map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{a.student}</TableCell>
                    <TableCell>{a.parent}</TableCell>
                    <TableCell>{a.cls}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{a.date}</TableCell>
                    <TableCell><Badge variant={a.status === "Approved" ? "secondary" : "default"}>{a.status}</Badge></TableCell>
                    <TableCell>{a.docs}</TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">View</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing 10 of {filtered.length} recent applications</span>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Class Capacity Overview"
        action={
          <select className="rounded-md border border-border bg-background px-3 py-1.5 text-sm">
            {["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"].map((g) => <option key={g}>{g}</option>)}
          </select>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="border-info/30 bg-info/5 p-4">
            <p className="text-xs text-muted-foreground">Filled Seats</p>
            <p className="text-2xl font-bold text-info">116</p>
          </Card>
          <Card className="border-success/30 bg-success/5 p-4">
            <p className="text-xs text-muted-foreground">Total Seats</p>
            <p className="text-2xl font-bold text-success">120</p>
          </Card>
          <Card className="border-warning/30 bg-warning/5 p-4">
            <p className="text-xs text-muted-foreground">Seats Available</p>
            <p className="text-2xl font-bold text-warning">4</p>
          </Card>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity Status</span>
            <span className="font-semibold">97%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: "97%" }} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
