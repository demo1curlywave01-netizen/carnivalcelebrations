import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATSAPP_NUMBER } from "@/lib/images";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", city: "", req: "Wedding Gifts" });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Carnival Celebrations! I'm ${f.name} from ${f.city}. I'm interested in: ${f.req}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <form onSubmit={send} className="mb-3 w-72 space-y-3 rounded-2xl bg-card p-5 shadow-lift">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-primary">How can we help?</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close"><X className="h-4 w-4" /></button>
          </div>
          <Input required placeholder="Full Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Input required placeholder="City" value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} />
          <select value={f.req} onChange={(e) => setF({ ...f, req: e.target.value })} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
            {["Wedding Gifts", "Corporate Gifts", "Franchise", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <Button type="submit" variant="accent" className="w-full">Chat on WhatsApp</Button>
        </form>
      )}
      <button onClick={() => setOpen(!open)} className="ml-auto flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground shadow-lift">
        <MessageCircle className="h-5 w-5" /> Need Help? Chat
      </button>
    </div>
  );
}
