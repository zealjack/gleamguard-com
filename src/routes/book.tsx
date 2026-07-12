import { createFileRoute } from "@tanstack/react-router";
import { useId, useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { CalendarCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Service — GleamGuard" },
      { name: "description", content: "Book a cleaning or pest-control service with GleamGuard. Pick a date and time — we'll confirm within a few hours." },
      { property: "og:title", content: "Book a Service — GleamGuard" },
      { property: "og:description", content: "Schedule your cleaning or pest-control visit online." },
    ],
  }),
  component: BookPage,
});

const SERVICES = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Move In / Move Out",
  "Pest Control",
  "Fumigation",
  "Specialty Service",
];

function BookPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);

    const payload = {
      full_name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim() || null,
      service: String(fd.get("service") || "").trim(),
      scheduled_date: String(fd.get("date") || ""),
      scheduled_time: String(fd.get("time") || ""),
      address: String(fd.get("address") || "").trim() || null,
      notes: String(fd.get("notes") || "").trim() || null,
    };

    if (!payload.full_name || !payload.email || !payload.service || !payload.scheduled_date || !payload.scheduled_time) {
      setStatus("error");
      setErrorMsg("Please complete all required fields.");
      return;
    }

    const { error } = await supabase.from("bookings").insert(payload);
    if (error) {
      setStatus("error");
      setErrorMsg(error.message || "Could not submit booking. Please try again.");
      return;
    }
    setStatus("success");
  }

  return (
    <SiteLayout>
      <section className="bg-hero py-20 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Book online</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            Schedule your service.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Pick a preferred date and time — our team will confirm within a few hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
          {status === "success" ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald" />
              <h3 className="mt-4 font-display text-2xl font-bold text-navy">Booking received!</h3>
              <p className="mt-2 text-muted-foreground">
                Thank you — we've logged your request and will confirm your appointment shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-grad text-white">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-bold text-navy">Book a Service</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <SelectField label="Service" name="service" options={SERVICES} required />
                <Field label="Preferred date" name="date" type="date" required />
                <Field label="Preferred time" name="time" type="time" required />
              </div>

              <Field label="Service address" name="address" />

              <div>
                <label htmlFor="book-notes" className="text-sm font-medium text-navy">Notes (optional)</label>
                <textarea
                  id="book-notes"
                  name="notes"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-emerald focus:ring-2 focus:ring-emerald/20"
                  placeholder="Access instructions, pets, special requests…"
                />
              </div>

              {status === "error" && errorMsg && (
                <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-emerald hover:shadow-glow disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting…" : "Confirm Booking"}
              </button>
              <p className="text-xs text-muted-foreground">
                You'll get a confirmation call or email. No payment required to book.
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy">{label}{required && <span className="text-emerald"> *</span>}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      />
    </div>
  );
}

function SelectField({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-navy">{label}{required && <span className="text-emerald"> *</span>}</label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-smooth focus:border-emerald focus:ring-2 focus:ring-emerald/20"
      >
        <option value="" disabled>Select a service…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
