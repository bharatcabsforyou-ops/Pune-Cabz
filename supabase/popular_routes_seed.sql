-- Default 5 routes (same as original Book your cars showcase).
-- Safe to re-run: skips rows that already exist for the same from/to cities.

insert into public.popular_routes (from_city, to_city, duration, from_price, tag, image_url, sort_order, published)
select v.from_city, v.to_city, v.duration, v.from_price, v.tag, v.image_url, v.sort_order, v.published
from (
  values
    ('Pune', 'Pune City', '45m', '199', 'Popular', '/image1.jpg', 1, true),
    ('Pune', 'Mumbai', '3h 30m', '499', 'Most booked', '/image2.jpg', 2, true),
    ('Pune', 'Nashik', '4h 15m', '449', 'Weekend', '/image3.jpg', 3, true),
    ('Pune', 'Konkan', '5h', '599', 'Coastal', '/image4.jpg', 4, true),
    ('Pune', 'Mahabaleshwar', '2h 45m', '399', 'Scenic', '/image5.jpg', 5, true)
) as v(from_city, to_city, duration, from_price, tag, image_url, sort_order, published)
where not exists (
  select 1
  from public.popular_routes r
  where lower(r.from_city) = lower(v.from_city)
    and lower(r.to_city) = lower(v.to_city)
);
