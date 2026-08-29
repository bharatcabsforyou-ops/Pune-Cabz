-- Run this in the Supabase SQL editor once.

create table if not exists public.popular_routes (
  id uuid primary key default gen_random_uuid(),
  from_city text not null,
  to_city text not null,
  duration text not null,
  from_price text not null,
  tag text not null default 'Popular',
  image_url text not null default '/image1.jpg',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists popular_routes_published_sort_idx
  on public.popular_routes (published, sort_order asc, created_at desc);

alter table public.popular_routes enable row level security;

drop policy if exists popular_routes_public_read_published on public.popular_routes;
create policy popular_routes_public_read_published
  on public.popular_routes
  for select
  to anon, authenticated
  using (published = true);
