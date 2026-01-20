
-- 1. Remove old approval-based policies
DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;

-- 2. Create instant visibility policy
CREATE POLICY "Public can view all reviews" 
ON reviews FOR SELECT 
USING (true);

-- 3. Ensure public can still only insert (cannot update or delete)
-- (Assuming "Public can insert reviews" already exists from previous setup)
-- CREATE POLICY "Public can insert reviews" ON reviews FOR INSERT WITH CHECK (true);

-- 4. Admin Management (Delete access inherited via 'authenticated' role)
-- This policy ensures only users logged into Supabase Auth (Admins) can modify/delete.
DROP POLICY IF EXISTS "Admin has full access to reviews" ON reviews;
CREATE POLICY "Admin has full access to reviews"
ON reviews FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
