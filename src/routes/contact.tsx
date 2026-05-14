import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact GleamGuard — Request a Free Quote" },
      { name: "description", content: "Get in touch for a free, tailored quote on cleaning or pest control services. Fast response within 24 hours." },
      { property: "og:title", content: "Contact GleamGuard" },
      { property: "og:description", content: "Request a free, tailored cleaning or pest control quote." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      <section className="bg-hero py-20 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Get in touch</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Tell us about your space.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Send us a few details — we'll respond within 24 hours with a tailored plan and quote.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl font-bold text-navy">Reach us directly</h2>
          <p className="mt-2 text-muted-foreground">
            Prefer to call or email? Our team is available 7 days a week.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-emerald-grad text-white"><Phone className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-navy">Phone</p>
                <p className="text-sm text-muted-foreground">0700 711 442</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-emerald-grad text-white"><Mail className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-navy">Email</p>
                <p className="text-sm text-muted-foreground">gleamguard3@gmail.com</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-emerald-grad text-white"><MapPin className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-navy">Office</p>
                <p className="text-sm text-muted-foreground">240 Elm St, Suite 400</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-emerald-grad text-white"><Clock className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold text-navy">Hours</p>
                <p className="text-sm text-muted-foreground">Mon–Sun · 7am – 8pm</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald" />
                <h3 className="mt-4 font-display text-2xl font-bold text-navy">Thank you!</h3>
                <p className="mt-2 text-muted-foreground">
                  We've received your request and will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <h2 className="font-display text-2xl font-bold text-navy">Request a free quote</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                  <SelectField label="Service" name="service" options={["Residential Cleaning", "Commercial Cleaning", "Pest Control", "Specialty Service"]} />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy">Tell us about your space</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-emerald focus:ring-2 focus:ring-emerald/20"
                    placeholder="Square footage, frequency, special requests…"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-emerald hover:shadow-glow"
                >
                  Send Request
                </button>
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to be contacted about your inquiry. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-navy">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-medium text-navy">{label}</label>
      <select
        name={name}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
