#!/usr/bin/env python3
"""
Upload CSV data to Supabase Database
This script reads your Excel/CSV file and uploads all household data to Supabase
"""

import csv
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env.local')

# Supabase credentials
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_village_id(village_name):
    """Get village ID from village name"""
    try:
        response = supabase.table('villages').select('id').eq('name', village_name).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]['id']
        else:
            print(f"⚠️  Village '{village_name}' not found. Creating it...")
            # Create village if it doesn't exist
            new_village = supabase.table('villages').insert({
                'name': village_name,
                'description': f'Auto-created for {village_name}'
            }).execute()
            return new_village.data[0]['id']
    except Exception as e:
        print(f"❌ Error getting village ID: {e}")
        return None

def parse_array_field(value):
    """Convert comma-separated string to array"""
    if not value or value.strip() == '' or value == '0':
        return []
    # Split by comma and clean up
    items = [item.strip() for item in str(value).split(',')]
    return [item for item in items if item and item != '0']

def upload_household(row, village_id):
    """Upload a single household to Supabase"""
    try:
        # Prepare household data
        household_data = {
            'village_id': village_id,
            'house_number': row.get('HOUSE NUMBER', '').strip(),
            'head_name': row.get('House yajamani', row.get('House yajamana', '')).strip(),
            'head_gender': 'Male' if row.get('House yajamani', '').strip() else 'Female',
            'family_members_count': int(row.get('Family Total Members', 0) or 0),
            'mobile_numbers': parse_array_field(row.get('Mobile Number', '')),
            'ration_card_status': row.get('Ration card', '').strip(),
            'schemes': parse_array_field(row.get('Government Schemes', '')),
            'sons_names': parse_array_field(row.get('Sons Names', '')),
            'daughters_names': parse_array_field(row.get('Daughters Names', '')),
            'photo_url': row.get('House photo', '').strip(),
            'notes': row.get('Name and relationship of the person providing', '').strip()
        }
        
        # Skip if no house number
        if not household_data['house_number']:
            print(f"⚠️  Skipping row - no house number")
            return False
        
        # Insert into Supabase
        response = supabase.table('households').insert(household_data).execute()
        print(f"✅ Uploaded: House #{household_data['house_number']} - {household_data['head_name']}")
        return True
        
    except Exception as e:
        print(f"❌ Error uploading household: {e}")
        print(f"   Row data: {row}")
        return False

def main():
    """Main function to upload CSV data"""
    print("=" * 60)
    print("🚀 CSV to Supabase Uploader")
    print("=" * 60)
    
    # Ask for CSV file path
    csv_file = input("\n📁 Enter CSV file path (or drag file here): ").strip().strip("'\"")
    
    if not os.path.exists(csv_file):
        print(f"❌ File not found: {csv_file}")
        return
    
    # Ask for village name
    village_name = input("\n🏘️  Enter village name (e.g., Venkatapura): ").strip()
    
    # Get village ID
    village_id = get_village_id(village_name)
    if not village_id:
        print("❌ Could not get village ID. Exiting.")
        return
    
    print(f"\n✅ Village ID: {village_id}")
    print(f"\n📊 Reading CSV file...")
    
    # Read and upload CSV
    success_count = 0
    error_count = 0
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            total_rows = 0
            
            for row in reader:
                total_rows += 1
                if upload_household(row, village_id):
                    success_count += 1
                else:
                    error_count += 1
            
            print("\n" + "=" * 60)
            print(f"📈 Upload Complete!")
            print(f"   Total rows: {total_rows}")
            print(f"   ✅ Successful: {success_count}")
            print(f"   ❌ Failed: {error_count}")
            print("=" * 60)
            
    except Exception as e:
        print(f"\n❌ Error reading CSV: {e}")

if __name__ == "__main__":
    main()
