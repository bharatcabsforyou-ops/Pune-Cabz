-- Run once in Supabase SQL editor if routes show the same image.

alter table public.popular_routes
  add column if not exists image_url text not null default '/image1.jpg';

update public.popular_routes
set image_url = '/image1.jpg'
where lower(from_city) = 'pune' and lower(to_city) in ('pune city', 'pune');

update public.popular_routes
set image_url = '/image2.jpg'
where lower(from_city) = 'pune' and lower(to_city) = 'mumbai';

update public.popular_routes
set image_url = '/image3.jpg'
where lower(from_city) = 'pune' and lower(to_city) = 'nashik';

update public.popular_routes
set image_url = '/image4.jpg'
where lower(from_city) = 'pune' and lower(to_city) in ('konkan', 'lonavala', 'goa');

update public.popular_routes
set image_url = '/image5.jpg'
where lower(from_city) = 'pune' and lower(to_city) = 'mahabaleshwar';
