-- Fix VENKATAPURA to Venkatapura in database
-- Run this in Supabase SQL Editor

UPDATE villages 
SET name = 'Venkatapura' 
WHERE UPPER(name) = 'VENKATAPURA';

-- Verify
SELECT * FROM villages ORDER BY name;
