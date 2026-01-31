/**
 * Google Apps Script for Auto-Sync to Supabase
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Form
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Update SUPABASE_URL and SUPABASE_KEY below
 * 6. Click Save
 * 7. Click "Run" → "createTrigger" (authorize when prompted)
 * 8. Done! New form submissions will auto-sync to Supabase
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const SUPABASE_URL = 'https://woyaxeuqokqmffiqkxtb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndveWF4ZXVxb2txbWZmaXFreHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjY0NDQsImV4cCI6MjA4NTQwMjQ0NH0.0BvZ5QSvFt1pMJz1vGw_bD539-sEZbkQEy8beYwOuI8';

// Village name mapping (update this for each village's form)
const DEFAULT_VILLAGE_NAME = 'Venkatapura';

// ============================================
// MAIN FUNCTION - Triggered on Form Submit
// ============================================
function onFormSubmit(e) {
    try {
        Logger.log('Form submitted! Processing...');

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

        // Get village ID
        const villageId = getVillageId(DEFAULT_VILLAGE_NAME);
        if (!villageId) {
            Logger.log('ERROR: Could not get village ID');
            return;
        }

        // Prepare household data for Supabase
        const householdData = mapFormDataToHousehold(formData, villageId);

        // Send to Supabase
        const success = sendToSupabase(householdData);

        if (success) {
            Logger.log('✅ Successfully synced to Supabase!');
        } else {
            Logger.log('❌ Failed to sync to Supabase');
        }

    } catch (error) {
        Logger.log('ERROR: ' + error.toString());
    }
}

// ============================================
// GET VILLAGE ID FROM SUPABASE
// ============================================
function getVillageId(villageName) {
    try {
        const url = SUPABASE_URL + '/rest/v1/villages?name=eq.' + encodeURIComponent(villageName);

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
            return data[0].id;
        } else {
            // Village not found, create it
            return createVillage(villageName);
        }
    } catch (error) {
        Logger.log('Error getting village ID: ' + error.toString());
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
            Logger.log('Created new village: ' + villageName);
            return data[0].id;
        }
        return null;
    } catch (error) {
        Logger.log('Error creating village: ' + error.toString());
        return null;
    }
}

// ============================================
// MAP FORM DATA TO HOUSEHOLD STRUCTURE
// ============================================
function mapFormDataToHousehold(formData, villageId) {
    // Helper function to parse array fields
    function parseArray(value) {
        if (!value || value === '0') return [];
        if (Array.isArray(value)) return value;
        return value.split(',').map(item => item.trim()).filter(item => item && item !== '0');
    }

    // Map your form questions to database fields
    // UPDATE THESE MAPPINGS based on your actual form questions
    const household = {
        village_id: villageId,
        house_number: formData['HOUSE NUMBER'] || formData['House Number'] || '',
        head_name: formData['House yajamani'] || formData['House yajamana'] || formData['Head Name'] || '',
        head_gender: formData['House yajamani'] ? 'Male' : 'Female',
        family_members_count: parseInt(formData['Family Total Members'] || 0),
        mobile_numbers: parseArray(formData['Mobile Number'] || ''),
        ration_card_status: formData['Ration card'] || '',
        schemes: parseArray(formData['Government Schemes'] || ''),
        sons_names: parseArray(formData['Sons Names'] || ''),
        daughters_names: parseArray(formData['Daughters Names'] || ''),
        photo_url: formData['House photo'] || '',
        notes: formData['Name and relationship of the person providing'] || ''
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
        Logger.log('Error sending to Supabase: ' + error.toString());
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
    Logger.log('New form submissions will auto-sync to Supabase');
}

// ============================================
// TEST FUNCTION (Optional - for testing)
// ============================================
function testConnection() {
    Logger.log('Testing Supabase connection...');

    const villageId = getVillageId(DEFAULT_VILLAGE_NAME);
    if (villageId) {
        Logger.log('✅ Connection successful! Village ID: ' + villageId);
    } else {
        Logger.log('❌ Connection failed');
    }
}
