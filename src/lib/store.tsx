import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./catalog";

export type CartItem = { id: string; slug: string; name: string; price: number; image: string | null; qty: number };

type Store = {
  session: Session | null;
  isAdmin: boolean;
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  addToCart: (p: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
};

const Ctx = createContext<Store | null>(null);
const CART_KEY = "cc-cart";
const WISH_KEY = "cc-wish";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
      setWishlist(JSON.parse(localStorage.getItem(WISH_KEY) || "[]"));
    } catch {}
    setHydrated(true);
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated && !session) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); }, [wishlist, hydrated, session]);

  // Sync wishlist + admin role with the account when signed in
  useEffect(() => {
    const uid = session?.user.id;
    if (!uid) { setIsAdmin(false); return; }
    (async () => {
      const local: string[] = JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
      if (local.length) {
        await supabase.from("wishlist").upsert(local.map((product_id) => ({ user_id: uid, product_id })));
        localStorage.removeItem(WISH_KEY);
      }
      const { data } = await supabase.from("wishlist").select("product_id").eq("user_id", uid);
      setWishlist((data ?? []).map((r) => r.product_id));
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
    })();
  }, [session?.user.id]);

  const addToCart = useCallback((p: Product, qty = 1) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id: p.id, slug: p.slug, name: p.name, price: p.price, image: p.images?.[0] ?? null, qty }];
    });
    toast.success(`${p.name} added to cart`);
    setCartOpen(true);
  }, []);

  const toggleWishlist = useCallback(async (productId: string) => {
    const has = wishlist.includes(productId);
    setWishlist((w) => (has ? w.filter((x) => x !== productId) : [...w, productId]));
    const uid = session?.user.id;
    if (uid) {
      if (has) await supabase.from("wishlist").delete().eq("user_id", uid).eq("product_id", productId);
      else await supabase.from("wishlist").insert({ user_id: uid, product_id: productId });
    }
    toast(has ? "Removed from wishlist" : "Saved to wishlist");
  }, [wishlist, session?.user.id]);

  const value = useMemo<Store>(() => ({
    session, isAdmin, cart, cartOpen, setCartOpen, addToCart,
    setQty: (id, qty) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))),
    removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
    clearCart: () => setCart([]),
    subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
    count: cart.reduce((s, i) => s + i.qty, 0),
    wishlist, toggleWishlist,
  }), [session, isAdmin, cart, cartOpen, addToCart, wishlist, toggleWishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}
