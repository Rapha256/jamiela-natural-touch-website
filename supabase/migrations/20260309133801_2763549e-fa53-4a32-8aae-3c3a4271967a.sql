
DELETE FROM products;

INSERT INTO products (name, category, price, description, image_url, in_stock) VALUES
  ('Xtreme Growth Hair Serum', 'Hair Care', 'D500', '100% Pure & Natural hair growth serum. Stimulates hair follicles for faster, thicker growth.', 'https://yktjylvlmlbwuoxcwufi.supabase.co/storage/v1/object/public/product-images/xtreme-growth-serum.jpeg', true),
  ('Xtention Hair Oil', 'Hair Care', 'D450', 'For daily use, scalp treatment and split end care. The length of your hair matters.', 'https://yktjylvlmlbwuoxcwufi.supabase.co/storage/v1/object/public/product-images/xtention-hair-oil.jpeg', true),
  ('Silk & Smooth Body Cream', 'Body Care', 'D400', 'Luxurious body cream suitable for all skin types. Apply evenly and massage gently for best results.', 'https://yktjylvlmlbwuoxcwufi.supabase.co/storage/v1/object/public/product-images/silk-smooth-body-cream.jpeg', true),
  ('Velvet Hair Cream', 'Hair Care', 'D450', 'Premium hair cream for styling and nourishment. What''s a Barbie without Hair!', 'https://yktjylvlmlbwuoxcwufi.supabase.co/storage/v1/object/public/product-images/product-collection.jpeg', true),
  ('Herbs Hair Mist', 'Hair Care', 'D350', 'Herbal hair mist for daily use, scalp treatment and split end care. Infused with natural herbs.', 'https://yktjylvlmlbwuoxcwufi.supabase.co/storage/v1/object/public/product-images/xtention-oil-duo.jpeg', true);
