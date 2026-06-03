import { createFileRoute } from "@tanstack/react-router";
import { Star, Mail, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/scholarii/stat-card";
import { teachers } from "@/lib/scholarii/mock-data";

export const Route = createFileRoute("/app/teachers")({
  component: TeachersPage,
});

function TeachersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers"
        description={`${teachers.length} teaching staff`}
        action={<Button size="sm" className="bg-gradient-brand text-primary-foreground"><Plus className="mr-1.5 h-4 w-4" />Add Teacher</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t) => {
          const initials = t.name.split(" ").map((n) => n[0]).join("");
          return (
            <Card key={t.id} className="p-5 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-gradient-brand text-base text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold">{t.name}</h3>
                    <Badge variant={t.status === "active" ? "default" : "secondary"} className="capitalize">{t.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.subject}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(t.rating) ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                    ))}
                    <span className="ml-1 text-muted-foreground">{t.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.classes.map((c) => (
                  <Badge key={c} variant="outline">{c}</Badge>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1"><Mail className="mr-1.5 h-3.5 w-3.5" />Email</Button>
                <Button variant="outline" size="sm" className="flex-1"><Phone className="mr-1.5 h-3.5 w-3.5" />Call</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
