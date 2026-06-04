import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/scholarii/stat-card";
import { students } from "@/lib/scholarii/mock-data";
import { Users, UserCheck, AlertTriangle, Search, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/students")({ component: StudentsPage });

function StudentsPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => students.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())
  ), [q]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Command Center"
        description="Monitor attendance, performance, risk, and student operations in one intelligent workspace."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {[
          { k: "Total Students", v: "430", sub: "Enrolled", icon: Users, c: "text-foreground" },
          { k: "Present Today", v: "392", sub: "91.2%", icon: UserCheck, c: "text-success" },
          { k: "Below 75% Attendance", v: "38", sub: "Students", icon: AlertTriangle, c: "text-warning" },
          { k: "At-Risk Students", v: "38", sub: "Need attention", icon: AlertTriangle, c: "text-destructive" },
          { k: "New Admissions", v: "18", sub: "This month", icon: Users, c: "text-info" },
          { k: "Transfer Requests", v: "13", sub: "Pending", icon: AlertTriangle, c: "text-warning" },
        ].map((s) => (
          <Card key={s.k} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s.k}</p>
              <s.icon className={`h-4 w-4 ${s.c}`} />
            </div>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
            <p className="text-[11px] text-muted-foreground">{s.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="font-semibold">Student Directory</h3>
          <p className="text-sm text-muted-foreground">Search and filter student records instantly.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="relative min-w-[260px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search name, admission number, parent, phone…" className="pl-9" />
            </div>
            {["All classes", "All sections", "All status", "All attendance", "All performance", "All fees", "All risk"].map((f) => (
              <select key={f} className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"><option>{f}</option></select>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setQ("")}>Clear</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Admission No</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Academic Score</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Risk Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((s) => {
                const initials = s.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
                const score = 50 + ((Number(s.roll) * 7) % 45);
                const risk = s.attendance < 75 || score < 60 ? "Needs Attention" : "Healthy";
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-gradient-brand text-[11px] text-primary-foreground">{initials}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-[11px] text-muted-foreground">Parent: Mr/Mrs {s.name.split(" ")[1]}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{s.class}{s.section}{s.roll.padStart(2, "0")}</TableCell>
                    <TableCell className="text-sm">Grade {s.class}-{s.section}</TableCell>
                    <TableCell className={`font-medium ${s.attendance < 90 ? "text-warning" : "text-success"}`}>{s.attendance}%</TableCell>
                    <TableCell className="font-medium">{score}</TableCell>
                    <TableCell>
                      <Badge variant={s.feeStatus === "paid" ? "secondary" : s.feeStatus === "overdue" ? "destructive" : "outline"} className="capitalize">
                        {s.feeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={risk === "Healthy" ? "secondary" : "destructive"}>{risk}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <span>Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft className="h-3 w-3" /></Button>
            <span>{page}/{totalPages || 1}</span>
            <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight className="h-3 w-3" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
