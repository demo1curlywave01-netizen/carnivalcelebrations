import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageShell";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
import { OCCASIONS } from "@/lib/images";

const search = z.object({
  occasion: z.string().optional(),
  max: z.number().optional(),
  stock: z.enum(["in_stock", "pre_order", "out_of_stock"]).optional(),
  sort: z.enum(["newest", "price-asc", "price-desc"]).optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/collections/$slug")({
  validateSearch: search,
  loader: async ({ context }) => {
    await Promise.all([context.queryClient.ensureQueryData(categoriesQuery), context.queryClient.ensureQueryData(productsQuery)]);
  },
  head: ({ params }) => {
    const name = params.slug === "all" ? "All Gifts" : params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      meta: [
        { title: `${name} — Carnival Celebrations` },
        { name: "description", content: `Shop ${name.toLowerCase()} from Carnival Celebrations. Premium gifting delivered across India.` },
        { property: "og:title", content: `${name} — Carnival Celebrations` },
        { property: "og:description", content: `Premium ${name.toLowerCase()} for every celebration.` },
      ],
    };
  },
  component: Collection,
});

const PER_PAGE = 12;

function Collection() {
  const { slug } = Route.useParams();
  const s = Route.useSearch();
  const nav = useNavigate({ from: Route.fullPath });
  const { data: cats } = useSuspenseQuery(categoriesQuery);
  const { data: all } = useSuspenseQuery(productsQuery);
  const cat = cats.find((c) => c.slug === slug);

  let list = all.filter((p) => slug === "all" || p.category_slug === slug);
  if (s.occasion) list = list.filter((p) => p.occasions?.includes(s.occasion!));
  if (s.max) list = list.filter((p) => p.price <= s.max!);
  if (s.stock) list = list.filter((p) => p.stock === s.stock);
  if (s.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (s.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  const page = s.page ?? 1;
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const set = (patch: Partial<z.infer<typeof search>>) => nav({ search: (prev) => ({ ...prev, ...patch, page: undefined }) });
  const chip = (active: boolean) => `rounded-full border px-3 py-1.5 text-sm transition ${active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`;

  return (
    <>
      <PageHero eyebrow="COLLECTION" title={cat?.name ?? "All Gifts"} subtitle={cat?.description ?? "Every gift in our collection, curated for celebration."} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">CATEGORY</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              <Link to="/collections/$slug" params={{ slug: "all" }} search={s} className={chip(slug === "all")}>All</Link>
              {cats.map((c) => <Link key={c.id} to="/collections/$slug" params={{ slug: c.slug }} search={s} className={chip(slug === c.slug)}>{c.name}</Link>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">OCCASION</p>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => <button key={o} onClick={() => set({ occasion: s.occasion === o ? undefined : o })} className={chip(s.occasion === o)}>{o}</button>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">PRICE</p>
            <div className="flex flex-wrap gap-2">
              {[499, 999, 1499, 2499, 4999].map((m) => <button key={m} onClick={() => set({ max: s.max === m ? undefined : m })} className={chip(s.max === m)}>Under ₹{m}</button>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">AVAILABILITY</p>
            <div className="flex flex-wrap gap-2">
              {([["in_stock", "In Stock"], ["pre_order", "Pre-order"], ["out_of_stock", "Out of Stock"]] as const).map(([k, l]) => (
                <button key={k} onClick={() => set({ stock: s.stock === k ? undefined : k })} className={chip(s.stock === k)}>{l}</button>
              ))}
            </div>
          </div>
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{list.length} products</p>
            <select value={s.sort ?? "newest"} onChange={(e) => set({ sort: e.target.value as "newest" })} className="h-10 rounded-full border bg-card px-4 text-sm">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          {shown.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No gifts match these filters.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{shown.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          )}
          {pages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, k) => (
                <button key={k} onClick={() => nav({ search: (prev) => ({ ...prev, page: k + 1 }) })} className={`h-10 w-10 rounded-full ${page === k + 1 ? "bg-primary text-primary-foreground" : "border"}`}>{k + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
