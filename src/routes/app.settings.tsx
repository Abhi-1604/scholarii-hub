import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/scholarii/stat-card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/scholarii/theme";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="School preferences, branding, and system controls." />
      <SectionCard title="Appearance">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-xs text-muted-foreground">Currently: {theme}</p>
          </div>
          <Button onClick={toggle} variant="outline" size="sm">Toggle theme</Button>
        </div>
      </SectionCard>
      <SectionCard title="School Profile">
        <Card className="p-4 text-sm text-muted-foreground">Full settings module coming soon — admins can manage academic year, branding, integrations and notifications here.</Card>
      </SectionCard>
    </div>
  );
}
