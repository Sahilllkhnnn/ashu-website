-- 1. PORTFOLIO ITEMS
CREATE TABLE IF NOT EXISTS portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public can view ONLY active items
CREATE POLICY "Public can view active portfolio items" 
ON portfolio_items FOR SELECT 
USING (is_active = true);

-- Authenticated (Admin) can do everything
CREATE POLICY "Admin has full access to portfolio"
ON portfolio_items FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 2. CLIENT REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can insert new reviews
CREATE POLICY "Public can insert reviews" 
ON reviews FOR INSERT 
WITH CHECK (true);

-- Public can view ONLY approved reviews
CREATE POLICY "Public can view approved reviews" 
ON reviews FOR SELECT 
USING (is_approved = true);

-- Admin has full control
CREATE POLICY "Admin has full access to reviews"
ON reviews FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. ENQUIRIES
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    event_date DATE NOT NULL,
    message TEXT,
    service TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public can submit enquiries
CREATE POLICY "Public can submit enquiries" 
ON enquiries FOR INSERT 
WITH CHECK (true);

-- Admin can see and delete enquiries (No public SELECT)
CREATE POLICY "Admin has full access to enquiries"
ON enquiries FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. STORAGE BUCKET (Run this via Dashboard as SQL cannot create buckets)
-- Ensure a bucket named 'portfolio' is created.
-- Policy: Public READ access to 'portfolio' bucket.
-- Policy: Authenticated ALL access to 'portfolio' bucket.