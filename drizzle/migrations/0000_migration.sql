create type public.app_role as enum ('admin','user');
create type public.stock_status as enum ('in_stock','pre_order','out_of_stock');

create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated; grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where user_id=_user_id and role=_role) $$;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "admin manage roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.categories (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, description text, image text, sort int default 0, created_at timestamptz default now());
grant select on public.categories to anon, authenticated; grant insert,update,delete on public.categories to authenticated; grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "public read cat" on public.categories for select using (true);
create policy "admin write cat" on public.categories for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.products (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, description text, category_slug text references public.categories(slug) on update cascade, occasions text[] default '{}', price int not null, mrp int, images text[] default '{}', stock stock_status not null default 'in_stock', is_new boolean default false, created_at timestamptz default now());
grant select on public.products to anon, authenticated; grant insert,update,delete on public.products to authenticated; grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "public read prod" on public.products for select using (true);
create policy "admin write prod" on public.products for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.banners (id uuid primary key default gen_random_uuid(), title text not null, subtitle text, image text, cta_label text, cta_link text, sort int default 0, active boolean default true);
grant select on public.banners to anon, authenticated; grant insert,update,delete on public.banners to authenticated; grant all on public.banners to service_role;
alter table public.banners enable row level security;
create policy "public read banners" on public.banners for select using (true);
create policy "admin write banners" on public.banners for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.reviews (id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade, user_id uuid not null, author text not null, rating int not null check (rating between 1 and 5), body text, created_at timestamptz default now());
grant select on public.reviews to anon, authenticated; grant insert,delete on public.reviews to authenticated; grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "public read reviews" on public.reviews for select using (true);
create policy "own insert review" on public.reviews for insert to authenticated with check (user_id = auth.uid());
create policy "own delete review" on public.reviews for delete to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));

create table public.wishlist (user_id uuid not null, product_id uuid not null references public.products(id) on delete cascade, created_at timestamptz default now(), primary key(user_id, product_id));
grant select,insert,delete on public.wishlist to authenticated; grant all on public.wishlist to service_role;
alter table public.wishlist enable row level security;
create policy "own wishlist" on public.wishlist for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.addresses (id uuid primary key default gen_random_uuid(), user_id uuid not null, full_name text not null, phone text not null, line1 text not null, line2 text, city text not null, state text not null, pincode text not null, created_at timestamptz default now());
grant select,insert,update,delete on public.addresses to authenticated; grant all on public.addresses to service_role;
alter table public.addresses enable row level security;
create policy "own addresses" on public.addresses for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.orders (id uuid primary key default gen_random_uuid(), order_number text unique not null default ('CC' || to_char(now(),'YYMMDD') || lpad((floor(random()*100000))::text,5,'0')), user_id uuid, email text not null, phone text not null, shipping_address jsonb not null, items jsonb not null, subtotal int not null, shipping int not null default 0, gift_wrap boolean default false, gift_message text, total int not null, payment_method text not null default 'cod', status text not null default 'placed', created_at timestamptz default now());
grant select,insert on public.orders to anon, authenticated; grant update on public.orders to authenticated; grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "anyone place order" on public.orders for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
create policy "own orders read" on public.orders for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "admin update orders" on public.orders for update to authenticated using (public.has_role(auth.uid(),'admin'));
create or replace function public.track_order(_order_number text, _phone text) returns table(order_number text, status text, total int, created_at timestamptz, items jsonb) language sql stable security definer set search_path=public as $$ select order_number,status,total,created_at,items from public.orders where order_number=upper(_order_number) and phone=_phone limit 1 $$;
grant execute on function public.track_order(text,text) to anon, authenticated;

create table public.enquiries (id uuid primary key default gen_random_uuid(), kind text not null, name text not null, email text, phone text, city text, company text, quantity text, message text, created_at timestamptz default now());
grant insert on public.enquiries to anon, authenticated; grant select on public.enquiries to authenticated; grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "anyone enquire" on public.enquiries for insert to anon, authenticated with check (true);
create policy "admin read enq" on public.enquiries for select to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.newsletter (id uuid primary key default gen_random_uuid(), email text unique not null, created_at timestamptz default now());
grant insert on public.newsletter to anon, authenticated; grant select on public.newsletter to authenticated; grant all on public.newsletter to service_role;
alter table public.newsletter enable row level security;
create policy "anyone subscribe" on public.newsletter for insert to anon, authenticated with check (true);
create policy "admin read news" on public.newsletter for select to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.stock_alerts (id uuid primary key default gen_random_uuid(), product_id uuid references public.products(id) on delete cascade, email text not null, created_at timestamptz default now());
grant insert on public.stock_alerts to anon, authenticated; grant select on public.stock_alerts to authenticated; grant all on public.stock_alerts to service_role;
alter table public.stock_alerts enable row level security;
create policy "anyone alert" on public.stock_alerts for insert to anon, authenticated with check (true);
create policy "admin read alerts" on public.stock_alerts for select to authenticated using (public.has_role(auth.uid(),'admin'));

