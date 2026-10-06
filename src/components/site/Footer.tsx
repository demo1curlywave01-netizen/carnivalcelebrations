import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "./Logo";

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

export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="text-sm text-primary-foreground/70">Premium gifts for every celebration — handcrafted hampers, mithai, dryfruits and decor, delivered across India.</p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Youtube, Linkedin].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-lg text-accent">About</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/our-story">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/store-locations">Store Locations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg text-accent">Customer Service</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/returns">Returns & Shipping</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg text-accent">Gifting</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/corporate-gifting">Corporate Bulk Gifting</Link></li>
            <li><Link to="/wedding-gifting">Wedding Gifting</Link></li>
            <li><Link to="/bulk-purchase">Bulk Purchase</Link></li>
            <li><Link to="/become-a-partner">Become a Partner</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Carnival Celebrations. All rights reserved.</div>
    </footer>
  );
}
