import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Heart, Minus, Plus, ShieldCheck, Package, Truck, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/site/ProductCard";
import { productQuery, productsQuery, reviewsQuery, STOCK_LABEL } from "@/lib/catalog";
import { img, inr } from "@/lib/images";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!p) throw notFound();
    await context.queryClient.ensureQueryData(productsQuery);
    return { name: p.name, description: p.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.name} — Carnival Celebrations` },
        { name: "description", content: loaderData.description ?? "" },
        { property: "og:title", content: loaderData.name },
        { property: "og:description", content: loaderData.description ?? "" },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => <div className="py-32 text-center"><h1 className="text-3xl text-primary">Gift not found</h1><Link to="/" className="mt-4 inline-block underline">Go home</Link></div>,
  component: ProductPage,
});

function Zoom({ src, alt }: { src: string; alt: string }) {
  const [pos, setPos] = useState<string | null>(null);
  return (
    <div
      className="relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl bg-muted"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`); }}
      onMouseLeave={() => setPos(null)}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover transition-transform duration-200" style={pos ? { transform: "scale(2)", transformOrigin: pos } : undefined} />
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(productQuery(slug));
  const { data: all } = useSuspenseQuery(productsQuery);
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [notify, setNotify] = useState("");
  if (!p) return null;
  const images = p.images?.length ? p.images : [null];
  const related = all.filter((x) => x.category_slug === p.category_slug && x.id !== p.id).slice(0, 4);
  const stockColor = p.stock === "in_stock" ? "text-success" : p.stock === "pre_order" ? "text-warning" : "text-destructive";

  const notifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("stock_alerts").insert({ product_id: p.id, email: notify });
    if (error) { toast.error("Please try again."); return; }
    toast.success("We'll email you when it's back!");
    setNotify("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/collections/$slug" params={{ slug: p.category_slug ?? "all" }} className="capitalize">{p.category_slug?.replace("-", " ")}</Link> / <span className="text-foreground">{p.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-3">
          <Zoom src={img(images[active])} alt={p.name} />
          <div className="flex gap-3">
            {images.map((im, k) => (
              <button key={k} onClick={() => setActive(k)} className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${k === active ? "border-primary" : "border-transparent"}`}>
                <img src={img(im)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl text-primary md:text-5xl">{p.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold">{inr(p.price)}</span>
            {p.mrp && p.mrp > p.price && <span className="text-muted-foreground line-through">MRP {inr(p.mrp)}</span>}
          </div>
          <p className="text-xs text-muted-foreground">incl. of all taxes</p>
          <p className={`mt-3 text-sm font-semibold ${stockColor}`}>● {STOCK_LABEL[p.stock]}</p>
          <p className="mt-5 leading-relaxed text-foreground/80">{p.description}</p>

          {p.stock === "out_of_stock" ? (
            <form onSubmit={notifyMe} className="mt-8 space-y-3 rounded-2xl bg-secondary p-5">
              <p className="font-semibold text-primary">Notify Me When Available</p>
              <div className="flex gap-2">
                <Input type="email" required placeholder="Your email" value={notify} onChange={(e) => setNotify(e.target.value)} className="bg-card" />
                <Button>Notify Me</Button>
              </div>
            </form>
          ) : (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-12 w-12 place-items-center" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-12 w-12 place-items-center" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <Button size="lg" className="flex-1" onClick={() => addToCart(p, qty)}>{p.stock === "pre_order" ? "Pre-order Now" : "Add to Cart"}</Button>
              <Button size="lg" variant="outline" onClick={() => toggleWishlist(p.id)} aria-label="Wishlist"><Heart className={wishlist.includes(p.id) ? "fill-primary" : ""} /></Button>
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 gap-3 border-y py-6 text-center text-xs font-semibold">
            {[[ShieldCheck, "Premium Quality"], [Package, "Secure Packaging"], [Truck, "Fast Delivery"]].map(([I, l]) => {
              const Icon = I as typeof Truck;
              return <div key={l as string} className="space-y-2"><Icon className="mx-auto h-6 w-6 text-accent" /><p>{l as string}</p></div>;
            })}
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-14">
        <TabsList className="no-scrollbar flex h-auto w-full justify-start overflow-x-auto bg-transparent p-0">
          {["details", "shipping", "info", "care", "reviews"].map((t) => (
            <TabsTrigger key={t} value={t} className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
              {{ details: "Details", shipping: "Shipping & Handling", info: "More Information", care: "Customer Care", reviews: "Reviews" }[t]}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="py-8 text-foreground/80">
          <TabsContent value="details">{p.description} Each gift is hand-packed in our signature keepsake packaging with a complimentary greeting card.</TabsContent>
          <TabsContent value="shipping">Dispatched within 24–48 hours. Delivery in 3–6 business days across India. Free shipping on orders above ₹1,999. Perishables are shipped in temperature-safe packaging.</TabsContent>
          <TabsContent value="info"><ul className="space-y-1"><li>Category: <span className="capitalize">{p.category_slug?.replace("-", " ")}</span></li><li>Occasions: {p.occasions?.join(", ")}</li><li>Country of origin: India</li></ul></TabsContent>
          <TabsContent value="care">Need help? Write to care@carnivalcelebrations.in or WhatsApp us, Mon–Sat, 10am–7pm IST.</TabsContent>
          <TabsContent value="reviews"><Reviews productId={p.id} /></TabsContent>
        </div>
      </Tabs>

      {related.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-6 text-3xl text-primary">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}

function Reviews({ productId }: { productId: string }) {
  const { data: reviews = [] } = useQuery(reviewsQuery(productId));
  const { session } = useStore();
  const qc = useQueryClient();
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return undefined;
    const author = (session.user.user_metadata?.['full_name'] as string) || session.user.email?.split("@")[0] || "Customer";
    const { error } = await supabase.from("reviews").insert({ product_id: productId, user_id: session.user.id, author, rating, body });
    if (error) { toast.error("Could not post review."); return; }
    setBody("");
    toast.success("Thanks for your review!");
    qc.invalidateQueries({ queryKey: ["reviews", productId] });
  };

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <p className="font-display text-4xl text-primary">{avg ? avg.toFixed(1) : "—"} <span className="text-base text-muted-foreground">/ 5 · {reviews.length} reviews</span></p>
        <div className="mt-6 space-y-5">
          {reviews.map((r) => (
            <div key={r.id} className="border-b pb-4">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`h-4 w-4 ${k < r.rating ? "fill-gold text-gold" : "text-border"}`} />)}</div>
              <p className="mt-1 font-semibold">{r.author}</p>
              <p className="text-sm">{r.body}</p>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-muted-foreground">Be the first to review this gift.</p>}
        </div>
      </div>
      {session ? (
        <form onSubmit={submit} className="space-y-3 rounded-2xl bg-secondary p-6">
          <p className="font-semibold text-primary">Write a review</p>
          <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}><Star className={`h-6 w-6 ${n <= rating ? "fill-gold text-gold" : "text-border"}`} /></button>)}</div>
          <Textarea required maxLength={1000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Share your experience" className="bg-card" />
          <Button>Submit Review</Button>
        </form>
      ) : (
        <div className="rounded-2xl bg-secondary p-6"><p><Link to="/auth" className="font-semibold text-primary underline">Sign in</Link> to write a review.</p></div>
      )}
    </div>
  );
}
