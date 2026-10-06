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
('snacks','Snack & Waters','Gourmet savouries & namkeen','snacks',4),
('home-decor','Home Decor','Diyas, candles & keepsakes','home-decor',5),
('hampers','Hampers','Curated luxury gift hampers','hampers',6);

insert into public.banners (title,subtitle,image,cta_label,cta_link,sort) values
('Celebrate Every Moment','Luxury hampers for Diwali, weddings & beyond','hero-1','Shop Hampers','/collections/hampers',1),
('Corporate Gifting, Elevated','Bulk orders with custom branding across India','hero-2','Enquire Now','/corporate-gifting',2);

insert into public.products (slug,name,description,category_slug,occasions,price,mrp,images,stock,is_new) values
('royal-dryfruit-box','Royal Dryfruit Box','Almonds, cashews, pistachios and raisins in a velvet-lined keepsake box.','dryfruit','{Diwali,Festive,Corporate Gifts}',1499,1799,'{dryfruit,hampers}','in_stock',true),
('kesar-badam-tray','Kesar Badam Tray','Saffron-roasted Californian almonds on a brass-finish tray.','dryfruit','{Wedding,Festive}',1199,1399,'{dryfruit,sweets}','in_stock',false),
('pistachio-jar-duo','Pistachio Jar Duo','Two glass jars of salted Iranian pistachios.','dryfruit','{Anniversary,Festive}',899,999,'{dryfruit,snacks}','pre_order',true),
('assorted-mithai-box','Assorted Mithai Box','Kaju katli, motichoor and pista barfi — 500g.','sweets','{Diwali,Festive,Wedding}',799,899,'{sweets,hampers}','in_stock',true),
('kaju-katli-silver','Kaju Katli Silver Leaf','Classic kaju katli finished with edible silver.','sweets','{Diwali,Baby Celebrations}',649,749,'{sweets,dryfruit}','in_stock',false),
('baklava-collection','Baklava Collection','Twelve hand-layered baklava pieces.','sweets','{Anniversary,Wedding}',1099,1299,'{sweets,snacks}','out_of_stock',false),
('masala-chai-set','Masala Chai Gift Set','Three artisanal chai blends with a kettle-stamped tin.','drinks','{Corporate Gifts,Festive}',699,799,'{drinks,hampers}','in_stock',true),
('cold-brew-crate','Cold Brew Coffee Crate','Six bottles of single-origin cold brew.','drinks','{Corporate Gifts}',1299,1499,'{drinks,snacks}','in_stock',false),
('rose-sharbat-duo','Rose Sharbat Duo','Gulkand rose sharbat in hand-labelled bottles.','drinks','{Wedding,Baby Celebrations}',549,649,'{drinks,sweets}','in_stock',true),
('gourmet-namkeen-trio','Gourmet Namkeen Trio','Three jars of small-batch namkeen.','snacks','{Diwali,Corporate Gifts}',599,699,'{snacks,dryfruit}','in_stock',true),
('mineral-water-gift-pack','Premium Water Gift Pack','Glass-bottled Himalayan mineral water, 6 pack.','snacks','{Wedding,Corporate Gifts}',499,549,'{snacks,drinks}','in_stock',false),
('trail-mix-hamper','Trail Mix Basket','Seeds, berries and roasted nuts in a woven basket.','snacks','{Festive}',849,949,'{snacks,hampers}','pre_order',false),
('brass-diya-set','Brass Diya Set','Set of five hand-cast brass diyas.','home-decor','{Diwali,Festive}',999,1199,'{home-decor,hampers}','in_stock',true),
('scented-candle-trio','Scented Candle Trio','Sandalwood, jasmine and oud soy candles.','home-decor','{Anniversary,Corporate Gifts}',1199,1399,'{home-decor,drinks}','in_stock',false),
('marble-urli-bowl','Marble Urli Bowl','Hand-carved marble urli for floating flowers.','home-decor','{Wedding,Festive}',1899,2199,'{home-decor,sweets}','out_of_stock',false),
('grand-celebration-hamper','Grand Celebration Hamper','Dryfruits, mithai, candles and chai in a teal keepsake trunk.','hampers','{Diwali,Wedding,Corporate Gifts}',3499,3999,'{hampers,dryfruit}','in_stock',true),
('little-joy-hamper','Little Joy Hamper','A sweet welcome hamper for new arrivals.','hampers','{Baby Celebrations}',1799,1999,'{hampers,sweets}','in_stock',true),
('anniversary-luxe-box','Anniversary Luxe Box','Chocolates, candles and rose sharbat for two.','hampers','{Anniversary}',2499,2899,'{hampers,home-decor}','in_stock',false);