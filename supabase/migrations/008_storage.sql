-- Create uploads bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
);

-- Storage policies
create policy "Authenticated users can upload to own folder"
on storage.objects for insert
with check (
  bucket_id = 'uploads'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] in ('evidence', 'showcases')
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Anyone can view uploads"
on storage.objects for select
using (bucket_id = 'uploads');
