import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { productsQuery } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Carnival Celebrations" },
      { name: "description", content: "Your saved gifts and hampers at Carnival Celebrations." },
      { property: "og:title", content: "Your Wishlist — Carnival Celebrations" },
      { property: "og:description", content: "Your saved gifts and hampers at Carnival Celebrations." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, addToCart } = useStore();
  const { data: allProducts = [] } = useQuery(productsQuery);

  const items = allProducts.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    items.forEach((p) => {
      if (p.stock !== "out_of_stock") {
        addToCart(p, 1);
      }
    });
  };

  return (
    <>
      <PageHero
        eyebrow="SAVED FOR LATER"
        title="Your Wishlist"
        subtitle={
          items.length > 0
            ? `You have saved ${items.length} festive gift${items.length === 1 ? "" : "s"}.`
            : "Keep track of your favorite gifts, dryfruit boxes, and luxury hampers."
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border bg-card p-10 text-center shadow-soft">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
              <Heart className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h2 className="font-display text-2xl text-primary">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore our exquisite collection of festive hampers, sweets, and gourmet treats to add your favorites.
            </p>
            <div className="mt-8">
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/collections/$slug" params={{ slug: "all" }}>
                  Explore Gifts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{items.length}</span> item
                {items.length === 1 ? "" : "s"}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAddAllToCart}
                  className="rounded-full bg-primary hover:bg-primary-deep"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Add All to Cart
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link to="/collections/$slug" params={{ slug: "all" }}>
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
