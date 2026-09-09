-- Admin OTP login (run once in Supabase SQL editor)

-- Allow email-only admin rows (password no longer required)
alter table public.admin_users
  alter column password_hash drop not null;

create table if not exists public.admin_otps (
  email text primary key,
  code_hash text not null,
  expires_at timestamptz not null,
  sent_at timestamptz not null default now(),
  attempts integer not null default 0
);

alter table public.admin_otps enable row level security;
-- No public policies: service role only
