import type { Role } from "./types";
import {
  LayoutDashboard, Users, Briefcase, BookOpen, BarChart3, Megaphone, Settings,
  CalendarCheck, ClipboardList, GraduationCap, UserCircle, CalendarDays, FileText, Wallet,
  MessageSquare, Building2, ShieldCheck, History, Receipt, Baby, CalendarRange, UserPlus,
  Banknote,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export const NAV: Record<Role, NavItem[]> = {
  principal: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/schedule", label: "Operations", icon: CalendarRange },
    { to: "/app/admissions", label: "Admissions", icon: UserPlus },
    { to: "/app/students", label: "Students", icon: Users },
    { to: "/app/teachers", label: "Teachers", icon: Briefcase },
    { to: "/app/academics", label: "Academics", icon: BookOpen },
    { to: "/app/fees", label: "Finance", icon: Banknote },
    { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/app/announcements", label: "Announcements", icon: Megaphone },
    { to: "/app/settings", label: "Settings", icon: Settings },
  ],
  teacher: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/students", label: "My Classes", icon: Users },
    { to: "/app/academics", label: "Gradebook", icon: BookOpen },
    { to: "/app/schedule", label: "Schedule", icon: CalendarCheck },
    { to: "/app/announcements", label: "Announcements", icon: Megaphone },
  ],
  student: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/schedule", label: "Timetable", icon: CalendarDays },
    { to: "/app/academics", label: "Exams", icon: GraduationCap },
    { to: "/app/fees", label: "Fees", icon: Wallet },
    { to: "/app/announcements", label: "Announcements", icon: Megaphone },
  ],
  admin: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/students", label: "Students", icon: Users },
    { to: "/app/teachers", label: "Staff", icon: Briefcase },
    { to: "/app/fees", label: "Finance", icon: Banknote },
    { to: "/app/analytics", label: "Reports", icon: FileText },
    { to: "/app/settings", label: "System Settings", icon: ShieldCheck },
  ],
  parent: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/students", label: "My Children", icon: Baby },
    { to: "/app/academics", label: "Academics", icon: BookOpen },
    { to: "/app/fees", label: "Fee Payments", icon: Receipt },
    { to: "/app/announcements", label: "Communication", icon: MessageSquare },
  ],
};
