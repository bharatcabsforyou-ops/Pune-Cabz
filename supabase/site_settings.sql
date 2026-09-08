-- Site-wide contact settings (single row). Run in Supabase SQL editor.
create table if not exists public.site_settings (
  id text primary key default 'main',
  phone text not null,
  email text not null,
  whatsapp text not null,
  instagram text not null default '',
  address text not null default '',
  address_line text not null default '',
  city text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, phone, email, whatsapp, instagram, address, address_line, city)
values (
  'main',
  '+91 95959 33899',
  'punecabz@gmail.com',
  '919595933899',
  'https://www.instagram.com/punecabz',
  'Koregaon Park, Pune',
  'Lane 7, North Main Road, Koregaon Park',
  'Pune, Maharashtra 411001'
)
on conflict (id) do nothing;
