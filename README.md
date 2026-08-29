# Pune Cabz

Cab booking site for Pune and Maharashtra routes. Built with Next.js 16, Tailwind CSS v4, Supabase, and WhatsApp booking flow.

## Stack

- **Next.js 16** — App Router
- **Supabase** — routes, tourism, reviews, enquiries, admin auth
- **Tailwind CSS v4** — brand tokens in `src/app/globals.css`

## Local development

```bash
npm install
cp .env.local.example .env.local   # add your Supabase keys
npm run dev
```

Open http://localhost:3000.

### Supabase setup

Run these SQL files in the Supabase SQL editor (in order):

1. `supabase/admin_users.sql`
2. `supabase/popular_routes.sql` (+ `popular_routes_migration.sql` if upgrading)
3. `supabase/popular_routes_seed.sql` (optional seed)
4. `supabase/tourism.sql`
5. `supabase/reviews.sql`
6. `supabase/enquiries_bookings.sql`
7. `supabase/storage.sql`

Then seed admin (optional):

```bash
npm run seed:admin
```

## Deploy on Vercel

### 1. Push code to GitHub

Ensure the latest code is on GitHub (Vercel connects to your repo).

### 2. Import project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **Pune-Cabz** from GitHub
3. Framework preset: **Next.js** (auto-detected)
4. Root directory: `.` (default)
5. Build command: `npm run build` (default)
6. Output: Next.js default

### 3. Environment variables

In **Project → Settings → Environment Variables**, add for **Production** (and Preview if you want):

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only; never expose to client |
| `ADMIN_SESSION_SECRET` | Recommended | Long random string for admin cookies |

Do **not** commit `.env.local` — set these only in Vercel.

### 4. Deploy

Click **Deploy**. After build succeeds, your site is live at `https://your-project.vercel.app`.

### 5. Post-deploy checks

- Home, Book, Tourism, Contact pages load
- WhatsApp links work (`src/lib/site.ts` phone number)
- Admin login at `/admin` (after Supabase + admin user is seeded)
- Upload route/tourism images in admin (requires `storage.sql` bucket)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (same as Vercel) |
| `npm run start` | Run production build locally |
| `npm run seed:admin` | Create admin user in Supabase |
| `npm run seed:routes` | Seed popular routes |

## Notes

- Hero background video ships as `public/hero-bg.mp4` (~6MB, compressed). Optional override: `NEXT_PUBLIC_HERO_VIDEO_URL`.
- Default route/tourism data falls back to JSON if Supabase is not configured, but admin and live updates need Supabase.
