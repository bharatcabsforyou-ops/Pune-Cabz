-- Run this in the Supabase SQL editor once.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  route text,
  body text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

drop policy if exists reviews_public_read_approved on public.reviews;
create policy reviews_public_read_approved
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved');

drop policy if exists reviews_public_insert_pending on public.reviews;
create policy reviews_public_insert_pending
  on public.reviews
  for insert
  to anon, authenticated
  with check (status = 'pending');
