-- Add separate columns for male and female head names
-- Run this in Supabase SQL Editor

ALTER TABLE households 
ADD COLUMN IF NOT EXISTS head_name_male text,
ADD COLUMN IF NOT EXISTS head_name_female text;

-- Add comments
COMMENT ON COLUMN households.head_name_male IS 'House yajamani (Male head of household)';
COMMENT ON COLUMN households.head_name_female IS 'House yajamana (Female head of household)';
