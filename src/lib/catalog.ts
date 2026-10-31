import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Banner = Database["public"]["Tables"]["banners"]["Row"];

// ─── HARDCODED CATALOG DATA ──────────────────────────────────────────────────
// Categories, products and banners are defined here with real images & prices.
// Supabase is only used for orders, reviews, auth, and wishlist.

export const STATIC_CATEGORIES: Category[] = [
  { id: "cat-1", slug: "dryfruit",   name: "Dry Fruits",      description: "Hand-picked premium nuts & dried fruits",    image: "dryfruit",   sort: 1, created_at: null },
  { id: "cat-2", slug: "sweets",     name: "Sweets",           description: "Traditional mithai, crafted fresh",          image: "sweets",     sort: 2, created_at: null },
  { id: "cat-3", slug: "drinks",     name: "Drinks & Beverages", description: "Teas, coffees & festive sips",             image: "drinks",     sort: 3, created_at: null },
  { id: "cat-4", slug: "snacks",     name: "Snack & Wafers",   description: "Gourmet savouries, wafers & namkeen",        image: "snacks",     sort: 4, created_at: null },
  { id: "cat-5", slug: "home-decor", name: "Home Decor",       description: "Diyas, candles & keepsakes",                 image: "home-decor", sort: 5, created_at: null },
  { id: "cat-6", slug: "hampers",    name: "Hampers",          description: "Curated luxury gift hampers",                image: "hampers",    sort: 6, created_at: null },
];

export const STATIC_BANNERS: Banner[] = [
  { id: "ban-1", title: "Celebrate Every Moment",       subtitle: "Luxury hampers for Diwali, weddings & beyond",           image: "hero-1", cta_label: "Shop Hampers", cta_link: "/collections/hampers",         sort: 1, active: true },
  { id: "ban-2", title: "Corporate Gifting, Elevated",  subtitle: "Bulk orders with custom branding across India",          image: "hero-2", cta_label: "Enquire Now",  cta_link: "/corporate-gifting",           sort: 2, active: true },
];

const p = (
  id: string, slug: string, name: string, description: string,
  category_slug: string, occasions: string[], price: number, mrp: number,
  images: string[], stock: "in_stock" | "pre_order" | "out_of_stock", is_new: boolean
): Product => ({
  id, slug, name, description, category_slug,
  occasions, price, mrp, images, stock, is_new,
  created_at: "2026-10-01T00:00:00Z",
});

