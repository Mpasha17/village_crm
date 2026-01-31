-- Fix Duplicate Villages and Merge Data
-- Run this in Supabase SQL Editor

-- Step 1: Find all duplicate villages (case-insensitive)
SELECT 
    id, 
    name, 
    UPPER(name) as normalized_name,
    (SELECT COUNT(*) FROM households WHERE village_id = villages.id) as household_count
FROM villages
ORDER BY UPPER(name), name;

-- Step 2: Delete empty duplicate villages (keep the one with data)
-- This will delete VADERAHALLI, VENKATAPURA (uppercase) if they have no households
DELETE FROM villages 
WHERE id IN (
    SELECT v1.id 
    FROM villages v1
    WHERE NOT EXISTS (
        SELECT 1 FROM households WHERE village_id = v1.id
    )
    AND EXISTS (
        SELECT 1 FROM villages v2 
        WHERE UPPER(v1.name) = UPPER(v2.name) 
        AND v1.id != v2.id
    )
);

-- Step 3: Verify remaining villages
SELECT id, name, 
    (SELECT COUNT(*) FROM households WHERE village_id = villages.id) as household_count
FROM villages
ORDER BY name;
