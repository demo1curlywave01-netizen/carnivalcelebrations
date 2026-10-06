import dryfruit from "@/assets/dryfruit.jpg";
import sweets from "@/assets/sweets.jpg";
import drinks from "@/assets/drinks.jpg";
import snacks from "@/assets/snacks.jpg";
import homeDecor from "@/assets/home-decor.jpg";
import hampers from "@/assets/hampers.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const map: Record<string, string> = {
  dryfruit,
  sweets,
  drinks,
  snacks,
  "home-decor": homeDecor,
  hampers,
  "hero-1": hero1,
  "hero-2": hero2,
};

/** Resolve a stored image key (seed data) or a full URL (admin uploads). */
export function img(key?: string | null) {
  if (!key) return hampers;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return map[key] ?? hampers;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const OCCASIONS = ["Diwali", "Festive", "Wedding", "Anniversary", "Baby Celebrations", "Corporate Gifts"];
export const WHATSAPP_NUMBER = "919999999999";
