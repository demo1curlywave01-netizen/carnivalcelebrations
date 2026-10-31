import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "./Logo";
import { WHATSAPP_NUMBER } from "@/lib/images";
import { STATIC_CATEGORIES } from "@/lib/catalog";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("newsletter").insert({ email: email.trim().toLowerCase() });
    if (error && !error.message.includes("duplicate")) { toast.error("Please try again."); return; }
    toast.success("You're on the list! Festive offers coming your way.");
    setEmail("");
  };
  return (
    <section className="bg-teal-gradient">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <h2 className="text-3xl text-accent-foreground md:text-4xl">Join the Celebration</h2>
          <p className="mt-2 text-accent-foreground/80">Early access to festive collections and members-only offers.</p>
        </div>
        <form onSubmit={submit} className="flex w-full max-w-md gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="h-12 flex-1 rounded-full bg-card px-5 text-sm outline-none" />
          <button className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-deep">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

const INSTAGRAM_URL = "https://www.instagram.com/carnival__celebrations?utm_source=qr&exln=azhyMjA1NjcwMTFo";

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="text-sm text-primary-foreground/70">Premium gifts for every celebration — handcrafted hampers, mithai, dryfruits and decor, delivered across India.</p>
          <div className="space-y-1.5 text-xs text-primary-foreground/80">
            <p>Email: <a href="mailto:carnivalcelebrationsordering@gmail.com" className="hover:text-accent underline underline-offset-2">carnivalcelebrationsordering@gmail.com</a></p>
            <p>Phone: <a href="tel:7303480801" className="hover:text-accent underline underline-offset-2">7303480801</a></p>
          </div>
          <div className="flex gap-3 pt-1">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-lg text-accent">Categories</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {STATIC_CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to="/collections/$slug" params={{ slug: c.slug }} className="hover:text-accent transition">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg text-accent">Customer Service</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/returns">Returns & Shipping</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg text-accent">Gifting</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/contact" search={{ type: "corporate-gifting" }} className="hover:text-accent transition">Corporate Bulk Gifting</Link></li>
            <li><Link to="/contact" search={{ type: "wedding-gifting" }} className="hover:text-accent transition">Wedding Gifting</Link></li>
            <li><Link to="/contact" search={{ type: "bulk-purchase" }} className="hover:text-accent transition">Bulk Purchase</Link></li>
            <li><Link to="/contact" search={{ type: "become-a-partner" }} className="hover:text-accent transition">Become a Partner</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Carnival Celebrations. All rights reserved.</div>
    </footer>
  );
}
