-- Check current households table schema
-- Run this in Supabase SQL Editor to see all columns

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'households'
ORDER BY ordinal_position;
