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

-- RLS for Portfolio
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active portfolio items" 
ON portfolio_items FOR SELECT 
USING (is_active = true);

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

-- RLS for Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert reviews" 
ON reviews FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view approved reviews" 
ON reviews FOR SELECT 
USING (is_approved = true);

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

-- RLS for Enquiries
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit enquiries" 
ON enquiries FOR INSERT 
WITH CHECK (true);

-- Note: No SELECT policy for enquiries, ensuring public cannot read form submissions.