export const STATIC_PRODUCTS: Product[] = [
  // ── DRY FRUITS (all 14 items from collection with exact prices from screenshot) ──
  p("df-1","dryfruit-green-peacock-thali", "Green Peacock Dryfruit Thali", "Artisan roasted pistachios & almonds in a decorative royal peacock thali.", "dryfruit", ["Diwali","Festive","Corporate Gifts"], 3800, 4200, ["dry1"], "in_stock", true),
  p("df-2","dryfruit-cashew-gold-thali",   "Cashew Royal Gold Thali",      "Premium whole cashews arranged elegantly in a golden floral thali.",        "dryfruit", ["Wedding","Festive"],                  3800, 4200, ["dry2"], "in_stock", true),
  p("df-3","dryfruit-almond-blue-thali",   "Almond Peacock Floral Thali",  "Finest Californian almonds beautifully decorated with royal blue motifs.", "dryfruit", ["Anniversary","Festive","Diwali"],     3800, 4200, ["dry3"], "in_stock", false),
  p("df-4","dryfruit-carriage-train",      "Royal Carriage Dryfruit Set",  "Exquisite train carriage design with handcrafted dryfruit jars.",          "dryfruit", ["Corporate Gifts","Diwali"],           2999, 3499, ["dry4"], "in_stock", false),
  p("df-5","dryfruit-grand-tower-blue",    "Grand Imperial Dryfruit Tower","Luxurious multi-tiered dryfruit display curated for grand celebrations.",   "dryfruit", ["Wedding","Diwali"],                  11000, 12500,["dry5"], "in_stock", true),
  p("df-6","dryfruit-handle-basket",       "Classic Dryfruit Gift Basket", "Artisanal handle basket filled with assorted premium nuts & dry fruits.",   "dryfruit", ["Festive","Corporate Gifts"],          3500, 3900, ["dry6"], "in_stock", false),
  p("df-7","dryfruit-ring-jar-display",    "Floral Ring Dryfruit Jars",    "Modern golden ring cage with dryfruit jars and floral accents.",           "dryfruit", ["Wedding","Baby Celebrations"],        2250, 2500, ["dry7"], "in_stock", true),
  p("df-8","dryfruit-golden-tier-basket",  "Golden Tier Dryfruit Display", "Multi-bowl golden tier arrangement with assorted nuts & pistachios.",      "dryfruit", ["Wedding","Festive"],                  7800, 8500, ["dry8"], "in_stock", true),
  p("df-9","dryfruit-pink-bloom-stand",    "Pink Bloom Luxury Dryfruit Stand", "Opulent tiered dryfruit stand adorned with delicate pink blooms.",     "dryfruit", ["Wedding","Diwali"],                  15000, 16999,["dry9"], "in_stock", false),
  p("df-10","dryfruit-luxe-hamper-tray",   "Luxe Celebration Dryfruit Hamper","Premium large hamper basket with selected nuts, dry fruits and florals.","dryfruit", ["Anniversary","Wedding"],              13800, 15500,["dry10"],"in_stock", true),
  p("df-11","dryfruit-swan-peacock-basket","Royal White Swan Dryfruit Basket","Magnificent swan & floral centerpiece with premium dry fruit bowls.",   "dryfruit", ["Wedding","Festive"],                 18000, 19999,["dry11"],"in_stock", false),
  p("df-12","dryfruit-gold-dome-display",  "Imperial Golden Dome Display", "Spectacular golden dome arrangement of assorted nuts & cashews.",         "dryfruit", ["Wedding","Corporate Gifts"],         18000, 19999,["dry12"],"in_stock", true),
  p("df-13","dryfruit-peacock-monarch",    "Monarch Peacock Dryfruit Masterpiece","Showstopping handcrafted peacock centerpiece on a tiered display.", "dryfruit", ["Wedding","Diwali"],                  22500, 25000,["dry13"],"in_stock", false),
  p("df-14","dryfruit-six-section-thali",  "Floral 6-Section Dryfruit Thali","Handcrafted woven thali with 6 curated compartments of fresh nuts.",     "dryfruit", ["Diwali","Festive"],                   3000, 3500, ["dry14"],"in_stock", true),

  // ── SWEETS (prices from screenshot) ──────────────────────────────────────
  p("sw-1","sweet-assorted-laddoo",  "Assorted Laddoo Box",         "Silver-leaf topped motichoor & besan laddoos in a premium box.",              "sweets", ["Diwali","Festive","Wedding"],         3250,3599, ["sweet1"], "in_stock", true),
  p("sw-2","sweet-ladoo-premium",    "Premium Ladoo Collection",    "Assorted nut-filled ladoos in an elegant keepsake box.",                      "sweets", ["Diwali","Baby Celebrations"],         3450,3799, ["sweet2"], "in_stock", true),
  p("sw-3","sweet-kesar-box",        "Kesar Mithai Box",            "Saffron-infused assorted mithai in a decorative printed box.",                "sweets", ["Anniversary","Wedding"],              2899,3299, ["sweet3"], "in_stock", false),
  p("sw-4","sweet-assorted-mithai",  "Assorted Mithai Gift Box",    "Kaju katli, motichoor and pista barfi — handcrafted 500g box.",               "sweets", ["Diwali","Festive","Wedding"],         2999,3299, ["sweet4"], "in_stock", true),
  p("sw-5","sweet-meethi-box",       "Meethi Mithai Assortment",    "Curated premium mithai selection in a branded festive box.",                  "sweets", ["Diwali","Corporate Gifts"],           2999,3299, ["sweet5"], "in_stock", false),
  p("sw-6","sweet-kesar-luxury",     "Kesar Luxury Mithai Trunk",   "Kesar sweets with artisanal tins in a keepsake green trunk.",                "sweets", ["Wedding","Diwali"],                   2999,3399, ["sweet6"], "in_stock", true),
  p("sw-7","sweet-laddoo-box",       "Laddoo Gift Box",             "Melt-in-mouth laddoos with cashews in a premium festive box.",               "sweets", ["Festive","Baby Celebrations"],         1499,1699, ["sweet7"], "in_stock", false),
  p("sw-8","sweet-mini-mithai",      "Mini Mithai Collection",      "Assorted small mithai pieces — perfect for return gifting.",                  "sweets", ["Wedding","Diwali"],                   1299,1499, ["sweet8"], "in_stock", true),

  // ── HAMPERS (prices from screenshot) ─────────────────────────────────────
  p("hm-1","hamper-chocolate-delight","Chocolate Delight Hamper",   "Cadbury Dairy Milk, KitKat, Ferrero and more in a tulle gift wrap.",         "hampers", ["Anniversary","Festive"],             1499,1799, ["hamper5"], "in_stock", true),
  p("hm-2","hamper-snack-premium",    "Premium Snack Hamper",       "Coca-Cola, Pringles, 5Star, JimJam & Bubbly in a gift basket.",              "hampers", ["Corporate Gifts","Festive"],          1499,1799, ["hamper4"], "in_stock", true),
  p("hm-3","hamper-nutties-basket",   "Nutties Snack Basket",       "Nutties, Butter Cookies, Bounty and more in a woven hamper.",               "hampers", ["Corporate Gifts","Diwali"],           3450,3899, ["hamper3"], "in_stock", false),
  p("hm-4","hamper-diwali-special",   "Diwali Special Hamper",      "Himalayan Popcorn, Kerala Banana Chips & festive decor in a gold box.",      "hampers", ["Diwali","Festive"],                   1850,2099, ["hamper2"], "in_stock", true),
  p("hm-5","hamper-grand-luxury",     "Grand Luxury Gift Hamper",   "Premium snacks, nuts and beverages in a signature oval basket.",             "hampers", ["Wedding","Corporate Gifts","Diwali"],  2499,2899, ["hamper1"], "in_stock", false),

  // ── DRINKS ────────────────────────────────────────────────────────────────
  p("dr-1","masala-chai-set",   "Masala Chai Gift Set",       "Three artisanal chai blends with a kettle-stamped tin.",                    "drinks", ["Corporate Gifts","Festive"],   699, 799,  ["drinks"], "in_stock", true),
  p("dr-2","cold-brew-crate",   "Cold Brew Coffee Crate",     "Six bottles of single-origin cold brew.",                                   "drinks", ["Corporate Gifts"],            1299,1499, ["drinks"], "in_stock", false),
  p("dr-3","rose-sharbat-duo",  "Rose Sharbat Duo",           "Gulkand rose sharbat in hand-labelled bottles.",                           "drinks", ["Wedding","Baby Celebrations"], 549, 649,  ["drinks"], "in_stock", true),

  // ── HOME DECOR ────────────────────────────────────────────────────────────
  p("hd-1","brass-diya-set",      "Brass Diya Set",        "Set of five hand-cast brass diyas.",                   "home-decor", ["Diwali","Festive"],            999, 1199, ["home-decor"], "in_stock",     true),
  p("hd-2","scented-candle-trio", "Scented Candle Trio",   "Sandalwood, jasmine and oud soy candles.",             "home-decor", ["Anniversary","Corporate Gifts"],1199,1399, ["home-decor"], "in_stock",     false),
  p("hd-3","marble-urli-bowl",    "Marble Urli Bowl",      "Hand-carved marble urli for floating flowers.",        "home-decor", ["Wedding","Festive"],           1899,2199, ["home-decor"], "out_of_stock", false),

  // ── SNACK & WAFERS — images from ALL 3 category folders ──────────────────
  p("sn-1","snack-wafer-choco-hamper","Chocolate & Wafer Gift Hamper","Chocolates, wafers and biscuits elegantly packed — from our hamper range.", "snacks", ["Diwali","Corporate Gifts","Festive"],  1499,1699, ["snack-h1"], "in_stock", true),
  p("sn-2","snack-diwali-cracker-box","Diwali Cracker Snack Box",    "Himalayan popcorn, banana chips and festive namkeen in a gift box.",         "snacks", ["Diwali","Festive"],                   1850,1999, ["snack-h2"], "in_stock", true),
  p("sn-3","snack-wafer-basket",      "Wafer & Cookie Basket",        "Nutties, Butter Cookies and Bounty wafers in a woven basket.",               "snacks", ["Corporate Gifts","Wedding"],          3450,3799, ["snack-h3"], "in_stock", false),
  p("sn-4","snack-luxury-oval",       "Luxury Snack Oval Hamper",     "Premium mixed snack hamper with beverages in a signature oval basket.",      "snacks", ["Corporate Gifts","Diwali"],           2499,2799, ["snack-h4"], "in_stock", false),
  p("sn-5","snack-mithai-mix",        "Mithai & Wafer Mix Box",       "Festive mithai with wafers and biscuits — a unique celebration gift.",       "snacks", ["Diwali","Baby Celebrations","Festive"],1499,1699, ["snack-s1"], "in_stock", true),
  p("sn-6","snack-dryfruit-wafer",    "Dryfruit & Wafer Combo",       "Assorted dryfruits paired with premium wafers in a decorative tray.",        "snacks", ["Wedding","Anniversary"],              3800,4199, ["snack-d1"], "in_stock", true),
  p("sn-7","snack-nut-wafer-tray",    "Nut & Wafer Festive Tray",     "Salted nuts, wafers and gourmet snacks in a festive display tray.",          "snacks", ["Diwali","Corporate Gifts"],           3800,4199, ["snack-d2"], "in_stock", false),
];

// ─── QUERY OPTIONS (use static data, skip Supabase for catalog) ──────────────

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => STATIC_CATEGORIES,
  staleTime: Infinity,
});

export const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: async () => STATIC_PRODUCTS,
  staleTime: Infinity,
});

export const bannersQuery = queryOptions({
  queryKey: ["banners"],
  queryFn: async () => STATIC_BANNERS,
  staleTime: Infinity,
});

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null,
    staleTime: Infinity,
  });

export const reviewsQuery = (productId: string) =>
  queryOptions({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const STOCK_LABEL = { in_stock: "In Stock", pre_order: "Pre-order", out_of_stock: "Out of Stock" } as const;
