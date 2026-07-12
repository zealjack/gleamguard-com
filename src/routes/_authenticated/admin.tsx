import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, RefreshCw, ArrowUpDown, Sparkles, Inbox, CalendarCheck } from "lucide-react";

type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
};

type Booking = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string | null;
  notes: string | null;
  status: string;
};

const LEAD_STATUSES = ["new", "contacted", "qualified", "closed"];
const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — GleamGuard" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"leads" | "bookings">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [email, setEmail] = useState<string>("");

  async function loadAll() {
    setLoading(true);
    const [{ data: l }, { data: b }, { data: u }] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("bookings").select("*").order("scheduled_date", { ascending: false }).order("scheduled_time", { ascending: false }),
      supabase.auth.getUser(),
    ]);
    setLeads((l as Lead[]) || []);
    setBookings((b as Booking[]) || []);
    setEmail(u.user?.email || "");
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  async function updateLeadStatus(id: string, status: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) loadAll();
  }
  async function updateBookingStatus(id: string, status: string) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) loadAll();
  }

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortDir === "asc" ? diff : -diff;
    });
  }, [leads, sortDir]);

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const at = new Date(`${a.scheduled_date}T${a.scheduled_time}`).getTime();
      const bt = new Date(`${b.scheduled_date}T${b.scheduled_time}`).getTime();
      return sortDir === "asc" ? at - bt : bt - at;
    });
  }, [bookings, sortDir]);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-hero shadow-soft">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-navy">GleamGuard Admin</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadAll}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-navy transition-smooth hover:border-emerald hover:text-emerald"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-emerald"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 border-b border-border">
          <TabButton active={tab === "leads"} onClick={() => setTab("leads")}>
            <Inbox className="h-4 w-4" /> Leads
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">{leads.length}</span>
          </TabButton>
          <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")}>
            <CalendarCheck className="h-4 w-4" /> Bookings
            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">{bookings.length}</span>
          </TabButton>
          <div className="ml-auto">
            <button
              onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-navy transition-smooth hover:border-emerald hover:text-emerald"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sortDir === "desc" ? "Newest first" : "Oldest first"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-border bg-background p-12 text-center text-muted-foreground">Loading…</div>
        ) : tab === "leads" ? (
          <LeadsTable leads={sortedLeads} onStatus={updateLeadStatus} />
        ) : (
          <BookingsTable bookings={sortedBookings} onStatus={updateBookingStatus} />
        )}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-smooth ${
        active ? "border-emerald text-emerald" : "border-transparent text-muted-foreground hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}

function StatusSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const color =
    value === "new" || value === "pending"
      ? "bg-gold/15 text-gold border-gold/30"
      : value === "contacted" || value === "confirmed"
      ? "bg-emerald/15 text-emerald border-emerald/30"
      : value === "qualified" || value === "completed"
      ? "bg-navy/10 text-navy border-navy/30"
      : "bg-muted text-muted-foreground border-border";
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none transition-smooth ${color}`}
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function LeadsTable({ leads, onStatus }: { leads: Lead[]; onStatus: (id: string, s: string) => void }) {
  if (leads.length === 0) {
    return <div className="rounded-2xl border border-border bg-background p-12 text-center text-muted-foreground">No leads yet.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <Th>Received</Th><Th>Name</Th><Th>Contact</Th><Th>Service</Th><Th>Message</Th><Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-t border-border align-top">
              <Td className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(l.created_at)}</Td>
              <Td className="font-medium text-navy">{l.full_name}</Td>
              <Td>
                <a href={`mailto:${l.email}`} className="block text-emerald hover:underline">{l.email}</a>
                {l.phone && <a href={`tel:${l.phone}`} className="block text-xs text-muted-foreground">{l.phone}</a>}
              </Td>
              <Td>{l.service || "—"}</Td>
              <Td className="max-w-md text-muted-foreground">{l.message}</Td>
              <Td><StatusSelect value={l.status} options={LEAD_STATUSES} onChange={(v) => onStatus(l.id, v)} /></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BookingsTable({ bookings, onStatus }: { bookings: Booking[]; onStatus: (id: string, s: string) => void }) {
  if (bookings.length === 0) {
    return <div className="rounded-2xl border border-border bg-background p-12 text-center text-muted-foreground">No bookings yet.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-background shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <Th>Scheduled</Th><Th>Name</Th><Th>Contact</Th><Th>Service</Th><Th>Address</Th><Th>Notes</Th><Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t border-border align-top">
              <Td className="whitespace-nowrap">
                <div className="font-medium text-navy">{b.scheduled_date}</div>
                <div className="text-xs text-muted-foreground">{b.scheduled_time}</div>
              </Td>
              <Td className="font-medium text-navy">{b.full_name}</Td>
              <Td>
                <a href={`mailto:${b.email}`} className="block text-emerald hover:underline">{b.email}</a>
                {b.phone && <a href={`tel:${b.phone}`} className="block text-xs text-muted-foreground">{b.phone}</a>}
              </Td>
              <Td>{b.service}</Td>
              <Td className="max-w-xs text-muted-foreground">{b.address || "—"}</Td>
              <Td className="max-w-xs text-muted-foreground">{b.notes || "—"}</Td>
              <Td><StatusSelect value={b.status} options={BOOKING_STATUSES} onChange={(v) => onStatus(b.id, v)} /></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-semibold">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}
