-- ============================================================
-- Migration: Update catalog with real images & prices
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Rename "Snack & Waters" → "Snack & Wafers"
UPDATE public.categories
SET name = 'Snack & Wafers',
    description = 'Gourmet savouries, wafers & namkeen'
WHERE slug = 'snacks';

-- 2. Remove old placeholder products
DELETE FROM public.products;

-- 3. Insert new products with real images and prices from price screenshots

-- ── DRYFRUIT products (prices from dry_fruits screenshot) ──
INSERT INTO public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) VALUES
('dryfruit-premium-tray','Premium Dryfruit Tray','Beautifully arranged assorted nuts & dry fruits on a decorative tray.','dryfruit','{Diwali,Festive,Corporate Gifts}',3800,4200,'{dry1,dry2}','in_stock',true),
('dryfruit-floral-basket','Floral Dryfruit Basket','Exquisite dryfruit arrangement with floral decor in a gift basket.','dryfruit','{Wedding,Festive}',3800,4200,'{dry2,dry3}','in_stock',true),
('dryfruit-decorative-box','Decorative Dryfruit Box','Premium assorted dryfruits in a hand-decorated gift box.','dryfruit','{Anniversary,Festive,Diwali}',3800,4200,'{dry3,dry4}','in_stock',false),
('dryfruit-assorted-tray-2','Assorted Dryfruit Arrangement','Cashews, almonds & pistachios arranged in a premium display tray.','dryfruit','{Corporate Gifts,Diwali}',2999,3499,'{dry4,dry1}','in_stock',false),
('dryfruit-grand-collection','Grand Dryfruit Collection','Luxurious multi-tier dryfruit arrangement for grand gifting occasions.','dryfruit','{Wedding,Diwali}',11000,12500,'{dry5,dry6}','in_stock',true),
('dryfruit-woven-basket','Woven Dryfruit Basket','Beautifully curated dryfruits in a woven decorative basket.','dryfruit','{Festive,Corporate Gifts}',3500,3900,'{dry6,dry7}','in_stock',false),
('dryfruit-mini-basket','Mini Dryfruit Gift Basket','Charming compact dryfruit basket perfect for return gifts.','dryfruit','{Wedding,Baby Celebrations}',2250,2500,'{dry7,dry1}','in_stock',true);

-- ── SWEET collection products (prices from sweet_collection screenshot) ──
INSERT INTO public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) VALUES
('sweet-assorted-laddoo','Assorted Laddoo Box','Silver-leaf topped motichoor & besan laddoos in a premium box.','sweets','{Diwali,Festive,Wedding}',3250,3599,'{sweet1,sweet2}','in_stock',true),
('sweet-ladoo-premium','Premium Ladoo Collection','Assorted nut-filled ladoos in an elegant keepsake box.','sweets','{Diwali,Baby Celebrations}',3450,3799,'{sweet2,sweet3}','in_stock',true),
('sweet-kesar-box','Kesar Mithai Box','Saffron-infused assorted mithai in a decorative printed box.','sweets','{Anniversary,Wedding}',2899,3299,'{sweet3,sweet4}','in_stock',false),
('sweet-assorted-mithai','Assorted Mithai Gift Box','Kaju katli, motichoor and pista barfi — handcrafted 500g box.','sweets','{Diwali,Festive,Wedding}',2999,3299,'{sweet4,sweet5}','in_stock',true),
('sweet-meethi-box','Meethi Mithai Assortment','Curated premium mithai selection in a branded festive box.','sweets','{Diwali,Corporate Gifts}',2999,3299,'{sweet5,sweet6}','in_stock',false),
('sweet-kesar-luxury','Kesar Luxury Mithai Trunk','Kesar sweets with artisanal tins in a keepsake green trunk.','sweets','{Wedding,Diwali}',2999,3399,'{sweet6,sweet7}','in_stock',true),
('sweet-laddoo-box','Laddoo Gift Box','Melt-in-mouth laddoos with cashews in a premium festive box.','sweets','{Festive,Baby Celebrations}',1499,1699,'{sweet7,sweet8}','in_stock',false),
('sweet-mini-mithai','Mini Mithai Collection','Assorted small mithai pieces — perfect for return gifting.','sweets','{Wedding,Diwali}',1299,1499,'{sweet8,sweet1}','in_stock',true);

