# Quick Start Guide - Upload CSV to Database

## ✅ Dependencies Installed!

The Python script is ready to use.

## 📁 Where to Put Your CSV File

You can put your CSV file **anywhere**, but here are the easiest options:

### Option 1: Desktop (Easiest)
```
/Users/pasha/Desktop/venkatapura_data.csv
```

### Option 2: Same folder as script
```
/Users/pasha/village_crm/scripts/venkatapura_data.csv
```

### Option 3: Downloads folder
```
/Users/pasha/Downloads/venkatapura_data.csv
```

## 🚀 How to Run

### Step 1: Export Excel to CSV
1. Open your Excel file
2. **File → Save As**
3. Choose **CSV (Comma delimited) (*.csv)**
4. Save it (e.g., `venkatapura_data.csv`)

### Step 2: Run the Script

```bash
cd /Users/pasha/village_crm/scripts
source env/bin/activate
python3 upload_csv_to_supabase.py
```

### Step 3: Enter File Path

When prompted:
```
📁 Enter CSV file path (or drag file here): 
```

**Easy way**: Just drag your CSV file into the terminal and press Enter!

Or type the full path:
```
/Users/pasha/Desktop/venkatapura_data.csv
```

### Step 4: Enter Village Name

```
🏘️  Enter village name (e.g., Venkatapura): Venkatapura
```

### Step 5: Done!

The script will upload all data and show:
```
✅ Uploaded: House #01 - Mallamma
✅ Uploaded: House #2 - BHAGYAMMA
📈 Upload Complete!
   Total rows: 10
   ✅ Successful: 10
   ❌ Failed: 0
```

## 🎯 Next Steps

After upload:
1. Open http://localhost:3001
2. Click "Venkatapura" in sidebar
3. See all your data! 🎉

## 📋 CSV Column Names

Make sure your CSV has these column headers (case-sensitive):

- `Village Name` or `village_name`
- `HOUSE NUMBER` or `House Number`
- `House yajamani` or `House yajamana` (head name)
- `Family Total Members`
- `Mobile Number`
- `Sons Names`
- `Daughters Names`
- `Ration card`
- `House photo`
- `Name and relationship of the person providing`

**Don't worry if column names don't match exactly** - the script will try to find them!

## ⚠️ Important

- Make sure you're in the virtual environment: `source env/bin/activate`
- The CSV file path must be correct
- Village name must match exactly (or script will create it)

## 🐛 Troubleshooting

**"File not found"**
- Drag the file into terminal instead of typing path
- Make sure file extension is `.csv` not `.xlsx`

**"No module named supabase"**
```bash
source env/bin/activate
pip install -r requirements.txt
```

**"Village not found"**
- The script will automatically create the village
- Check Supabase dashboard to verify
