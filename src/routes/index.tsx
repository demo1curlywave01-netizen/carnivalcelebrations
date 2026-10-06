import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { Newsletter } from "@/components/site/Footer";
import { bannersQuery, categoriesQuery, productsQuery } from "@/lib/catalog";
import { img, inr } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carnival Celebrations — Luxury Gift Hampers & Festive Gifting" },
      { name: "description", content: "Shop premium hampers, dryfruits, mithai, beverages and home decor. Corporate, wedding and festive gifting across India." },
      { property: "og:title", content: "Carnival Celebrations — Luxury Gift Hampers" },
      { property: "og:description", content: "Premium hampers and festive gifts for Diwali, weddings and corporate gifting." },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(bannersQuery),
      context.queryClient.ensureQueryData(categoriesQuery),
      context.queryClient.ensureQueryData(productsQuery),
    ]),
  component: Home,
});

function Hero() {
  const { data: banners } = useSuspenseQuery(bannersQuery);
  const [i, setI] = useState(0);
  const n = banners.length || 1;
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % n), 5500); return () => clearInterval(t); }, [n]);
  return (
    <section className="relative h-[480px] overflow-hidden md:h-[600px]">
      {banners.map((b, idx) => (
        <div key={b.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <img src={img(b.image)} alt={b.title} width={1920} height={912} className="absolute inset-0 h-full w-full object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/85 via-primary-deep/40 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 text-primary-foreground">
            <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-accent">✦ CARNIVAL CELEBRATIONS</p>
            <h1 className="max-w-xl text-5xl leading-[1.05] md:text-7xl">{b.title}</h1>
            <p className="mt-5 max-w-md text-lg text-primary-foreground/85">{b.subtitle}</p>
            {b.cta_link && <Button variant="hero" size="lg" className="mt-8 w-fit" asChild><a href={b.cta_link}>{b.cta_label}</a></Button>}
          </div>
        </div>
      ))}
      <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous" className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/20 text-primary-foreground backdrop-blur hover:bg-card/40"><ChevronLeft /></button>
      <button onClick={() => setI((i + 1) % n)} aria-label="Next" className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-card/20 text-primary-foreground backdrop-blur hover:bg-card/40"><ChevronRight /></button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((b, idx) => <button key={b.id} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-2 bg-primary-foreground/60"}`} />)}
      </div>
    </section>
  );
}

function Marquee() {
  const text = "CORPORATE BULK GIFTING ✦ WEDDING GIFTS ✦ RETURN GIFTS ✦ FESTIVE HAMPERS ✦ ";
  return (
    <div className="overflow-hidden bg-accent py-3 text-accent-foreground">
      <div className="flex w-max animate-marquee whitespace-nowrap font-display text-lg tracking-wide">
        {Array.from({ length: 8 }).map((_, k) => <span key={k} className="px-2">{text}</span>)}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-accent-foreground/60">{eyebrow}</p>
        <h2 className="text-3xl text-primary md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

const PRICES = [499, 999, 1499, 2499];
const REELS = [
  { t: "Unboxing the Grand Hamper", k: "hampers" },
  { t: "Diwali Diya Styling", k: "home-decor" },
  { t: "Fresh Mithai, Made Daily", k: "sweets" },
  { t: "Corporate Gift Packing", k: "hero-2" },
  { t: "Chai Ritual Set", k: "drinks" },
  { t: "The Dryfruit Edit", k: "dryfruit" },
];

function Home() {
  const { data: cats } = useSuspenseQuery(categoriesQuery);
  const { data: products } = useSuspenseQuery(productsQuery);
  const counts = (slug: string) => products.filter((p) => p.category_slug === slug).length;
  const minPrice = Math.min(...products.map((p) => p.price));

  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle eyebrow="CURATED FOR YOU" title="Gifting Collections" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => (
            <Link key={c.id} to="/collections/$slug" params={{ slug: c.slug }} className="group overflow-hidden rounded-2xl bg-card shadow-soft">
              <div className="aspect-[4/5] overflow-hidden"><img src={img(c.image)} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /></div>
              <div className="p-3 text-center">
                <p className="font-display text-lg text-primary">{c.name}</p>
                <p className="text-xs text-muted-foreground">{counts(c.slug)} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionTitle eyebrow={`STARTING FROM ${inr(minPrice)}`} title="Shop Gifts by Price" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PRICES.map((p, k) => (
              <Link key={p} to="/collections/$slug" params={{ slug: "all" }} search={{ max: p }} className={`group rounded-3xl p-8 text-center transition hover:-translate-y-1 hover:shadow-lift ${k % 2 ? "bg-festive text-primary-foreground" : "bg-card text-primary shadow-soft"}`}>
                <p className="text-xs font-semibold tracking-[0.3em] opacity-70">UNDER</p>
                <p className="font-display text-4xl md:text-5xl">{inr(p)}</p>
                <p className="mt-3 text-sm underline-offset-4 group-hover:underline">Shop now →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle eyebrow="JUST IN" title="New Arrivals" action={<Button variant="outline" asChild><Link to="/collections/$slug" params={{ slug: "all" }}>View all</Link></Button>} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.filter((p) => p.is_new).slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="bg-primary-deep py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-accent">WATCH & SHOP</p>
          <h2 className="mb-8 text-3xl md:text-4xl">Shop by Reels</h2>
          <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
            {REELS.map((r) => (
              <div key={r.t} className="group relative aspect-[9/16] w-52 shrink-0 snap-start overflow-hidden rounded-2xl">
                <img src={img(r.k)} alt={r.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground"><Play className="h-5 w-5 fill-current" /></span>
                <p className="absolute bottom-4 left-4 right-4 font-display text-lg">{r.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <Newsletter />
    </>
  );
}
