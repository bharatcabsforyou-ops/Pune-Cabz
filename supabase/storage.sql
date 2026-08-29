-- Run once in Supabase SQL editor (after project is created).

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists site_images_public_read on storage.objects;
create policy site_images_public_read
  on storage.objects
  for select
  to public
  using (bucket_id = 'site-images');
