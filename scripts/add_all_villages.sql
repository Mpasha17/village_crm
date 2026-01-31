-- Add all 12 villages to the database
-- Run this in Supabase SQL Editor

-- Insert all villages (will skip Venkatapura if it already exists)
INSERT INTO villages (name) VALUES
('VADERAHALLI'),
('BASAVANAHALLI'),
('JADEGONDANAHALLI'),
('MIDATARAHALLI'),
('JANATHA COLONY'),
('ARENAHALLI'),
('CHIKKANAHALLI'),
('BANAVENAHALLI'),
('KAMALA NAGARA'),
('VENKATAPURA'),
('GOPAGONDANAHALLI'),
('BHAKTARAHALLI')
ON CONFLICT (name) DO NOTHING;

-- Verify all villages were added
SELECT id, name, created_at FROM villages ORDER BY name;
