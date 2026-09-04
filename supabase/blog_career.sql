-- Blog posts table
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body text not null,
  cover_url text,
  category text not null default 'Travel Tips',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table blog_posts enable row level security;
create policy "Public read published" on blog_posts for select using (published = true);
create policy "Service role all" on blog_posts for all using (true);

-- Career openings table
create table if not exists career_openings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'Full-time',
  location text not null default 'Pune',
  department text not null default 'Operations',
  description text not null,
  requirements text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table career_openings enable row level security;
create policy "Public read published" on career_openings for select using (published = true);
create policy "Service role all" on career_openings for all using (true);