-- ── HAMPER collection products (prices from hamper_collection screenshot) ──
INSERT INTO public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) VALUES
('hamper-chocolate-delight','Chocolate Delight Hamper','Cadbury Dairy Milk, KitKat, Ferrero and more in a tulle gift wrap.','hampers','{Anniversary,Festive}',1499,1799,'{hamper5,hamper4}','in_stock',true),
('hamper-snack-premium','Premium Snack Hamper','Coca-Cola, Pringles, 5Star, JimJam & Bubbly in a gift basket.','hampers','{Corporate Gifts,Festive}',1499,1799,'{hamper4,hamper3}','in_stock',true),
('hamper-nutties-basket','Nutties Snack Basket','Nutties, Butter Cookies, Bounty and more in a woven hamper.','hampers','{Corporate Gifts,Diwali}',3450,3899,'{hamper3,hamper2}','in_stock',false),
('hamper-diwali-special','Diwali Special Hamper','Himalayan Popcorn, Kerala Banana Chips & festive decor in a gold box.','hampers','{Diwali,Festive}',1850,2099,'{hamper2,hamper1}','in_stock',true),
('hamper-grand-luxury','Grand Luxury Gift Hamper','Premium snacks, nuts and beverages in a signature oval basket.','hampers','{Wedding,Corporate Gifts,Diwali}',2499,2899,'{hamper1,hamper5}','in_stock',false);

-- ── DRINKS (keeping original) ──
INSERT INTO public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) VALUES
('masala-chai-set','Masala Chai Gift Set','Three artisanal chai blends with a kettle-stamped tin.','drinks','{Corporate Gifts,Festive}',699,799,'{drinks,hamper2}','in_stock',true),
('cold-brew-crate','Cold Brew Coffee Crate','Six bottles of single-origin cold brew.','drinks','{Corporate Gifts}',1299,1499,'{drinks,snacks}','in_stock',false),
('rose-sharbat-duo','Rose Sharbat Duo','Gulkand rose sharbat in hand-labelled bottles.','drinks','{Wedding,Baby Celebrations}',549,649,'{drinks,sweet1}','in_stock',true);

-- ── HOME DECOR (keeping original) ──
INSERT INTO public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) VALUES
('brass-diya-set','Brass Diya Set','Set of five hand-cast brass diyas.','home-decor','{Diwali,Festive}',999,1199,'{home-decor,hampers}','in_stock',true),
('scented-candle-trio','Scented Candle Trio','Sandalwood, jasmine and oud soy candles.','home-decor','{Anniversary,Corporate Gifts}',1199,1399,'{home-decor,drinks}','in_stock',false),
('marble-urli-bowl','Marble Urli Bowl','Hand-carved marble urli for floating flowers.','home-decor','{Wedding,Festive}',1899,2199,'{home-decor,sweet3}','out_of_stock',false);

-- ── SNACK & WAFERS products (images from ALL 3 category folders per requirement) ──
INSERT INTO public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) VALUES
('snack-wafer-choco-hamper','Chocolate & Wafer Gift Hamper','Chocolates, wafers and biscuits elegantly packed — from our hamper range.','snacks','{Diwali,Corporate Gifts,Festive}',1499,1699,'{snack-h1,snack-h2}','in_stock',true),
('snack-diwali-cracker-box','Diwali Cracker Snack Box','Himalayan popcorn, banana chips and festive namkeen in a gift box.','snacks','{Diwali,Festive}',1850,1999,'{snack-h2,snack-h3}','in_stock',true),
('snack-wafer-basket','Wafer & Cookie Basket','Nutties, Butter Cookies and Bounty wafers in a woven basket.','snacks','{Corporate Gifts,Wedding}',3450,3799,'{snack-h3,snack-h4}','in_stock',false),
('snack-luxury-oval','Luxury Snack Oval Hamper','Premium mixed snack hamper with beverages in a signature oval basket.','snacks','{Corporate Gifts,Diwali}',2499,2799,'{snack-h4,snack-h5}','in_stock',false),
('snack-mithai-mix','Mithai & Wafer Mix Box','Festive mithai with wafers and biscuits — a unique celebration gift.','snacks','{Diwali,Baby Celebrations,Festive}',1499,1699,'{snack-s1,snack-h1}','in_stock',true),
('snack-dryfruit-wafer','Dryfruit & Wafer Combo','Assorted dryfruits paired with premium wafers in a decorative tray.','snacks','{Wedding,Anniversary}',3800,4199,'{snack-d1,snack-d2}','in_stock',true),
('snack-nut-wafer-tray','Nut & Wafer Festive Tray','Salted nuts, wafers and gourmet snacks in a festive display tray.','snacks','{Diwali,Corporate Gifts}',3800,4199,'{snack-d2,snack-s1}','in_stock',false);

