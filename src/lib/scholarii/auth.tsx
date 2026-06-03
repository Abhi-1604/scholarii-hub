import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role, User } from "./types";

const DEMO_USERS: Record<Role, User> = {
  principal: { id: "U1", name: "Dr. Rajesh Mehra", email: "principal@school.com", role: "principal" },
  teacher: { id: "U2", name: "Priya Sharma", email: "teacher@school.com", role: "teacher" },
  student: { id: "U3", name: "Aarav Verma", email: "student@school.com", role: "student" },
  admin: { id: "U4", name: "Neha Iyer", email: "admin@school.com", role: "admin" },
  parent: { id: "U5", name: "Suresh Verma", email: "parent@school.com", role: "parent" },
};

export const DEMO_CREDENTIALS = [
  { role: "principal" as Role, email: "principal@school.com", password: "demo123" },
  { role: "teacher" as Role, email: "teacher@school.com", password: "demo123" },
  { role: "student" as Role, email: "student@school.com", password: "demo123" },
  { role: "admin" as Role, email: "admin@school.com", password: "demo123" },
  { role: "parent" as Role, email: "parent@school.com", password: "demo123" },
];

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string, role: Role) => boolean;
  logout: () => void;
  ready: boolean;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("scholarii_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const login = (email: string, password: string, role: Role) => {
    const match = DEMO_CREDENTIALS.find(
      (c) => c.email === email.trim().toLowerCase() && c.password === password && c.role === role,
    );
    if (!match) return false;
    const u = DEMO_USERS[role];
    setUser(u);
    localStorage.setItem("scholarii_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("scholarii_user");
  };

  return <AuthContext.Provider value={{ user, login, logout, ready }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
