import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { announcements } from "@/lib/scholarii/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/announcements")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Communicate with the entire school" />
      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Create Announcement" className="lg:col-span-1">
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Announcement sent"); (e.target as HTMLFormElement).reset(); }}
            className="space-y-3"
          >
            <div><Label>Title</Label><Input placeholder="What's this about?" className="mt-1.5" required /></div>
            <div><Label>Message</Label><Textarea placeholder="Write your announcement…" className="mt-1.5" rows={4} required /></div>
            <div>
              <Label>Audience</Label>
              <Select defaultValue="all">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Everyone</SelectItem>
                  <SelectItem value="students">Students only</SelectItem>
                  <SelectItem value="parents">Parents only</SelectItem>
                  <SelectItem value="teachers">Teachers only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-gradient-brand text-primary-foreground">
              <Megaphone className="mr-1.5 h-4 w-4" />Publish
            </Button>
          </form>
        </SectionCard>

        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 font-semibold">Sent announcements</h3>
          <ul className="space-y-3">
            {announcements.map((a) => (
              <li key={a.id} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{a.title}</h4>
                      <Badge variant={a.priority === "high" ? "destructive" : "secondary"} className="capitalize">{a.priority}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" /> {Math.floor(50 + Math.random() * 400)} reads
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{a.audience} · {a.date}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

// Unused (silence lint)
void Plus;
