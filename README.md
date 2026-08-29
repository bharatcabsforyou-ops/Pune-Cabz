## RideMate

Carpool landing page built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Supabase is wired up and ready for auth/rides data.

### Stack

- **Next.js 16** — App Router, Turbopack
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css`
- **Supabase** — `@supabase/ssr` clients in `src/lib/supabase/`
- **lucide-react** — icon set

### Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

Open http://localhost:3000.

### Structure

```
src/app/            route + layout + global styles
src/components/      Navbar, Hero, SearchBar, Features, TopRides,
                      NeverMiss, ShareRide, Testimonial, Footer
src/lib/supabase/    browser + server Supabase clients
```

### Design tokens

Brand colors live in `src/app/globals.css` under `@theme inline`: `navy`, `brand` (blue accent), `soft` (light background). Adjust there to re-theme the whole site.
