-- Blog posts + career openings (run in Supabase SQL editor)
-- Safe to re-run: uses IF NOT EXISTS / exception handlers / WHERE NOT EXISTS.

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

do $$ begin
  create policy "Public read published" on blog_posts for select using (published = true);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "Service role all" on blog_posts for all using (true);
exception when duplicate_object then null;
end $$;

create table if not exists career_openings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'Full-time',
  location text not null default 'Pune',
  department text not null default 'Operations',
  description text not null,
  responsibilities text,
  requirements text,
  benefits text,
  experience text,
  salary text,
  image_url text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Extra JD columns for tables created before this update
alter table career_openings add column if not exists responsibilities text;
alter table career_openings add column if not exists benefits text;
alter table career_openings add column if not exists experience text;
alter table career_openings add column if not exists salary text;
alter table career_openings add column if not exists image_url text;

alter table career_openings enable row level security;

do $$ begin
  create policy "Public read published" on career_openings for select using (published = true);
exception when duplicate_object then null;
end $$;

do $$ begin
  create policy "Service role all" on career_openings for all using (true);
exception when duplicate_object then null;
end $$;

-- Sample blog
insert into blog_posts (title, slug, excerpt, body, cover_url, category, published, sort_order, created_at)
select
  'Pune to Mumbai by Cab: Complete Travel Guide 2025',
  'pune-to-mumbai',
  'Everything you need to know — best time to leave, route options, fares, expressway tips, and what to expect on the road from Pune to Mumbai.',
  E'## Route Overview\nThe Pune–Mumbai corridor is one of the busiest intercity routes in Maharashtra, covering approximately 150 km via the Mumbai–Pune Expressway (NH48).\n\n## Best Time to Leave Pune\n**Early morning (5 am – 7 am):** The best window.\n\n**Evening (4 pm – 8 pm):** The worst window on Fridays and Sundays.\n\n## Cab Fares\n- **Sedan:** approx. ₹1,860 + toll\n- **SUV:** approx. ₹2,325 + toll\n- **Innova Crysta:** approx. ₹3,410 + toll\n\n## Why Choose a Cab\nDoor-to-door convenience, flexible timing, and luggage freedom.',
  '/image2.jpeg',
  'Travel Guide',
  true,
  1,
  '2025-01-15T10:00:00Z'
where not exists (
  select 1 from blog_posts where slug = 'pune-to-mumbai'
);

-- Sample careers with full JD
insert into career_openings (
  title, type, location, department, description, responsibilities, requirements, benefits,
  experience, salary, image_url, published, sort_order, created_at
)
select
  'Customer support executive',
  'Full-time',
  'Pune',
  'Support',
  'Be the first voice riders and drivers hear when they need help. You will handle live trip queries on WhatsApp, phone, and email — clarifying fares, sharing ETAs, coordinating with ops, and making sure every journey feels safe and clear.',
  E'Respond to rider and driver messages on WhatsApp, phone, and email\nShare ETAs, route updates, and fare clarifications\nEscalate delays, no-shows, or safety concerns to operations\nMaintain polite communication in English and Hindi\nSupport weekend and peak-hour shifts',
  E'Clear written and spoken English and Hindi\nComfortable with WhatsApp Business and phone support\nCalm under time pressure\nWillingness to work rotating shifts\n0–2 years in support / BPO / hospitality preferred',
  E'Fixed salary + performance incentives\nOn-the-job training\nWeekly offs as per roster\nGrowth path into team lead\nPune operations desk',
  '0–2 years',
  '₹18,000 – ₹25,000 / month',
  '/image1.jpeg',
  true,
  1,
  '2025-06-01T10:00:00Z'
where not exists (
  select 1 from career_openings where lower(title) = lower('Customer support executive')
);

insert into career_openings (
  title, type, location, department, description, responsibilities, requirements, benefits,
  experience, salary, image_url, published, sort_order, created_at
)
select
  'Operations associate',
  'Full-time',
  'Pune',
  'Operations',
  'Keep bookings moving smoothly across local, airport, and outstation trips. Coordinate drivers, verify vehicle readiness, watch live routes, and step in when a trip needs a backup plan.',
  E'Assign and confirm drivers for bookings\nVerify documents and vehicle readiness\nMonitor live trips and arrange replacements\nCoordinate airport and outstation handovers\nMaintain daily ops logs',
  E'Strong phone and WhatsApp communication\nComfort with Maps and spreadsheets\nQuick decisions during peak hours\nFleet / logistics / travel desk experience a plus\nReady for early mornings and late evenings',
  E'Competitive salary + incentives\nFull cab ops exposure across Maharashtra\nGrowth to senior ops / fleet coordinator\nPune office base',
  '1–3 years',
  '₹22,000 – ₹32,000 / month',
  '/image3.png',
  true,
  2,
  '2025-06-15T10:00:00Z'
where not exists (
  select 1 from career_openings where lower(title) = lower('Operations associate')
);
