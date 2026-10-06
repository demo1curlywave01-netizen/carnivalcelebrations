import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, Menu, Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
import { img, inr, OCCASIONS } from "@/lib/images";
import { useStore } from "@/lib/store";

const TOP = [
  { to: "/store-locations", label: "Store Locations" },
  { to: "/track-order", label: "Track Order" },
  { to: "/become-a-partner", label: "Become a Partner" },
  { to: "/bulk-purchase", label: "Bulk Purchase" },
] as const;

function SearchBox({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const { data: products = [] } = useQuery(productsQuery);
  const nav = useNavigate();
  const hits = q.length > 1 ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 150)}
        placeholder="Search hampers, sweets, dryfruits…"
        className="h-11 w-full rounded-full border border-input bg-muted pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-card"
      />
      {focus && hits.length > 0 && (
        <div className="absolute inset-x-0 top-12 z-50 overflow-hidden rounded-2xl bg-popover shadow-lift">
          {hits.map((p) => (
            <button key={p.id} onMouseDown={() => { nav({ to: "/products/$slug", params: { slug: p.slug } }); setQ(""); onDone?.(); }} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-secondary">
              <img src={img(p.images?.[0])} alt="" className="h-10 w-10 rounded-lg object-cover" />
              <span className="flex-1 text-sm">{p.name}</span>
              <span className="text-sm font-semibold text-primary">{inr(p.price)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { count, subtotal, wishlist, setCartOpen, session, isAdmin } = useStore();
  const { data: cats = [] } = useQuery(categoriesQuery);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
      <div className="hidden bg-primary text-xs text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span>Free shipping on orders above ₹1,999 ✦ Pan-India delivery</span>
          <nav className="flex gap-6">
            {TOP.map((t) => <Link key={t.to} to={t.to} className="hover:text-accent">{t.label}</Link>)}
          </nav>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button className="md:hidden" onClick={() => setMobile(true)} aria-label="Menu"><Menu className="h-6 w-6 text-primary" /></button>
        <Logo />
        <div className="mx-6 hidden flex-1 md:block"><SearchBox /></div>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link to={session ? "/account" : "/auth"} className="grid h-10 w-10 place-items-center rounded-full text-primary hover:bg-secondary" aria-label="Account"><User className="h-5 w-5" /></Link>
          <Link to="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-full text-primary hover:bg-secondary" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{wishlist.length}</span>}
          </Link>
          <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 rounded-full px-2 py-2 text-primary hover:bg-secondary">
            <span className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{count}</span>}
            </span>
            <span className="hidden text-sm font-semibold sm:inline">{inr(subtotal)}</span>
          </button>
        </div>
      </div>
      <nav className="hidden border-y border-border md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 text-sm font-medium">
          <div className="group relative py-3">
            <Link to="/collections/$slug" params={{ slug: "all" }} className="flex items-center gap-1 text-primary">Shop Gifts <ChevronDown className="h-4 w-4" /></Link>
            <div className="invisible absolute left-0 top-full z-50 grid w-[720px] grid-cols-[2fr_1fr] gap-6 rounded-b-2xl bg-popover p-6 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-3">
                {cats.map((c) => (
                  <Link key={c.id} to="/collections/$slug" params={{ slug: c.slug }} className="group/c text-center">
                    <img src={img(c.image)} alt="" className="mb-2 aspect-square w-full rounded-xl object-cover transition group-hover/c:scale-105" />
                    <span className="text-xs font-semibold">{c.name}</span>
                  </Link>
                ))}
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">BY OCCASION</p>
                <ul className="space-y-2">
                  {OCCASIONS.map((o) => <li key={o}><Link to="/collections/$slug" params={{ slug: "all" }} search={{ occasion: o }} className="hover:text-primary">{o}</Link></li>)}
                </ul>
              </div>
            </div>
          </div>
          {cats.slice(0, 4).map((c) => <Link key={c.id} to="/collections/$slug" params={{ slug: c.slug }} className="py-3 hover:text-primary" activeProps={{ className: "text-primary" }}>{c.name}</Link>)}
          <Link to="/wedding-gifting" className="py-3 hover:text-primary">Wedding</Link>
          <Link to="/corporate-gifting" className="py-3 hover:text-primary">Corporate</Link>
          {isAdmin && <Link to="/admin" className="ml-auto py-3 text-accent-foreground">Admin</Link>}
        </div>
      </nav>
      <div className="px-4 pb-3 md:hidden"><SearchBox /></div>

      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="overflow-y-auto">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="space-y-6 pt-4" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMobile(false); }}>
            <Logo />
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground">COLLECTIONS</p>
              {cats.map((c) => <Link key={c.id} to="/collections/$slug" params={{ slug: c.slug }} className="block py-2 font-medium">{c.name}</Link>)}
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground">GIFTING</p>
              <Link to="/wedding-gifting" className="block py-2">Wedding Gifting</Link>
              <Link to="/corporate-gifting" className="block py-2">Corporate Gifting</Link>
              {TOP.map((t) => <Link key={t.to} to={t.to} className="block py-2">{t.label}</Link>)}
              {isAdmin && <Link to="/admin" className="block py-2">Admin</Link>}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
