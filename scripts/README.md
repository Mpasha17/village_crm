# Google Forms Auto-Sync Setup Guide

## 🎯 Two Solutions Provided

### **Solution 1: Upload Existing CSV Data (One-time)**
Use the Python script to bulk upload your existing Excel/CSV data.

### **Solution 2: Auto-Sync New Form Submissions (Automatic)**
Use Google Apps Script to automatically sync new Google Form responses to Supabase.

---

## 📦 Solution 1: Upload Existing CSV Data

### Prerequisites
- Python 3.7 or higher installed
- Your Excel data exported as CSV

### Step 1: Install Python Dependencies

```bash
cd /Users/pasha/village_crm/scripts
pip3 install -r requirements.txt
```

### Step 2: Export Your Excel to CSV

1. Open your Excel file
2. Click **File → Save As**
3. Choose **CSV (Comma delimited) (*.csv)**
4. Save as `venkatapura_data.csv` (or any name)

### Step 3: Run the Upload Script

```bash
python3 upload_csv_to_supabase.py
```

### Step 4: Follow the Prompts

```
📁 Enter CSV file path: /path/to/venkatapura_data.csv
🏘️  Enter village name: Venkatapura
```

### Step 5: Verify Data

- Open your CRM: http://localhost:3001
- Check the Dashboard
- All households should appear!

---

## 🔄 Solution 2: Auto-Sync Google Forms (Real-time)

### Prerequisites
- Access to your Google Form
- Google account with edit permissions

### Step 1: Open Google Apps Script

1. Open your Google Form
2. Click **Extensions → Apps Script**
3. You'll see a code editor

### Step 2: Paste the Script

1. **Delete** any existing code in the editor
2. **Open** the file: `/Users/pasha/village_crm/scripts/google_apps_script.js`
3. **Copy** the entire script
4. **Paste** it into Google Apps Script editor

### Step 3: Update Configuration

Find these lines at the top of the script:

```javascript
const SUPABASE_URL = 'https://woyaxeuqokqmffiqkxtb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const DEFAULT_VILLAGE_NAME = 'Venkatapura';
```

✅ Already configured with your credentials!
⚠️ Update `DEFAULT_VILLAGE_NAME` for each village's form

### Step 4: Update Form Field Mapping

Find the `mapFormDataToHousehold` function and update the field mappings to match your actual Google Form questions:

```javascript
house_number: formData['HOUSE NUMBER'] || formData['House Number'] || '',
head_name: formData['House yajamani'] || formData['House yajamana'] || '',
// ... etc
```

**Your form questions** → **Database fields**

### Step 5: Save the Script

1. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
2. Give your project a name (e.g., "Supabase Auto-Sync")

### Step 6: Create the Trigger

1. In the Apps Script editor, find the function dropdown (top toolbar)
2. Select **`createTrigger`** from the dropdown
3. Click **Run** (▶️ button)
4. **Authorize** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"

### Step 7: Verify Trigger is Active

1. Click the **clock icon** (⏰) in the left sidebar (Triggers)
2. You should see a trigger:
   - Function: `onFormSubmit`
   - Event source: From form
   - Event type: On form submit

✅ **Done!** New form submissions will auto-sync to Supabase!

### Step 8: Test It!

1. Submit a test response to your Google Form
2. Wait 5-10 seconds
3. Refresh your CRM: http://localhost:3001
4. The new household should appear automatically! 🎉

---

## 🔍 Troubleshooting

### Python Script Issues

**Error: "Module not found"**
```bash
pip3 install supabase-py python-dotenv
```

**Error: "File not found"**
- Make sure the CSV path is correct
- Try dragging the file into the terminal

**Error: "Village not found"**
- The script will auto-create the village
- Check Supabase dashboard to verify

### Google Apps Script Issues

**Error: "Authorization required"**
- Click "Review permissions" and allow access
- This is normal for first-time setup

**Form submissions not syncing**
1. Check the trigger is active (clock icon)
2. View logs: Click "Executions" (left sidebar)
3. Look for errors in the log

**Wrong data mapping**
- Update the `mapFormDataToHousehold` function
- Match your form question names exactly

---

## 📋 Column Mapping Reference

| Your Form Question | Database Field | Type |
|-------------------|----------------|------|
| Village Name | `village_id` | Auto-lookup |
| HOUSE NUMBER | `house_number` | Text |
| House yajamani / yajamana | `head_name` | Text |
| Family Total Members | `family_members_count` | Number |
| Mobile Number | `mobile_numbers` | Array |
| Sons Names | `sons_names` | Array |
| Daughters Names | `daughters_names` | Array |
| Ration card | `ration_card_status` | Text |
| House photo | `photo_url` | Text (URL) |
| Name and relationship... | `notes` | Text |

---

## 🎉 Success!

After setup:
- ✅ Existing data uploaded via Python script
- ✅ New form submissions auto-sync via Google Apps Script
- ✅ All data appears instantly on your CRM website
- ✅ No manual CSV imports needed!

---

## 📞 Support

If you encounter issues:
1. Check the logs in Google Apps Script (Executions tab)
2. Verify your Supabase credentials
3. Ensure form question names match the mapping
4. Test with a simple form submission first

---

## 🔐 Security Notes

- ✅ Your Supabase credentials are already configured
- ✅ Google Apps Script runs securely in Google's cloud
- ✅ Data is encrypted in transit (HTTPS)
- ⚠️ Don't share your `SUPABASE_KEY` publicly