-- first signed-up user becomes admin
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not exists (select 1 from public.user_roles where role='admin') then insert into public.user_roles(user_id, role) values (new.id,'admin'); end if;
  insert into public.user_roles(user_id, role) values (new.id,'user') on conflict do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

insert into public.categories (slug,name,description,image,sort) values
('dryfruit','Dryfruit','Hand-picked premium nuts & dried fruits','dryfruit',1),
('sweets','Sweets','Traditional mithai, crafted fresh','sweets',2),
('drinks','Drinks & Beverages','Teas, coffees & festive sips','drinks',3),
('snacks','Snack & Wafers','Gourmet savouries, wafers & namkeen','snacks',4),
('home-decor','Home Decor','Diyas, candles & keepsakes','home-decor',5),
('hampers','Hampers','Curated luxury gift hampers','hampers',6);

insert into public.banners (title,subtitle,image,cta_label,cta_link,sort) values
('Celebrate Every Moment','Luxury hampers for Diwali, weddings & beyond','hero-1','Shop Hampers','/collections/hampers',1),
('Corporate Gifting, Elevated','Bulk orders with custom branding across India','hero-2','Enquire Now','/corporate-gifting',2);

insert into public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) values
-- Dryfruit products (prices from screenshot)
('dryfruit-premium-tray','Premium Dryfruit Tray','Beautifully arranged assorted nuts & dry fruits on a decorative tray.','dryfruit','{Diwali,Festive,Corporate Gifts}',3800,4200,'{dry1,dry2}','in_stock',true),
('dryfruit-floral-basket','Floral Dryfruit Basket','Exquisite dryfruit arrangement with floral decor in a gift basket.','dryfruit','{Wedding,Festive}',3800,4200,'{dry2,dry3}','in_stock',true),
('dryfruit-decorative-box','Decorative Dryfruit Box','Premium assorted dryfruits in a hand-decorated gift box.','dryfruit','{Anniversary,Festive,Diwali}',3800,4200,'{dry3,dry4}','in_stock',false),
('dryfruit-assorted-tray-2','Assorted Dryfruit Arrangement','Cashews, almonds & pistachios arranged in a premium display tray.','dryfruit','{Corporate Gifts,Diwali}',2999,3499,'{dry4,dry1}','in_stock',false),
('dryfruit-grand-collection','Grand Dryfruit Collection','Luxurious multi-tier dryfruit arrangement for grand gifting occasions.','dryfruit','{Wedding,Diwali}',11000,12500,'{dry5,dry6}','in_stock',true),
('dryfruit-woven-basket','Woven Dryfruit Basket','Beautifully curated dryfruits in a woven decorative basket.','dryfruit','{Festive,Corporate Gifts}',3500,3900,'{dry6,dry7}','in_stock',false),
('dryfruit-mini-basket','Mini Dryfruit Gift Basket','Charming compact dryfruit basket perfect for return gifts.','dryfruit','{Wedding,Baby Celebrations}',2250,2500,'{dry7,dry1}','in_stock',true),
-- Sweet collection products (prices from screenshot)
('sweet-assorted-laddoo','Assorted Laddoo Box','Silver-leaf topped motichoor & besan laddoos in a premium box.','sweets','{Diwali,Festive,Wedding}',3250,3599,'{sweet1,sweet2}','in_stock',true),
('sweet-ladoo-premium','Premium Ladoo Collection','Assorted nut-filled ladoos in an elegant keepsake box.','sweets','{Diwali,Baby Celebrations}',3450,3799,'{sweet2,sweet3}','in_stock',true),
('sweet-kesar-box','Kesar Mithai Box','Saffron-infused assorted mithai in a decorative printed box.','sweets','{Anniversary,Wedding}',2899,3299,'{sweet3,sweet4}','in_stock',false),
('sweet-assorted-mithai','Assorted Mithai Gift Box','Kaju katli, motichoor and pista barfi — handcrafted 500g box.','sweets','{Diwali,Festive,Wedding}',2999,3299,'{sweet4,sweet5}','in_stock',true),
('sweet-meethi-box','Meethi Mithai Assortment','Curated premium mithai selection in a branded festive box.','sweets','{Diwali,Corporate Gifts}',2999,3299,'{sweet5,sweet6}','in_stock',false),
('sweet-kesar-luxury','Kesar Luxury Mithai Trunk','Kesar sweets with artisanal tins in a keepsake green trunk.','sweets','{Wedding,Diwali}',2999,3399,'{sweet6,sweet7}','in_stock',true),
('sweet-laddoo-box','Laddoo Gift Box','Melt-in-mouth laddoos with cashews in a premium festive box.','sweets','{Festive,Baby Celebrations}',1499,1699,'{sweet7,sweet8}','in_stock',false),
('sweet-mini-mithai','Mini Mithai Collection','Assorted small mithai pieces — perfect for return gifting.','sweets','{Wedding,Diwali}',1299,1499,'{sweet8,sweet1}','in_stock',true),
-- Hamper collection products (prices from screenshot)
('hamper-chocolate-delight','Chocolate Delight Hamper','Cadbury Dairy Milk, KitKat, Ferrero and more in a tulle gift wrap.','hampers','{Anniversary,Birthday,Festive}',1499,1799,'{hamper5,hamper4}','in_stock',true),
('hamper-snack-premium','Premium Snack Hamper','Coca-Cola, Pringles, 5Star, JimJam & Bubbly in a gift basket.','hampers','{Corporate Gifts,Festive}',1499,1799,'{hamper4,hamper3}','in_stock',true),
('hamper-nutties-basket','Nutties Snack Basket','Nutties, Butter Cookies, Bounty and more in a woven hamper.','hampers','{Corporate Gifts,Diwali}',3450,3899,'{hamper3,hamper2}','in_stock',false),
('hamper-diwali-special','Diwali Special Hamper','Himalayan Popcorn, Kerala Banana Chips & festive decor in a gold box.','hampers','{Diwali,Festive}',1850,2099,'{hamper2,hamper1}','in_stock',true),
('hamper-grand-luxury','Grand Luxury Gift Hamper','Premium snacks, nuts and beverages in a signature oval basket.','hampers','{Wedding,Corporate Gifts,Diwali}',2499,2899,'{hamper1,hamper5}','in_stock',false),
-- Drinks (keeping original with drinks image)
('masala-chai-set','Masala Chai Gift Set','Three artisanal chai blends with a kettle-stamped tin.','drinks','{Corporate Gifts,Festive}',699,799,'{drinks,hamper2}','in_stock',true),
('cold-brew-crate','Cold Brew Coffee Crate','Six bottles of single-origin cold brew.','drinks','{Corporate Gifts}',1299,1499,'{drinks,snacks}','in_stock',false),
('rose-sharbat-duo','Rose Sharbat Duo','Gulkand rose sharbat in hand-labelled bottles.','drinks','{Wedding,Baby Celebrations}',549,649,'{drinks,sweet1}','in_stock',true),
-- Home Decor (keeping original)
('brass-diya-set','Brass Diya Set','Set of five hand-cast brass diyas.','home-decor','{Diwali,Festive}',999,1199,'{home-decor,hampers}','in_stock',true),
('scented-candle-trio','Scented Candle Trio','Sandalwood, jasmine and oud soy candles.','home-decor','{Anniversary,Corporate Gifts}',1199,1399,'{home-decor,drinks}','in_stock',false),
('marble-urli-bowl','Marble Urli Bowl','Hand-carved marble urli for floating flowers.','home-decor','{Wedding,Festive}',1899,2199,'{home-decor,sweet3}','out_of_stock',false),
-- Snack & Wafers products (images from all 3 category folders per requirement)
('snack-wafer-choco-hamper','Chocolate & Wafer Gift Hamper','Chocolates, wafers and biscuits elegantly packed — from our hamper range.','snacks','{Diwali,Corporate Gifts,Festive}',1499,1699,'{snack-h1,snack-h2}','in_stock',true),
('snack-diwali-cracker-box','Diwali Cracker Snack Box','Himalayan popcorn, banana chips and festive namkeen in a gift box.','snacks','{Diwali,Festive}',1850,1999,'{snack-h2,snack-h3}','in_stock',true),
('snack-wafer-basket','Wafer & Cookie Basket','Nutties, Butter Cookies and Bounty wafers in a woven basket.','snacks','{Corporate Gifts,Wedding}',3450,3799,'{snack-h3,snack-h4}','in_stock',false),
('snack-luxury-oval','Luxury Snack Oval Hamper','Premium mixed snack hamper with beverages in a signature oval basket.','snacks','{Corporate Gifts,Diwali}',2499,2799,'{snack-h4,snack-h5}','in_stock',false),
('snack-mithai-mix','Mithai & Wafer Mix Box','Festive mithai with wafers and biscuits — a unique celebration gift.','snacks','{Diwali,Baby Celebrations,Festive}',1499,1699,'{snack-s1,snack-h1}','in_stock',true),
('snack-dryfruit-wafer','Dryfruit & Wafer Combo','Assorted dryfruits paired with premium wafers in a decorative tray.','snacks','{Wedding,Anniversary}',3800,4199,'{snack-d1,snack-d2}','in_stock',true),
('snack-nut-wafer-tray','Nut & Wafer Festive Tray','Salted nuts, wafers and gourmet snacks in a festive display tray.','snacks','{Diwali,Corporate Gifts}',3800,4199,'{snack-d2,snack-s1}','in_stock',false);