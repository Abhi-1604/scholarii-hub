import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/scholarii/auth";
import PrincipalDashboard from "@/components/scholarii/dashboards/principal";
import TeacherDashboard from "@/components/scholarii/dashboards/teacher";
import StudentDashboard from "@/components/scholarii/dashboards/student";
import AdminDashboard from "@/components/scholarii/dashboards/admin";
import ParentDashboard from "@/components/scholarii/dashboards/parent";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  switch (user.role) {
    case "principal": return <PrincipalDashboard />;
    case "teacher": return <TeacherDashboard />;
    case "student": return <StudentDashboard />;
    case "admin": return <AdminDashboard />;
    case "parent": return <ParentDashboard />;
  }
}
