import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import commercialImg from "@/assets/commercial.jpg";
import { Leaf, Heart, Award, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GleamGuard — Our Story & Values" },
      { name: "description", content: "Meet GleamGuard: an eco-conscious cleaning and pest control company built on trust, training, and meticulous craft." },
      { property: "og:title", content: "About GleamGuard" },
      { property: "og:description", content: "Eco-conscious cleaning and pest control built on trust and craft." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-hero py-20 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Our story</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Built on care, trust, and a cleaner planet.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            GleamGuard was founded with a single belief — that premium service and environmental
            responsibility should never be in conflict. Today, we serve thousands of homes and
            businesses with the same quiet, unwavering standard.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
        <img
          src={commercialImg}
          alt="GleamGuard team at work"
          loading="lazy"
          className="rounded-3xl shadow-elegant"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">Who we are</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">A team that treats your space like our own</h2>
          <p className="mt-4 text-muted-foreground">
            From our founders to every newly trained technician, GleamGuard is built on shared
            craft. We hire carefully, train rigorously, and follow protocols that put your family,
            your team, and the environment first.
          </p>
          <p className="mt-4 text-muted-foreground">
            Every product on our truck is plant-based, biodegradable, and certified safe — because
            a healthy space starts with healthy ingredients.
          </p>
        </div>
      </section>

      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Our values</h2>
            <p className="mt-3 text-muted-foreground">Four principles that guide every visit.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, t: "Eco First", d: "Plant-based products, low-impact methods, sustainable practices." },
              { icon: Heart, t: "Genuine Care", d: "We treat every space like it belongs to family." },
              { icon: Award, t: "Premium Craft", d: "Trained, certified technicians who take pride in detail." },
              { icon: Users, t: "Real Trust", d: "Vetted teams, transparent pricing, dependable communication." },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero text-white">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { v: "12+", l: "Years of service" },
            { v: "2,400+", l: "Happy clients" },
            { v: "65", l: "Certified technicians" },
            { v: "100%", l: "Satisfaction guarantee" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
              <p className="font-display text-4xl font-bold text-navy">{s.v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-hero p-10 text-center text-primary-foreground shadow-elegant md:p-14">
          <h2 className="font-display text-3xl font-bold">See the GleamGuard difference</h2>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-glow transition-smooth hover:scale-[1.02]">
            Book Your First Service <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
