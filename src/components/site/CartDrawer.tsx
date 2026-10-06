import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { img, inr } from "@/lib/images";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, subtotal } = useStore();
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader><SheetTitle className="font-display text-2xl text-primary">Your Cart</SheetTitle></SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          {cart.length === 0 && <p className="py-12 text-center text-muted-foreground">Your cart is empty.</p>}
          {cart.map((i) => (
            <div key={i.id} className="flex gap-3">
              <img src={img(i.image)} alt={i.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-primary">{inr(i.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full border"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center text-sm">{i.qty}</span>
                  <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full border"><Plus className="h-3 w-3" /></button>
                  <button onClick={() => removeFromCart(i.id)} className="ml-auto text-muted-foreground hover:text-destructive" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between font-semibold"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild onClick={() => setCartOpen(false)}><Link to="/cart">View Cart</Link></Button>
              <Button asChild onClick={() => setCartOpen(false)}><Link to="/checkout">Checkout</Link></Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
