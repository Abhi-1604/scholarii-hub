export type Role = "principal" | "teacher" | "student" | "admin" | "parent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  roll: string;
  class: string;
  section: string;
  attendance: number;
  feeStatus: "paid" | "pending" | "overdue";
  parentId?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  rating: number;
  status: "active" | "leave";
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  priority: "low" | "normal" | "high";
  date: string;
  read?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: string;
}
