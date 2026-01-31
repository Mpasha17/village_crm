/**
 * Google Apps Script for Multi-Village Auto-Sync to Supabase
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Form
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Update SUPABASE_URL and SUPABASE_KEY below (lines 18-19)
 * 6. Click Save (💾 icon)
 * 7. Click "Run" → Select "createTrigger" → Click Run
 * 8. Authorize the script when prompted
 * 9. Done! New form submissions will auto-sync to the correct village
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const SUPABASE_URL = 'https://woyaxeuqokqmffiqkxtb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndveWF4ZXVxb2txbWZmaXFreHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjY0NDQsImV4cCI6MjA4NTQwMjQ0NH0.0BvZ5QSvFt1pMJz1vGw_bD539-sEZbkQEy8beYwOuI8';

// ============================================
// MAIN FUNCTION - Triggered on Form Submit
// ============================================
function onFormSubmit(e) {
    try {
        Logger.log('📝 Form submitted! Processing...');

        // Get form responses
        const responses = e.response.getItemResponses();
        const formData = {};

        // Extract all responses
        responses.forEach(function (response) {
            const question = response.getItem().getTitle();
            const answer = response.getResponse();
            formData[question] = answer;
        });

        Logger.log('Form data: ' + JSON.stringify(formData));

        // Get village name from form (from dropdown)
        const villageName = formData['Village Name'] || formData['village name'] || formData['Village'];

        if (!villageName) {
            Logger.log('❌ ERROR: Village name not found in form response');
            Logger.log('Available fields: ' + Object.keys(formData).join(', '));
            return;
        }

        Logger.log('🏘️  Village: ' + villageName);

        // Get village ID from Supabase
        const villageId = getVillageId(villageName);
        if (!villageId) {
            Logger.log('❌ ERROR: Could not get village ID for: ' + villageName);
            return;
        }

        Logger.log('✅ Village ID: ' + villageId);

        // Prepare household data for Supabase
        const householdData = mapFormDataToHousehold(formData, villageId);

        Logger.log('📤 Sending to Supabase...');

        // Send to Supabase
        const success = sendToSupabase(householdData);

        if (success) {
            Logger.log('✅ Successfully synced to Supabase!');
        } else {
            Logger.log('❌ Failed to sync to Supabase');
        }

    } catch (error) {
        Logger.log('❌ ERROR: ' + error.toString());
    }
}

// ============================================
// GET VILLAGE ID FROM SUPABASE
// ============================================
function getVillageId(villageName) {
    try {
        // Normalize village name (uppercase, trim)
        const normalizedName = villageName.trim().toUpperCase();

        const url = SUPABASE_URL + '/rest/v1/villages?name=eq.' + encodeURIComponent(normalizedName);

        const options = {
            'method': 'get',
            'headers': {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json'
            }
        };

        const response = UrlFetchApp.fetch(url, options);
        const data = JSON.parse(response.getContentText());

        if (data && data.length > 0) {
            Logger.log('✅ Found village: ' + normalizedName);
            return data[0].id;
        } else {
            Logger.log('⚠️  Village not found in database: ' + normalizedName);
            Logger.log('Creating new village...');
            return createVillage(normalizedName);
        }
    } catch (error) {
        Logger.log('❌ Error getting village ID: ' + error.toString());
        return null;
    }
}

// ============================================
// CREATE VILLAGE IF NOT EXISTS
// ============================================
function createVillage(villageName) {
    try {
        const url = SUPABASE_URL + '/rest/v1/villages';

        const payload = {
            'name': villageName,
            'description': 'Auto-created from Google Forms'
        };

        const options = {
            'method': 'post',
            'headers': {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            'payload': JSON.stringify(payload)
        };

        const response = UrlFetchApp.fetch(url, options);
        const data = JSON.parse(response.getContentText());

        if (data && data.length > 0) {
            Logger.log('✅ Created new village: ' + villageName);
            return data[0].id;
        }
        return null;
    } catch (error) {
        Logger.log('❌ Error creating village: ' + error.toString());
        return null;
    }
}

// ============================================
// MAP FORM DATA TO HOUSEHOLD STRUCTURE
// ============================================
function mapFormDataToHousehold(formData, villageId) {
    // Helper function to parse array fields
    function parseArray(value) {
        if (!value || value === '0' || value === '') return [];
        if (Array.isArray(value)) return value;
        return value.split(',').map(item => item.trim()).filter(item => item && item !== '0');
    }

    // Helper to parse timestamp
    function parseTimestamp(timestamp) {
        if (!timestamp) return null;
        try {
            return new Date(timestamp).toISOString();
        } catch (e) {
            return null;
        }
    }

    // Helper to parse family count
    function parseFamilyCount(value) {
        if (!value) return 0;
        const match = String(value).match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    }

    // Get male and female head names
    const headMale = formData['House yajamani'] || '';
    const headFemale = formData['House yajamana'] || '';
    const headName = headMale || headFemale || '';

    // Determine gender
    let gender = 'Unknown';
    if (headMale && headFemale) {
        gender = 'Both';
    } else if (headMale) {
        gender = 'Male';
    } else if (headFemale) {
        gender = 'Female';
    }

    // Map form data to database fields
    const household = {
        village_id: villageId,
        house_number: formData['HOUSE NUMBER '] || formData['House Number'] || '',
        head_name: headName,
        head_name_male: headMale,
        head_name_female: headFemale,
        head_gender: gender,
        family_members_count: parseFamilyCount(formData['Family Total Members '] || formData['Family Total Members'] || 0),
        mobile_numbers: parseArray(formData["Mobile Number's "] || formData['Mobile Number'] || ''),
        sons_names: parseArray(formData['Sons Names'] || ''),
        daughters_names: parseArray(formData['Doughters Names'] || formData['Daughters Names'] || ''),
        daughter_in_law_names: parseArray(formData[' doughter in law'] || formData['Daughter in law'] || ''),
        grandchildren_names: parseArray(formData['Grand Son And  doughter then other Members'] || formData['Grandchildren'] || ''),
        ration_card_status: formData['Ration card '] || formData['Ration card'] || '',
        photo_url: formData['House photo '] || formData['House photo'] || '',
        immigration_details: formData['Details of family members who are permanently immigrating'] || '',
        pensioner_info: formData["Pensioner's beneficiary "] || formData['Pensioner beneficiary'] || '',
        postal_schemes: parseArray(formData['Are you a current postal customer? Which of the following schemes are you a beneficiary of?'] || ''),
        schemes: [],
        notes: formData['Name and relationship of the person providing the household information'] || '',
        submission_timestamp: parseTimestamp(formData['Timestamp'])
    };

    return household;
}

// ============================================
// SEND DATA TO SUPABASE
// ============================================
function sendToSupabase(householdData) {
    try {
        const url = SUPABASE_URL + '/rest/v1/households';

        const options = {
            'method': 'post',
            'headers': {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            'payload': JSON.stringify(householdData)
        };

        const response = UrlFetchApp.fetch(url, options);
        const responseCode = response.getResponseCode();

        Logger.log('Supabase response code: ' + responseCode);
        Logger.log('Supabase response: ' + response.getContentText());

        return responseCode === 201 || responseCode === 200;

    } catch (error) {
        Logger.log('❌ Error sending to Supabase: ' + error.toString());
        return false;
    }
}

// ============================================
// CREATE TRIGGER (Run this once to setup)
// ============================================
function createTrigger() {
    // Delete existing triggers
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(function (trigger) {
        if (trigger.getHandlerFunction() === 'onFormSubmit') {
            ScriptApp.deleteTrigger(trigger);
        }
    });

    // Create new trigger
    const form = FormApp.getActiveForm();
    ScriptApp.newTrigger('onFormSubmit')
        .forForm(form)
        .onFormSubmit()
        .create();

    Logger.log('✅ Trigger created successfully!');
    Logger.log('📝 New form submissions will auto-sync to Supabase');
    Logger.log('🏘️  Village will be determined from form dropdown');
}

// ============================================
// TEST FUNCTION (Optional - for testing)
// ============================================
function testConnection() {
    Logger.log('🔍 Testing Supabase connection...');

    // Test with one of your villages
    const testVillageName = 'VENKATAPURA';
    const villageId = getVillageId(testVillageName);

    if (villageId) {
        Logger.log('✅ Connection successful!');
        Logger.log('Village: ' + testVillageName);
        Logger.log('Village ID: ' + villageId);
    } else {
        Logger.log('❌ Connection failed');
    }
}

// ============================================
// LIST ALL VILLAGES (Helper function)
// ============================================
function listAllVillages() {
    try {
        const url = SUPABASE_URL + '/rest/v1/villages?select=id,name';

        const options = {
            'method': 'get',
            'headers': {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json'
            }
        };

        const response = UrlFetchApp.fetch(url, options);
        const villages = JSON.parse(response.getContentText());

        Logger.log('📋 All villages in database:');
        villages.forEach(function (village) {
            Logger.log('  - ' + village.name + ' (ID: ' + village.id + ')');
        });

    } catch (error) {
        Logger.log('❌ Error listing villages: ' + error.toString());
    }
}
