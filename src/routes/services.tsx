import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Home, Building2, Bug, Sparkles, Leaf, ShieldCheck,
  CheckCircle2, ArrowRight, Star,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — GleamGuard Cleaning & Pest Control" },
      { name: "description", content: "Residential cleaning, commercial cleaning, and eco-friendly pest control services tailored to your space." },
      { property: "og:title", content: "Services — GleamGuard" },
      { property: "og:description", content: "Premium cleaning and pest control plans for homes and businesses." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Detailed, dependable home cleaning — from weekly upkeep to move-in/out deep cleans.",
    bullets: ["Standard & deep cleans", "Recurring schedules", "Move-in / move-out service", "Eco, child & pet-safe products"],
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    desc: "Premium maintenance for offices, clinics, and retail — discreet teams, immaculate results.",
    bullets: ["Daily, nightly, or weekly visits", "Floor & carpet care", "Restroom & breakroom sanitation", "Disinfection programs"],
  },
  {
    icon: Bug,
    title: "Pest Control",
    desc: "Eco-conscious inspection, treatment, and prevention — safe for families and pets.",
    bullets: ["Ant, roach & rodent control", "Termite inspection", "Mosquito & tick programs", "Year-round prevention plans"],
  },
  {
    icon: Sparkles,
    title: "Specialty Services",
    desc: "Targeted cleans for life's bigger moments — events, post-construction, or seasonal.",
    bullets: ["Post-construction cleanup", "Pre/post-event cleans", "Window & glass detail", "Seasonal deep refresh"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-hero py-20 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our services</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Tailored care for every space, every season.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Choose from a complete suite of cleaning and pest control services — built around your
            schedule, your space, and your standards.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-grad text-white shadow-soft">
                <s.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Simple, transparent process</h2>
            <p className="mt-4 text-muted-foreground">From quote to spotless — here's how it works.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Free Assessment", desc: "We learn your needs and walk your space." },
              { step: "02", title: "Tailored Plan", desc: "A custom plan with flat-rate pricing." },
              { step: "03", title: "Expert Service", desc: "Vetted technicians, eco products, premium results." },
              { step: "04", title: "Ongoing Care", desc: "Recurring visits and 100% satisfaction guarantee." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-3xl font-bold text-gold">{s.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
      <FaqSection />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-hero p-10 text-center text-primary-foreground shadow-elegant md:p-14">
          <Leaf className="mx-auto h-7 w-7 text-gold" />
          <h2 className="mt-3 font-display text-3xl font-bold">Let's build your custom plan</h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Tell us about your space — we'll send a tailored quote within 24 hours.
          </p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-glow transition-smooth hover:scale-[1.02]">
            Request Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-soft" /> Licensed & Insured</span>
            <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-soft" /> Eco-Certified</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
