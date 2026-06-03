import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, FileDown, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/scholarii/stat-card";
import { students } from "@/lib/scholarii/mock-data";

export const Route = createFileRoute("/app/students")({
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return students.filter((s) =>
      (cls === "all" || s.class === cls) &&
      (status === "all" || s.feeStatus === status) &&
      (q === "" || s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.includes(q)),
    );
  }, [q, cls, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={`${filtered.length} of ${students.length} students`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm"><Upload className="mr-1.5 h-4 w-4" />Import CSV</Button>
            <Button variant="outline" size="sm"><FileDown className="mr-1.5 h-4 w-4" />Export</Button>
            <Button size="sm" className="bg-gradient-brand text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />Add Student</Button>
          </div>
        }
      />

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or roll number…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={cls} onValueChange={setCls}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Class" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((c) => (
                <SelectItem key={c} value={c}>Class {c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Fee status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 25).map((s) => {
                const initials = s.name.split(" ").map((n) => n[0]).join("");
                const attColor = s.attendance >= 90 ? "text-success" : s.attendance >= 75 ? "text-warning" : "text-destructive";
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-gradient-brand text-xs text-primary-foreground">{initials}</AvatarFallback></Avatar>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{s.roll}</TableCell>
                    <TableCell>{s.class}-{s.section}</TableCell>
                    <TableCell className={attColor}>{s.attendance}%</TableCell>
                    <TableCell>
                      <Badge variant={s.feeStatus === "paid" ? "default" : s.feeStatus === "pending" ? "secondary" : "destructive"} className="capitalize">{s.feeStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <span>Showing {Math.min(25, filtered.length)} of {filtered.length}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
