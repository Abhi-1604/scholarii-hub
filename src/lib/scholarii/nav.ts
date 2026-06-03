import type { Role } from "./types";
import {
  LayoutDashboard, Users, Briefcase, BookOpen, DollarSign, BarChart3, Megaphone, Settings,
  CalendarCheck, ClipboardList, GraduationCap, UserCircle, CalendarDays, FileText, Wallet,
  MessageSquare, Building2, ShieldCheck, History, Receipt, Baby,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export const NAV: Record<Role, NavItem[]> = {
  principal: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/students", label: "Students", icon: Users },
    { to: "/app/teachers", label: "Teachers", icon: Briefcase },
    { to: "/app/academics", label: "Academic Overview", icon: BookOpen },
    { to: "/app/fees", label: "Fee Reports", icon: DollarSign },
    { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/app/announcements", label: "Announcements", icon: Megaphone },
    { to: "/app/settings", label: "Settings", icon: Settings },
  ],
  teacher: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/classes", label: "My Classes", icon: Users },
    { to: "/app/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/app/assignments", label: "Assignments", icon: ClipboardList },
    { to: "/app/gradebook", label: "Gradebook", icon: BookOpen },
    { to: "/app/meetings", label: "PTA Meetings", icon: CalendarDays },
    { to: "/app/announcements", label: "Announcements", icon: Megaphone },
    { to: "/app/profile", label: "Profile", icon: UserCircle },
  ],
  student: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/timetable", label: "My Timetable", icon: CalendarDays },
    { to: "/app/assignments", label: "Assignments", icon: ClipboardList },
    { to: "/app/exams", label: "Exams & Results", icon: GraduationCap },
    { to: "/app/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/app/fees", label: "Fees", icon: Wallet },
    { to: "/app/announcements", label: "Announcements", icon: Megaphone },
    { to: "/app/profile", label: "Profile", icon: UserCircle },
  ],
  admin: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/users", label: "User Management", icon: Users },
    { to: "/app/fees", label: "Fee Management", icon: DollarSign },
    { to: "/app/infrastructure", label: "Infrastructure", icon: Building2 },
    { to: "/app/reports", label: "Reports & Export", icon: FileText },
    { to: "/app/settings", label: "System Settings", icon: ShieldCheck },
    { to: "/app/audit", label: "Audit Logs", icon: History },
  ],
  parent: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/children", label: "My Children", icon: Baby },
    { to: "/app/attendance", label: "Attendance", icon: CalendarCheck },
    { to: "/app/academics", label: "Academics", icon: BookOpen },
    { to: "/app/fees", label: "Fee Payments", icon: Receipt },
    { to: "/app/communication", label: "Communication", icon: MessageSquare },
    { to: "/app/events", label: "Events", icon: CalendarDays },
  ],
};
