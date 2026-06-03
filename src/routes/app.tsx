import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/scholarii/auth";
import { AppLayout } from "@/components/scholarii/app-layout";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

function AppShell() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
