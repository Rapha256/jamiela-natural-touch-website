
-- Add video_url column to testimonials
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS video_url text;

-- Create testimonial-media storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-media', 'testimonial-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read testimonial media" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'testimonial-media');

-- Allow authenticated uploads
CREATE POLICY "Authenticated upload testimonial media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'testimonial-media');

-- Allow authenticated deletes
CREATE POLICY "Authenticated delete testimonial media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'testimonial-media');
