import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/scholarii/stat-card";
import { Construction } from "lucide-react";

function comingSoon(title: string, description: string) {
  return function Page() {
    return (
      <div className="space-y-6">
        <PageHeader title={title} description={description} />
        <Card className="grid place-items-center gap-3 p-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
            <Construction className="h-6 w-6 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold">{title} is coming soon</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            This module is part of the full Scholarii suite. The dashboards, demo flow,
            students, teachers, fees, analytics and announcements are fully wired up.
          </p>
        </Card>
      </div>
    );
  };
}

export const Route = createFileRoute("/app/$rest")({
  component: comingSoon("Module", "This section is under construction"),
});
