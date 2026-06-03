import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, CheckCircle2, Wallet, CalendarCheck, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scholarii — Replace Excel & WhatsApp with one school platform" },
      { name: "description", content: "India's simplest school management system. Fee collection, attendance and parent communication in one beautiful platform." },
      { property: "og:title", content: "Scholarii — Modern School Management" },
      { property: "og:description", content: "India's simplest school management system." },
    ],
  }),
  component: Landing,
});

const demoSchema = z.object({
  schoolName: z.string().trim().min(2, "School name is required").max(120),
  name: z.string().trim().min(2, "Your name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  students: z.string().min(1, "Select student count"),
  challenge: z.string().min(1, "Select your biggest challenge"),
  currentSystem: z.string().min(1, "Select current system"),
  date: z.string().min(1, "Pick a preferred date"),
  time: z.string().min(1, "Pick a preferred time"),
  message: z.string().max(500).optional(),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <DemoForm />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Scholarii</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#demo" className="hover:text-foreground">Book Demo</a>
          <Link to="/login" className="hover:text-foreground">Sign In</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <a href="#demo">
            <Button size="sm" className="bg-gradient-brand text-primary-foreground hover:opacity-95">
              Book a Demo
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-60" />
      <div className="absolute -top-32 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground shadow-card">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Trusted by 500+ schools across India
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Replace Excel & WhatsApp with{" "}
            <span className="text-gradient-brand">Scholarii</span>
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            India's simplest school management system. One beautiful platform for fees, attendance,
            grades and parent communication — built for the way Indian schools actually work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#demo">
              <Button size="lg" className="bg-gradient-brand text-primary-foreground shadow-elegant hover:opacity-95">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link to="/login">
              <Button size="lg" variant="outline">Try Free</Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="glass rounded-2xl p-2 shadow-elegant">
            <div className="rounded-xl bg-gradient-soft p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Attendance Today", value: "94%", color: "text-success" },
                  { label: "Fees Collected (June)", value: "₹4.9L", color: "text-primary" },
                  { label: "Active Students", value: "1,284", color: "text-foreground" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-card p-5 shadow-card">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`mt-2 text-3xl font-semibold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-card p-5 shadow-card">
                  <p className="text-sm font-medium">Recent activity</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• Aanya Kapoor admitted to Grade 5-A</li>
                    <li>• Fee of ₹45,000 received from Rohan Mehta</li>
                    <li>• Sports Day announcement published</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-card p-5 shadow-card">
                  <p className="text-sm font-medium">Quick actions</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["Add Student", "Mark Attendance", "Send Notice", "Record Fee"].map((a) => (
                      <div key={a} className="rounded-lg border border-border bg-background px-3 py-2 text-xs">
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "60%", label: "Time saved on admin work" },
    { value: "95%", label: "Parent satisfaction rate" },
    { value: "500+", label: "Schools trust Scholarii" },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-4xl font-bold text-gradient-brand">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Wallet, title: "Fee Management", body: "Track payments, send reminders, generate receipts — automated and on time." },
    { icon: CalendarCheck, title: "Attendance Tracking", body: "Period-wise digital attendance with instant parent alerts and reports." },
    { icon: MessageSquare, title: "Parent Communication", body: "School-wide & class-specific announcements with read receipts." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything your school needs</h2>
        <p className="mt-3 text-muted-foreground">A modern toolkit for principals, teachers, students, parents and admins.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
              <f.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {["Real-time updates", "Automated workflows", "Beautiful reports"].map((l) => (
                <li key={l} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {l}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

function DemoForm() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = demoSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const existing = JSON.parse(localStorage.getItem("scholarii_demos") || "[]");
      existing.push({ ...result.data, submittedAt: new Date().toISOString() });
      localStorage.setItem("scholarii_demos", JSON.stringify(existing));
      toast.success("Demo booked! We'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="demo" className="border-t border-border bg-gradient-soft">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Book your free demo</h2>
          <p className="mt-3 text-muted-foreground">See Scholarii live for your school in under 30 minutes.</p>
        </div>
        <Card className="mt-10 p-6 shadow-elegant sm:p-8">
          <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <Field name="schoolName" label="School Name *"><Input name="schoolName" placeholder="Greenfield Public School" /></Field>
            <Field name="name" label="Your Name *"><Input name="name" placeholder="Anita Desai" /></Field>
            <Field name="email" label="Email *"><Input type="email" name="email" placeholder="anita@school.edu" /></Field>
            <Field name="phone" label="Phone (10 digits) *"><Input name="phone" placeholder="9876543210" inputMode="numeric" /></Field>
            <Field name="students" label="Number of Students *">
              <SelectField name="students" placeholder="Select range" options={["<100", "100-500", "500-1000", "1000+"]} />
            </Field>
            <Field name="challenge" label="Biggest Challenge *">
              <SelectField name="challenge" placeholder="Pick one" options={["Fee Collection", "Attendance", "Communication", "All of the above"]} />
            </Field>
            <Field name="currentSystem" label="Current System *">
              <SelectField name="currentSystem" placeholder="What are you using today?" options={["Excel", "WhatsApp", "Other ERP", "Nothing"]} />
            </Field>
            <Field name="date" label="Preferred Date *"><Input type="date" name="date" /></Field>
            <Field name="time" label="Preferred Time *"><Input type="time" name="time" /></Field>
            <div className="sm:col-span-2">
              <Label>Message</Label>
              <Textarea name="message" placeholder="Anything specific you'd like to discuss?" className="mt-1.5" />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full bg-gradient-brand text-primary-foreground shadow-elegant hover:opacity-95"
              >
                {submitting ? "Booking..." : "Book My Demo"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

function Field({ label, children }: { name: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function SelectField({ name, placeholder, options }: { name: string; placeholder: string; options: string[] }) {
  const [value, setValue] = useState("");
  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Scholarii. Made in India.</p>
        <div className="flex gap-5">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#demo" className="hover:text-foreground">Demo</a>
          <Link to="/login" className="hover:text-foreground">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}
