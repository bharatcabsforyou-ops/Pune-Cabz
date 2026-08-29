-- Run once in Supabase SQL editor.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_status_created_idx
  on public.enquiries (status, created_at desc);

alter table public.enquiries enable row level security;

drop policy if exists enquiries_public_insert on public.enquiries;
create policy enquiries_public_insert
  on public.enquiries
  for insert
  to anon, authenticated
  with check (true);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  from_city text not null,
  to_city text not null,
  travel_date date not null,
  passengers integer not null default 1 check (passengers >= 1 and passengers <= 12),
  notes text,
  status text not null default 'new' check (status in ('new', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create index if not exists bookings_status_created_idx
  on public.bookings (status, created_at desc);

alter table public.bookings enable row level security;

drop policy if exists bookings_public_insert on public.bookings;
create policy bookings_public_insert
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);
