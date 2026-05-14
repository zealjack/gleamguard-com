import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroImg from "@/assets/hero.jpg";
import pestImg from "@/assets/pest.jpg";
import cleaningImg from "@/assets/cleaning.jpg";
import commercialImg from "@/assets/commercial.jpg";
import {
  Leaf, ShieldCheck, Sparkles, Bug, Building2, Home,
  Star, ArrowRight, CheckCircle2, Clock, Award,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GleamGuard — Premium Eco Cleaning & Pest Control" },
      { name: "description", content: "Trusted, eco-friendly cleaning and pest control for homes and businesses. Certified technicians, premium results." },
      { property: "og:title", content: "GleamGuard — Premium Eco Cleaning & Pest Control" },
      { property: "og:description", content: "Trusted, eco-friendly cleaning and pest control for homes and businesses." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold">
              <Leaf className="h-3.5 w-3.5" /> Eco-Certified Service
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              A cleaner home.<br />
              A <span className="text-gold">guarded</span> space.
            </h1>
            <p className="mt-5 max-w-lg text-base text-primary-foreground/80 sm:text-lg">
              GleamGuard delivers premium eco-friendly cleaning and pest control —
              trusted by hundreds of homes and businesses for spotless, healthy environments.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-glow transition-smooth hover:scale-[1.02]"
              >
                Book Your Service <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-smooth hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-soft" /> Licensed & Insured</div>
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-soft" /> Plant-Based Solutions</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 text-gold" /> 4.9 / 5 Rated</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gold/20 blur-2xl" />
            <img
              src={heroImg}
              alt="GleamGuard professional cleaning a modern home"
              width={1920}
              height={1080}
              className="relative w-full rounded-3xl shadow-elegant"
            />
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl bg-white p-4 text-navy shadow-elegant sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-grad text-white">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Trusted by</p>
                  <p className="font-display text-lg font-bold">2,400+ clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">What we do</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Premium services, perfectly tailored
          </h2>
          <p className="mt-4 text-muted-foreground">
            From sparkling residential deep cleans to discreet, eco-conscious pest defense —
            every service is delivered by trained, vetted GleamGuard professionals.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Home, title: "Residential Cleaning", img: cleaningImg, desc: "Deep cleans, recurring service, and move-in/out detail for spotless living." },
            { icon: Building2, title: "Commercial Cleaning", img: commercialImg, desc: "Offices, retail, and clinics maintained to the highest hygienic standard." },
            { icon: Bug, title: "Pest Control", img: pestImg, desc: "Eco-safe inspection, treatment, and prevention for total peace of mind." },
          ].map((s) => (
            <article key={s.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-navy shadow-soft">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <Link to="/services" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:gap-2 transition-smooth" aria-label={`Explore ${s.title} details and pricing`}>
                  Explore {s.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-muted/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">Why GleamGuard</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              The premium standard in clean & guarded spaces
            </h2>
            <p className="mt-4 text-muted-foreground">
              We combine rigorous training, certified eco-friendly products, and meticulous
              processes to deliver results that last — backed by our 100% satisfaction guarantee.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Plant-based, child & pet-safe products",
                "Vetted, background-checked technicians",
                "Transparent flat-rate pricing — no surprises",
                "Same-week scheduling, 7 days a week",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald" />
                  <span className="text-sm text-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Leaf, label: "Eco-Friendly", value: "100%" },
              { icon: ShieldCheck, label: "Insured Visits", value: "$2M" },
              { icon: Clock, label: "On-Time Rate", value: "98%" },
              { icon: Star, label: "Client Rating", value: "4.9★" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-3xl font-bold text-navy">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">Loved by clients</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Real stories, sparkling results</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "Amelia R.", role: "Homeowner", quote: "My home has never felt so fresh — and knowing the products are safe for my kids is everything." },
            { name: "Marcus T.", role: "Office Manager", quote: "Reliable, discreet, and immaculate. Our team noticed the difference within the first week." },
            { name: "Priya S.", role: "Restaurant Owner", quote: "Their pest program is best-in-class. Zero issues in 14 months — and zero harsh chemicals." },
          ].map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-sm text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-navy">{t.name}</span>
                <span className="text-muted-foreground"> · {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-hero p-10 text-center text-primary-foreground shadow-elegant md:p-16">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_70%_30%,oklch(0.82_0.11_85),transparent_50%)]" />
          <div className="relative">
            <Sparkles className="mx-auto h-8 w-8 text-gold" />
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Ready for a cleaner, healthier space?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Book a free on-site assessment. We'll tailor a plan that fits your space, schedule, and budget.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-glow transition-smooth hover:scale-[1.02]"
            >
              Get Your Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
