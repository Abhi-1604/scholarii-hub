import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu, Bell, Search, Sun, Moon, GraduationCap, LogOut, User as UserIcon, Settings, HelpCircle, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/lib/scholarii/auth";
import { useTheme } from "@/lib/scholarii/theme";
import { NAV } from "@/lib/scholarii/nav";
import { useNavigate } from "@tanstack/react-router";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (!user) return null;
  const items = NAV[user.role];

  return (
    <div className="min-h-screen bg-background">
      <TopBar onMenu={() => setMobileOpen(true)} />
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
          <SidebarBody items={items} />
        </aside>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 bg-sidebar p-0">
            <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                  <GraduationCap className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">Scholarii</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SidebarBody items={items} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
      <UnusedExports logout={logout} />
    </div>
  );
}

function SidebarBody({ items, onNavigate }: { items: typeof NAV["principal"]; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((item) => {
        const active = pathname === item.to || (item.to !== "/app" && pathname.startsWith(item.to));
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-gradient-brand text-primary-foreground shadow-elegant"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const initials = user?.name.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "U";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/app" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:block">Scholarii</span>
        </Link>

        <div className="relative ml-2 hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search students, teachers, classes…" className="pl-9" />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-destructive p-0 text-[10px] text-destructive-foreground">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                "New assignment submitted by Aarav V.",
                "Fee of ₹45,000 received from Rohan M.",
                "Sports Day announcement published",
              ].map((n) => (
                <DropdownMenuItem key={n} className="flex-col items-start gap-0.5 py-2">
                  <span className="text-sm">{n}</span>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-brand text-xs text-primary-foreground">{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:block">{user?.name.split(" ")[0]}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal text-muted-foreground capitalize">{user?.role}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><UserIcon className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
              <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" />Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/" }); }} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function UnusedExports(_: { logout: () => void }) { return null; }
