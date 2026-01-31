-- Delete Duplicate Households for Venkatapura
-- This will keep only the most recent entry for each house number

-- Delete all Venkatapura households
DELETE FROM households WHERE village_id = '9fff07b3-9ad0-47b8-b18c-65c3a828affe';

-- Verify deletion
SELECT COUNT(*) as remaining_households FROM households WHERE village_id = '9fff07b3-9ad0-47b8-b18c-65c3a828affe';
-- Should return 0
