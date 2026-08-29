-- Run this in the Supabase SQL editor once.

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_users_email_idx on public.admin_users (email);

alter table public.admin_users enable row level security;

-- No public policies: only the service role (admin API) can read/write admin_users.

-- Default admin email: yesr01164@gmail.com
-- After running this file, run: npm run seed:admin
