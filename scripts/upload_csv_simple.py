#!/usr/bin/env python3
"""
Simple CSV to Supabase Uploader
Uses direct HTTP requests to avoid dependency conflicts
"""

import csv
import json
import os
import sys
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

# Supabase credentials from .env.local
SUPABASE_URL = 'https://woyaxeuqokqmffiqkxtb.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndveWF4ZXVxb2txbWZmaXFreHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjY0NDQsImV4cCI6MjA4NTQwMjQ0NH0.0BvZ5QSvFt1pMJz1vGw_bD539-sEZbkQEy8beYwOuI8'

def make_request(method, endpoint, data=None):
    """Make HTTP request to Supabase"""
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }
    
    try:
        if data:
            data_bytes = json.dumps(data).encode('utf-8')
            req = Request(url, data=data_bytes, headers=headers, method=method)
        else:
            req = Request(url, headers=headers, method=method)
        
        with urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except HTTPError as e:
        print(f"❌ HTTP Error: {e.code} - {e.reason}")
        print(f"   Response: {e.read().decode('utf-8')}")
        return None
    except URLError as e:
        print(f"❌ URL Error: {e.reason}")
        return None

def get_village_id(village_name):
    """Get village ID from name"""
    print(f"🔍 Looking for village: {village_name}")
    
    response = make_request('GET', f'villages?name=eq.{village_name}')
    
    if response and len(response) > 0:
        village_id = response[0]['id']
        print(f"✅ Found village ID: {village_id}")
        return village_id
    else:
        print(f"⚠️  Village not found. Creating '{village_name}'...")
        new_village = make_request('POST', 'villages', {
            'name': village_name,
            'description': f'Auto-created for {village_name}'
        })
        if new_village and len(new_village) > 0:
            village_id = new_village[0]['id']
            print(f"✅ Created village ID: {village_id}")
            return village_id
        else:
            print(f"❌ Failed to create village")
            return None

def parse_array_field(value):
    """Convert comma-separated string to array"""
    if not value or str(value).strip() in ['', '0', 'None']:
        return []
    items = [item.strip() for item in str(value).split(',')]
    return [item for item in items if item and item != '0']

def upload_household(row, village_id):
    """Upload a single household"""
    try:
        # Map Google Forms column names to our fields
        # EXACT column names from your CSV (including trailing spaces!)
        head_name_male = (
            row.get('ಮನೆ ಯಜಮಾನಿ ಹೆಸರು', '').strip() or 
            row.get('House yajamani', '').strip()
        )
        
        head_name_female = (
            row.get('ಮನೆ ಯಜಮಾನ ಹೆಸರು', '').strip() or
            row.get('House yajamana', '').strip()
        )
        
        # Use whichever is filled
        head_name = head_name_male or head_name_female
        
        # Determine gender based on which field has data
        if head_name_male:
            gender = 'Male'
        elif head_name_female:
            gender = 'Female'
        else:
            gender = ''
        
        # Get house number - NOTE THE TRAILING SPACE!
        house_number = (
            str(row.get('HOUSE NUMBER ', '')).strip() or  # With trailing space!
            str(row.get('ಮನೆ ಸಂಖ್ಯೆ', '')).strip() or
            str(row.get('HOUSE NUMBER', '')).strip() or
            str(row.get('House Number', '')).strip()
        )
        
        # Get family members count - NOTE THE TRAILING SPACE!
        family_count = (
            row.get('Family Total Members ', '') or  # With trailing space!
            row.get('ಕುಟುಂಬದ ಒಟ್ಟು ಸದಸ್ಯರು', '') or 
            row.get('Family Total Members', '') or 
            0
        )
        
        # Get mobile numbers - NOTE THE TRAILING SPACE AND APOSTROPHE!
        mobile = (
            row.get("Mobile Number's ", '') or  # With apostrophe-s and space!
            row.get('ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', '') or 
            row.get('Mobile Number', '')
        )
        
        # Get sons names
        sons = (
            row.get('Sons Names', '') or
            row.get('ಗಂಡು ಮಕ್ಕಳ ಹೆಸರುಗಳು', '')
        )
        
        # Get daughters names - NOTE THE TYPO "Doughters"!
        daughters = (
            row.get('Doughters Names', '') or  # Typo in your form!
            row.get('Daughters Names', '') or
            row.get('ಹೆಣ್ಣು ಮಕ್ಕಳ ಹೆಸರುಗಳು', '')
        )
        
        # Get ration card status - NOTE THE TRAILING SPACE!
        ration_card = (
            row.get('Ration card ', '') or  # With trailing space!
            row.get('ಪಡಿತರ ಚೀಟಿ', '') or
            row.get('Ration card', '')
        )
        
        # Get photo URL - NOTE THE TRAILING SPACE!
        photo = (
            row.get('House photo ', '') or  # With trailing space!
            row.get('ಮನೆಯ ಫೋಟೋ', '') or
            row.get('House photo', '')
        )
        
        # Get notes
        notes = (
            row.get('Name and relationship of the person providing the household information', '') or
            row.get('ಮಾಹಿತಿ ನೀಡುವವರ ಹೆಸರು ಮತ್ತು ಸಂಬಂಧ', '') or
            row.get('Name and relationship of the person providing', '')
        )
        
        # Get pensioner info
        pensioner = row.get("Pensioner's beneficiary ", '').strip()
        if pensioner and notes:
            notes = f"{notes} | Pensioner: {pensioner}"
        elif pensioner:
            notes = f"Pensioner: {pensioner}"
        
        household_data = {
            'village_id': village_id,
            'house_number': house_number,
            'head_name': head_name,
            'head_gender': gender,
            'family_members_count': int(str(family_count).split()[0] if family_count else 0),  # Handle "4 +3 -7" format
            'mobile_numbers': parse_array_field(mobile),
            'ration_card_status': ration_card.strip() if ration_card else '',
            'schemes': [],  # Not in your form
            'sons_names': parse_array_field(sons),
            'daughters_names': parse_array_field(daughters),
            'photo_url': photo.strip() if photo else '',
            'notes': notes.strip() if notes else ''
        }
        
        if not household_data['house_number']:
            print(f"⚠️  Skipping row - no house number (head: {household_data['head_name']})")
            return False
        
        response = make_request('POST', 'households', household_data)
        
        if response:
            print(f"✅ Uploaded: House #{household_data['house_number']} - {household_data['head_name']}")
            return True
        else:
            print(f"❌ Failed to upload: House #{household_data['house_number']}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        print(f"   Row data: {list(row.keys())[:5]}...")  # Show first 5 column names
        return False

def main():
    print("=" * 60)
    print("🚀 CSV to Supabase Uploader (Simple Version)")
    print("=" * 60)
    
    # Get CSV file path
    csv_file = input("\n📁 Enter CSV file path (or drag file here): ").strip().strip("'\"")
    
    if not os.path.exists(csv_file):
        print(f"❌ File not found: {csv_file}")
        return
    
    # Get village name
    village_name = input("\n🏘️  Enter village name (e.g., Venkatapura): ").strip()
    
    # Get village ID
    village_id = get_village_id(village_name)
    if not village_id:
        print("❌ Could not get village ID. Exiting.")
        return
    
    print(f"\n📊 Reading CSV file...")
    
    success_count = 0
    error_count = 0
    total_rows = 0
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
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
        print(f"\n🎉 Check your CRM at: http://localhost:3001")
        
    except Exception as e:
        print(f"\n❌ Error reading CSV: {e}")

if __name__ == "__main__":
    main()
