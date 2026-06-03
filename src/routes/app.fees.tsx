import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, AlertTriangle, FileDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard, PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { students, feeCollection } from "@/lib/scholarii/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/fees")({
  component: FeesPage,
});

function FeesPage() {
  const defaulters = students.filter((s) => s.feeStatus !== "paid").slice(0, 8);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Reports"
        description="Collection overview & defaulters"
        action={<Button size="sm" variant="outline"><FileDown className="mr-1.5 h-4 w-4" />Export</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today" value="₹78,500" icon={DollarSign} accent="success" />
        <StatCard label="This Week" value="₹3.4L" icon={DollarSign} accent="info" />
        <StatCard label="This Month" value="₹4.9L" icon={DollarSign} accent="primary" />
        <StatCard label="Outstanding" value="₹1.2L" icon={AlertTriangle} accent="warning" />
      </div>

      <SectionCard title="Collection trend">
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={feeCollection}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.18 275)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.62 0.20 330)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 280)" />
              <XAxis dataKey="month" stroke="currentColor" className="text-xs" />
              <YAxis stroke="currentColor" className="text-xs" tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
                formatter={(v: number) => `₹${v.toLocaleString()}`}
              />
              <Area type="monotone" dataKey="amount" stroke="oklch(0.62 0.18 275)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="font-semibold">Fee defaulters</h3>
            <p className="text-sm text-muted-foreground">Send a friendly reminder</p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Pending</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defaulters.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.class}-{s.section}</TableCell>
                <TableCell>₹{(8000 + (Number(s.roll) % 9) * 1500).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={s.feeStatus === "overdue" ? "destructive" : "secondary"} className="capitalize">{s.feeStatus}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline"><Send className="mr-1.5 h-3.5 w-3.5" />Remind</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
