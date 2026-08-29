-- Run this in the Supabase SQL editor once.

create table if not exists public.tourism_trips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text not null,
  trip_type text not null default 'Day trip',
  from_city text not null default 'Pune',
  image_url text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists tourism_trips_published_sort_idx
  on public.tourism_trips (published, sort_order asc, created_at desc);

alter table public.tourism_trips enable row level security;

drop policy if exists tourism_public_read_published on public.tourism_trips;
create policy tourism_public_read_published
  on public.tourism_trips
  for select
  to anon, authenticated
  using (published = true);
