-- Editable website page copy (per page + locale). Run in Supabase SQL editor.
create table if not exists public.site_content (
  page_id text not null,
  locale text not null check (locale in ('en','hi','mr')),
  fields jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (page_id, locale)
);
