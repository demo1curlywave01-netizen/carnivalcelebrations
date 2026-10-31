import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { STOCK_LABEL } from "@/lib/catalog";
import { img, inr } from "@/lib/images";
import { useStore } from "@/lib/store";

export function ProductCard({ p }: { p: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const liked = wishlist.includes(p.id);
  const [a] = p.images ?? [];
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={img(a)} alt={p.name} loading="lazy" width={600} height={600} className="absolute inset-0 h-full w-full object-cover transition duration-500" />
        {p.stock !== "in_stock" && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${p.stock === "pre_order" ? "bg-gold text-accent-foreground" : "bg-foreground/80 text-background"}`}>
            {STOCK_LABEL[p.stock]}
          </span>
        )}
        {p.is_new && p.stock === "in_stock" && <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">New</span>}
      </Link>
      <button onClick={() => toggleWishlist(p.id)} aria-label="Toggle wishlist" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-primary shadow-soft transition hover:scale-110">
        <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
      </button>
      <div className="space-y-2 p-4">
        <Link to="/products/$slug" params={{ slug: p.slug }} className="line-clamp-1 font-display text-lg text-foreground hover:text-primary">{p.name}</Link>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-primary">{inr(p.price)}</span>
            {p.mrp && p.mrp > p.price && <span className="text-xs text-muted-foreground line-through">MRP {inr(p.mrp)}</span>}
          </div>
          <button
            disabled={p.stock === "out_of_stock"}
            onClick={() => addToCart(p)}
            aria-label="Add to cart"
            className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:opacity-30"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
