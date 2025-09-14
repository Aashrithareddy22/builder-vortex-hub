import { Link } from "react-router-dom";
import { Recycle, CalendarClock, Bell, BarChart3, Users, ShieldCheck, MapPinned, Leaf } from "lucide-react";

export default function Index() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
      <section className="container grid gap-10 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Smart Waste Pickup & Recycling Platform
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Join the <span className="text-primary">Recycling Revolution</span>
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            WasteZero is a digital platform to help users schedule waste pickups, categorize recyclables, and promote responsible waste management. Pickup agents are assigned intelligently based on location.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/register" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-primary-foreground shadow hover:opacity-95">
              Get Started
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-foreground hover:bg-accent">
              I already have an account
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted-foreground md:max-w-md">
            <li className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary"/> Schedule pickups</li>
            <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary"/> Categorize recyclables</li>
            <li className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-primary"/> Location‑based agent matching</li>
            <li className="flex items-center gap-2"><Bell className="h-4 w-4 text-primary"/> Real‑time notifications</li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/10 blur-3xl" />
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Recycle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Overview</p>
                <h3 className="text-xl font-semibold">Waste Statistics</h3>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Total Pickups", value: "28" },
                { label: "Recycled Items", value: "635" },
                { label: "CO₂ Saved (kg)", value: "243" },
                { label: "Volunteer Hours", value: "87" },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-background p-4">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="mt-1 text-2xl font-bold">{m.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Recycling Breakdown</span>
                <span className="text-muted-foreground">This Month</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Plastic", pct: 40 },
                  { name: "Paper", pct: 25 },
                  { name: "Glass", pct: 15 },
                  { name: "E‑Waste", pct: 10 },
                  { name: "Organic", pct: 10 },
                ].map((r) => (
                  <div key={r.name}>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{r.name}</span><span>{r.pct}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t bg-card/40 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold">Outcomes</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: "Register & Login", desc: "Users can register, login and schedule waste pickups." },
              { icon: BarChart3, title: "Categorize Waste", desc: "Waste is categorized (plastic, organic, e‑waste, etc.)." },
              { icon: Bell, title: "Smart Matching", desc: "Agents are notified and assigned dynamically; users get alerts and stats." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border bg-background p-6">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold">Modules</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {["User Management","Opportunity Management","Matching & Communication","Administration & Reporting"].map((m) => (
              <div key={m} className="rounded-xl border bg-background p-6">
                <h3 className="font-semibold">{m}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Learn more on the dashboard after you create an account.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-12">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready to make waste management smarter?</h3>
            <p className="text-sm text-muted-foreground">Create your account to schedule pickups and track impact.</p>
          </div>
          <Link to="/register" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-primary-foreground shadow hover:opacity-95">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
