import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-hero shadow-soft">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-navy">
            Gleam<span className="text-emerald">Guard</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-smooth hover:text-navy"
              activeProps={{ className: "text-navy font-semibold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/contact"
            className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-smooth hover:border-emerald hover:text-emerald"
          >
            Get a Free Quote
          </Link>
          <Link
            to="/book"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:bg-emerald hover:shadow-glow"
          >
            Book a Service
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-navy/20 px-5 py-3 text-center text-sm font-semibold text-navy"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="rounded-full bg-navy px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Book a Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
