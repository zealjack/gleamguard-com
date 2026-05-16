import { Phone, Mail, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/254700711442?text=Hi%20GleamGuard%2C%20I%27m%20interested%20in%20your%20services.";
const PHONE_URL = "tel:+254700711442";
const EMAIL_URL = "mailto:gleamguard3@gmail.com?subject=Service%20Inquiry";

export function FloatingContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-lg md:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-around px-4 py-3">
        <a
          href={PHONE_URL}
          className="flex flex-col items-center gap-1 text-xs font-medium text-navy transition-smooth hover:text-emerald"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald/10 text-emerald">
            <Phone className="h-5 w-5" />
          </span>
          Call
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-xs font-medium text-navy transition-smooth hover:text-emerald"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald/10 text-emerald">
            <MessageCircle className="h-5 w-5" />
          </span>
          WhatsApp
        </a>
        <a
          href={EMAIL_URL}
          className="flex flex-col items-center gap-1 text-xs font-medium text-navy transition-smooth hover:text-emerald"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald/10 text-emerald">
            <Mail className="h-5 w-5" />
          </span>
          Email
        </a>
      </div>
    </div>
  );
}
