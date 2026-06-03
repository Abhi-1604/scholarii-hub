import type { Student, Teacher, Announcement, Assignment } from "./types";

const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Ananya", "Diya", "Aadhya", "Saanvi", "Pari", "Kiara", "Myra", "Anika", "Navya", "Riya", "Kabir", "Rohan", "Dev", "Yash", "Veer", "Tara", "Ira", "Zoya", "Nisha", "Meera"];
const lastNames = ["Sharma", "Verma", "Patel", "Gupta", "Reddy", "Iyer", "Kumar", "Singh", "Mehta", "Nair", "Joshi", "Bose", "Rao", "Khan", "Das"];

const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const r = rand(42);

export const students: Student[] = Array.from({ length: 54 }, (_, i) => {
  const cls = String(((i % 10) + 1));
  const section = ["A", "B", "C"][i % 3];
  const att = Math.round(65 + r() * 35);
  const statuses: Student["feeStatus"][] = ["paid", "paid", "paid", "pending", "overdue"];
  return {
    id: `S${1000 + i}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    roll: String(i + 1).padStart(3, "0"),
    class: cls,
    section,
    attendance: att,
    feeStatus: statuses[i % statuses.length],
  };
});

const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Physics", "Chemistry", "Biology", "Computer Science", "Hindi", "Arts", "Physical Ed", "Economics", "Civics", "Sanskrit"];

export const teachers: Teacher[] = subjects.slice(0, 15).map((subj, i) => ({
  id: `T${100 + i}`,
  name: `${firstNames[(i + 5) % firstNames.length]} ${lastNames[(i + 2) % lastNames.length]}`,
  subject: subj,
  classes: [`${(i % 10) + 1}-A`, `${((i + 1) % 10) + 1}-B`],
  rating: 3.5 + (i % 3) * 0.5,
  status: i % 7 === 0 ? "leave" : "active",
}));

export const announcements: Announcement[] = [
  { id: "A1", title: "Annual Sports Day on 15th June", body: "All students are invited to participate in the annual sports day events.", audience: "All", priority: "high", date: "2026-06-01", read: false },
  { id: "A2", title: "Parent-Teacher Meeting Schedule", body: "PTM scheduled for Saturday 10th June, 9:00 AM onwards.", audience: "Parents", priority: "high", date: "2026-05-30", read: false },
  { id: "A3", title: "Library closed for inventory", body: "The school library will remain closed from June 5-7 for annual inventory.", audience: "All", priority: "normal", date: "2026-05-28", read: true },
  { id: "A4", title: "Mid-term Exam Schedule Released", body: "Check the academic portal for full mid-term exam timetable.", audience: "Students", priority: "high", date: "2026-05-25", read: true },
  { id: "A5", title: "Summer Vacation Notice", body: "School will be closed from June 20 to July 5 for summer break.", audience: "All", priority: "normal", date: "2026-05-20", read: true },
];

export const assignments: Assignment[] = [
  { id: "AS1", title: "Algebra Worksheet 4", subject: "Mathematics", class: "8-A", dueDate: "2026-06-08", status: "pending" },
  { id: "AS2", title: "Photosynthesis Essay", subject: "Biology", class: "8-A", dueDate: "2026-06-10", status: "pending" },
  { id: "AS3", title: "Shakespeare Analysis", subject: "English", class: "8-A", dueDate: "2026-06-05", status: "submitted" },
  { id: "AS4", title: "World War II Timeline", subject: "History", class: "8-A", dueDate: "2026-05-28", status: "graded", grade: "A" },
  { id: "AS5", title: "Newton's Laws Lab", subject: "Physics", class: "8-A", dueDate: "2026-05-25", status: "graded", grade: "A-" },
];

export const attendanceTrend = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 89 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 93 },
  { month: "Jun", attendance: 95 },
];

export const feeCollection = [
  { month: "Jan", amount: 420000 },
  { month: "Feb", amount: 380000 },
  { month: "Mar", amount: 510000 },
  { month: "Apr", amount: 460000 },
  { month: "May", amount: 540000 },
  { month: "Jun", amount: 490000 },
];

export const classPerformance = [
  { class: "Grade 6", score: 78 },
  { class: "Grade 7", score: 82 },
  { class: "Grade 8", score: 75 },
  { class: "Grade 9", score: 85 },
  { class: "Grade 10", score: 88 },
];

export const todaySchedule = [
  { time: "08:00 - 08:45", subject: "Mathematics", class: "8-A", room: "204" },
  { time: "09:00 - 09:45", subject: "Mathematics", class: "9-B", room: "301" },
  { time: "10:00 - 10:45", subject: "Mathematics", class: "7-A", room: "204" },
  { time: "11:30 - 12:15", subject: "Mathematics", class: "10-A", room: "401" },
  { time: "13:00 - 13:45", subject: "Mathematics", class: "8-B", room: "204" },
];

export const recentActivities = [
  { type: "admission", text: "New admission: Aanya Kapoor (Grade 5-A)", time: "2 hours ago" },
  { type: "payment", text: "Fee payment received: ₹45,000 from Rohan Mehta", time: "3 hours ago" },
  { type: "leave", text: "Leave request from Teacher Priya Sharma", time: "5 hours ago" },
  { type: "announcement", text: "Sports Day announcement published", time: "1 day ago" },
  { type: "admission", text: "New admission: Veer Singh (Grade 3-B)", time: "1 day ago" },
];
