-- Migration: Add all Google Form columns to households table
-- Run this in Supabase SQL Editor

-- Add new columns for complete Google Form data
ALTER TABLE households 
ADD COLUMN IF NOT EXISTS daughter_in_law_names text[],
ADD COLUMN IF NOT EXISTS grandchildren_names text[],
ADD COLUMN IF NOT EXISTS immigration_details text,
ADD COLUMN IF NOT EXISTS pensioner_info text,
ADD COLUMN IF NOT EXISTS postal_schemes text[],
ADD COLUMN IF NOT EXISTS submission_timestamp timestamp with time zone;

-- Add comment for documentation
COMMENT ON COLUMN households.daughter_in_law_names IS 'Names of daughters-in-law in the household';
COMMENT ON COLUMN households.grandchildren_names IS 'Names of grandchildren and other members';
COMMENT ON COLUMN households.immigration_details IS 'Details of family members who permanently immigrated';
COMMENT ON COLUMN households.pensioner_info IS 'Pensioner beneficiary information';
COMMENT ON COLUMN households.postal_schemes IS 'Postal customer schemes (SB Account, RD, etc.)';
COMMENT ON COLUMN households.submission_timestamp IS 'Original form submission timestamp';
