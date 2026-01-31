-- Village Data CRM - Supabase Database Schema
-- Execute this in your Supabase SQL Editor

-- Table: villages
-- Stores information about each village
create table villages (
  id uuid default gen_random_uuid() primary key,
  name text unique not null, -- e.g., "Venkatapura"
  description text,
  created_at timestamp with time zone default now()
);

-- Table: households
-- Stores household survey data for each village
create table households (
  id uuid default gen_random_uuid() primary key,
  village_id uuid references villages(id) on delete cascade not null,
  house_number text not null,
  head_name text not null,       -- "Yajamani" (Head of family)
  head_gender text,              -- Male/Female
  family_members_count int default 1,
  mobile_numbers text[],         -- Array of phone numbers
  ration_card_status text,       -- "Yes", "No", "Applied"
  schemes text[],                -- Array: ["Sukanya Samriddhi", "Vidya Siri", etc.]
  sons_names text[],             -- Array of names
  daughters_names text[],        -- Array of names
  photo_url text,                -- Supabase Storage URL
  notes text,                    -- "Information Provider" details go here
  created_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index idx_households_village_id on households(village_id);
create index idx_households_head_name on households(head_name);
create index idx_households_house_number on households(house_number);

-- Enable Row Level Security (RLS)
alter table villages enable row level security;
alter table households enable row level security;

-- RLS Policies (Allow all operations for authenticated users)
-- Adjust these based on your authentication requirements

-- Villages policies
create policy "Enable read access for all users" on villages
  for select using (true);

create policy "Enable insert for authenticated users only" on villages
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on villages
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on villages
  for delete using (auth.role() = 'authenticated');

-- Households policies
create policy "Enable read access for all users" on households
  for select using (true);

create policy "Enable insert for authenticated users only" on households
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on households
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on households
  for delete using (auth.role() = 'authenticated');

-- Insert sample village (Venkatapura)
insert into villages (name, description) values 
  ('Venkatapura', 'First village with existing CSV data');

-- Note: For production, you may want to add more constraints and validation
-- Consider adding triggers for data validation if needed
