import { Link } from "@tanstack/react-router";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-grad">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="font-display text-xl font-bold">
              Gleam<span className="text-gold">Guard</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            Premium eco-friendly cleaning and pest control services for homes and businesses.
            Trusted, certified, and committed to a healthier environment.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald" /> 0700 711 442</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald" /> gleamguard3@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald" /> 240 Elm St, Suite 400</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} GleamGuard. All rights reserved.</p>
          <p>Licensed · Insured · EcoCert Certified</p>
        </div>
      </div>
    </footer>
  );
}
