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

const tiers = [
  {
    name: "Essential",
    price: "$129",
    cadence: "per visit",
    desc: "Perfect for routine upkeep and smaller spaces.",
    features: [
      "Up to 1,500 sq ft",
      "Standard cleaning checklist",
      "Eco-friendly products included",
      "Flexible scheduling",
    ],
  },
  {
    name: "Premium",
    price: "$229",
    cadence: "per visit",
    desc: "Our most popular plan — deeper care, bigger spaces.",
    features: [
      "Up to 3,000 sq ft",
      "Deep clean checklist",
      "Interior windows & appliances",
      "Priority booking",
    ],
    featured: true,
  },
  {
    name: "Guard Plan",
    price: "Custom",
    cadence: "tailored quote",
    desc: "Combined cleaning + pest control on a recurring schedule.",
    features: [
      "Bundled cleaning & pest service",
      "Quarterly pest prevention",
      "Dedicated account manager",
      "Same-week emergency response",
    ],
  },
];

function PricingSection() {
  return (
    <section className="bg-muted/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Flat-rate plans, no surprises</h2>
          <p className="mt-4 text-muted-foreground">
            Transparent pricing with the option to customize. Every plan includes our 100% satisfaction guarantee.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                "relative flex flex-col rounded-2xl border bg-card p-8 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant " +
                (t.featured ? "border-gold ring-2 ring-gold/30" : "border-border")
              }
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold-grad px-3 py-1 text-xs font-semibold text-gold-foreground shadow-soft">
                  <Star className="h-3 w-3 fill-current" /> Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-navy">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-navy">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.cadence}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={
                  "mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-smooth " +
                  (t.featured
                    ? "bg-gold text-gold-foreground shadow-glow hover:scale-[1.02]"
                    : "bg-navy text-primary-foreground hover:bg-emerald")
                }
              >
                Choose {t.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Recurring weekly or bi-weekly clients save up to 20%. Bundle cleaning + pest control for additional savings.
        </p>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Are your products safe for kids and pets?",
    a: "Yes. Every product we use is plant-based, biodegradable, and certified non-toxic. Surfaces are safe to use as soon as we're done.",
  },
  {
    q: "Do I need to be home during service?",
    a: "Not at all. Many of our clients provide secure entry instructions. Our background-checked technicians are fully insured and bonded.",
  },
  {
    q: "How does pricing work for larger or unusual spaces?",
    a: "We offer free on-site assessments for any space outside our standard tiers, and provide a flat, all-in quote — no hourly surprises.",
  },
  {
    q: "What's included in your pest control service?",
    a: "Inspection, eco-safe treatment, and a prevention plan tailored to your property. Most plans include scheduled follow-ups.",
  },
  {
    q: "Can I reschedule or cancel a visit?",
    a: "Absolutely. Reschedule or cancel up to 24 hours before your appointment at no charge.",
  },
  {
    q: "Do you offer a satisfaction guarantee?",
    a: "Yes — if anything isn't perfect, let us know within 24 hours and we'll re-clean the area free of charge.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">FAQ</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Questions, answered</h2>
        <p className="mt-4 text-muted-foreground">Everything you need to know before booking your first service.</p>
      </div>

      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-smooth hover:bg-muted/50"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-semibold text-navy sm:text-lg">{f.q}</span>
                <span
                  className={
                    "grid h-7 w-7 flex-none place-items-center rounded-full border border-border text-emerald transition-smooth " +
                    (isOpen ? "rotate-45 bg-emerald text-white" : "")
                  }
                  aria-hidden
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
