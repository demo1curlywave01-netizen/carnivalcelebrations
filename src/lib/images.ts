import dryfruit from "@/assets/dryfruit.jpg";
import sweets from "@/assets/sweets.jpg";
import drinks from "@/assets/drinks.jpg";
import snacks from "@/assets/snacks.jpg";
import homeDecor from "@/assets/home-decor.jpg";
import hampers from "@/assets/hampers.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

// Hamper collection product images
import hamper1 from "@/assets/hamper1.jpg";
import hamper2 from "@/assets/hamper2.jpg";
import hamper3 from "@/assets/hamper3.jpg";
import hamper4 from "@/assets/hamper4.jpg";
import hamper5 from "@/assets/hamper5.jpg";

// Sweet collection product images
import sweet1 from "@/assets/sweet1.jpg";
import sweet2 from "@/assets/sweet2.jpg";
import sweet3 from "@/assets/sweet3.jpg";
import sweet4 from "@/assets/sweet4.jpg";
import sweet5 from "@/assets/sweet5.jpg";
import sweet6 from "@/assets/sweet6.jpg";
import sweet7 from "@/assets/sweet7.jpg";
import sweet8 from "@/assets/sweet8.jpg";

// Dry fruits product images
import dry1 from "@/assets/dry1.jpg";
import dry2 from "@/assets/dry2.jpg";
import dry3 from "@/assets/dry3.jpg";
import dry4 from "@/assets/dry4.jpg";
import dry5 from "@/assets/dry5.jpg";
import dry6 from "@/assets/dry6.jpg";
import dry7 from "@/assets/dry7.jpg";
import dry8 from "@/assets/dry8.jpg";
import dry9 from "@/assets/dry9.jpg";
import dry10 from "@/assets/dry10.jpg";
import dry11 from "@/assets/dry11.jpg";
import dry12 from "@/assets/dry12.jpg";
import dry13 from "@/assets/dry13.jpg";
import dry14 from "@/assets/dry14.jpg";

// Snack & Wafers product images (mix from all 3 categories)
import snackH1 from "@/assets/snack-h1.jpg";
import snackH2 from "@/assets/snack-h2.jpg";
import snackH3 from "@/assets/snack-h3.jpg";
import snackH4 from "@/assets/snack-h4.jpg";
import snackH5 from "@/assets/snack-h5.jpg";
import snackS1 from "@/assets/snack-s1.jpg";
import snackD1 from "@/assets/snack-d1.jpg";
import snackD2 from "@/assets/snack-d2.jpg";

const map: Record<string, string> = {
  dryfruit,
  sweets,
  drinks,
  snacks,
  "home-decor": homeDecor,
  hampers,
  "hero-1": hero1,
  "hero-2": hero2,
  // Hamper products
  hamper1, hamper2, hamper3, hamper4, hamper5,
  // Sweet products
  sweet1, sweet2, sweet3, sweet4, sweet5, sweet6, sweet7, sweet8,
  // Dryfruit products
  dry1, dry2, dry3, dry4, dry5, dry6, dry7, dry8, dry9, dry10, dry11, dry12, dry13, dry14,
  // Snack & Wafers products (mixed from all 3 category folders)
  "snack-h1": snackH1,
  "snack-h2": snackH2,
  "snack-h3": snackH3,
  "snack-h4": snackH4,
  "snack-h5": snackH5,
  "snack-s1": snackS1,
  "snack-d1": snackD1,
  "snack-d2": snackD2,
};

/** Resolve a stored image key (seed data) or a full URL (admin uploads). */
export function img(key?: string | null) {
  if (!key) return hampers;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return map[key] ?? hampers;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const OCCASIONS = ["Diwali", "Festive", "Wedding", "Anniversary", "Baby Celebrations", "Corporate Gifts"];
export const WHATSAPP_NUMBER = "917303480801";
