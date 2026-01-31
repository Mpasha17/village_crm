-- Complete Database Migration for All Form Fields
-- Run this in Supabase SQL Editor

-- Add all missing columns to households table
ALTER TABLE households 
ADD COLUMN IF NOT EXISTS head_name_male text,
ADD COLUMN IF NOT EXISTS head_name_female text,
ADD COLUMN IF NOT EXISTS daughter_in_law_names text[],
ADD COLUMN IF NOT EXISTS grandchildren_names text[],
ADD COLUMN IF NOT EXISTS immigration_details text,
ADD COLUMN IF NOT EXISTS pensioner_info text,
ADD COLUMN IF NOT EXISTS postal_schemes text[],
ADD COLUMN IF NOT EXISTS submission_timestamp timestamp with time zone;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'households'
ORDER BY column_name;
