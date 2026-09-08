-- Run in Supabase SQL editor once (after tourism.sql).
-- Adds full tourist-place fields so admin Edit can save everything on the card.

alter table public.tourism_trips
  add column if not exists place_slug text,
  add column if not exists description text,
  add column if not exists why_cab text,
  add column if not exists from_pune text,
  add column if not exists from_mumbai text,
  add column if not exists stops text[];

create index if not exists tourism_trips_place_slug_idx
  on public.tourism_trips (place_slug)
  where place_slug is not null;
