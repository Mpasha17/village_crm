/**
 * COMPLETE Google Apps Script - Multi-Village Auto-Sync
 * Copy this ENTIRE code and replace everything in your Apps Script editor
 */

const SUPABASE_URL = 'https://woyaxeuqokqmffiqkxtb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndveWF4ZXVxb2txbWZmaXFreHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MjY0NDQsImV4cCI6MjA4NTQwMjQ0NH0.0BvZ5QSvFt1pMJz1vGw_bD539-sEZbkQEy8beYwOuI8';

function onFormSubmit(e) {
    try {
        Logger.log('📝 Form submitted!');

        const responses = e.response.getItemResponses();
        const formData = {};
        responses.forEach(r => formData[r.getItem().getTitle()] = r.getResponse());

        Logger.log('Form data keys: ' + Object.keys(formData).join(', '));

        const villageName = formData['Village Name'] || formData['village name'] || formData['Village'];
        if (!villageName) {
            Logger.log('❌ ERROR: Village name not found in form');
            return;
        }

        Logger.log('🏘️  Village: ' + villageName);

        const villageId = getVillageId(villageName);
        if (!villageId) {
            Logger.log('❌ ERROR: Could not get village ID');
            return;
        }

        Logger.log('✅ Village ID: ' + villageId);

        const householdData = mapFormDataToHousehold(formData, villageId);
        Logger.log('📦 Household data prepared');

        const success = sendToSupabase(householdData);

        if (success) {
            Logger.log('✅ SUCCESS! Data synced to Supabase!');
        } else {
            Logger.log('❌ FAILED to sync');
        }
    } catch (error) {
        Logger.log('❌ EXCEPTION: ' + error.toString());
    }
}

function getVillageId(name) {
    try {
        const normalizedName = name.trim();

        const url = SUPABASE_URL + '/rest/v1/villages?select=*';
        const res = UrlFetchApp.fetch(url, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY
            }
        });
        const villages = JSON.parse(res.getContentText());

        const match = villages.find(v => v.name.toUpperCase() === normalizedName.toUpperCase());

        if (match) {
            Logger.log('✅ Found village: ' + match.name);
            return match.id;
        }

        Logger.log('⚠️  Village not found, creating: ' + normalizedName);
        return createVillage(normalizedName);

    } catch (error) {
        Logger.log('❌ Error getting village: ' + error.toString());
        return null;
    }
}

function createVillage(name) {
    try {
        const res = UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/villages', {
            method: 'post',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            payload: JSON.stringify({ name: name })
        });
        const data = JSON.parse(res.getContentText());
        Logger.log('✅ Created village: ' + name);
        return data[0].id;
    } catch (error) {
        Logger.log('❌ Error creating village: ' + error.toString());
        return null;
    }
}

function mapFormDataToHousehold(formData, villageId) {
    const parseArray = (value) => {
        if (!value || value === '0' || value === '') return [];
        if (Array.isArray(value)) return value;
        return value.split(',').map(i => i.trim()).filter(i => i && i !== '0');
    };

    const headMale = formData['House yajamani'] || '';
    const headFemale = formData['House yajamana'] || '';

    const household = {
        village_id: villageId,
        house_number: formData['HOUSE NUMBER '] || formData['House Number'] || '',
        head_name: headMale || headFemale || '',
        head_name_male: headMale,
        head_name_female: headFemale,
        head_gender: headMale && headFemale ? 'Both' : (headMale ? 'Male' : 'Female'),
        family_members_count: parseInt(String(formData['Family Total Members '] || formData['Family Total Members'] || '0').match(/\d+/) || 0),
        mobile_numbers: parseArray(formData["Mobile Number's "] || formData["Mobile Numbers"] || ''),
        sons_names: parseArray(formData['Sons Names'] || ''),
        daughters_names: parseArray(formData['Doughters Names'] || formData['Daughters Names'] || ''),
        daughter_in_law_names: parseArray(formData[' doughter in law'] || formData['Daughter in law'] || ''),
        grandchildren_names: parseArray(formData['Grand Son And  doughter then other Members'] || formData['Grandchildren'] || ''),
        ration_card_status: formData['Ration card '] || formData['Ration card'] || '',
        photo_url: formData['House photo '] || formData['House photo'] || '',
        pensioner_info: formData["Pensioner's beneficiary "] || formData["Pensioner beneficiary"] || '',
        immigration_details: formData['Details of family members who are permanently immigrating'] || '',
        postal_schemes: parseArray(formData['Are you a current postal customer? Which of the following schemes are you a beneficiary of?'] || ''),
        schemes: [],
        notes: formData['Name and relationship of the person providing the household information'] || '',
        submission_timestamp: new Date().toISOString()
    };

    Logger.log('Mapped data: ' + JSON.stringify(household));
    return household;
}

function sendToSupabase(data) {
    try {
        const options = {
            method: 'post',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            payload: JSON.stringify(data),
            muteHttpExceptions: true
        };

        const res = UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/households', options);
        const code = res.getResponseCode();
        const body = res.getContentText();

        Logger.log('📤 Response Code: ' + code);
        Logger.log('📤 Response Body: ' + body);

        if (code === 201 || code === 200) {
            Logger.log('✅ Insert successful!');
            return true;
        } else {
            Logger.log('❌ Insert failed!');
            Logger.log('Error details: ' + body);
            return false;
        }
    } catch (error) {
        Logger.log('❌ Exception in sendToSupabase: ' + error.toString());
        return false;
    }
}

function createTrigger() {
    ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
    ScriptApp.newTrigger('onFormSubmit').forForm(FormApp.getActiveForm()).onFormSubmit().create();
    Logger.log('✅ Trigger created successfully!');
}

function testConnection() {
    Logger.log('🔍 Testing connection...');
    const villageId = getVillageId('VADERAHALLI');
    if (villageId) {
        Logger.log('✅ Connection test passed!');
        Logger.log('Village ID: ' + villageId);
    } else {
        Logger.log('❌ Connection test failed!');
    }
}
