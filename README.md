# Village Data CRM

A production-ready web application for managing household survey data across 12 villages. Built with React 18, Supabase, and Tailwind CSS.

## 🚀 Features

- **Village Management**: Dynamic sidebar navigation for multiple villages
- **Household CRUD**: Complete Create, Read, Update, Delete operations
- **Advanced Table**: TanStack Table with search, sorting, and pagination
- **CSV Import**: Bulk import from Google Forms exports with column mapping
- **Statistics Dashboard**: Real-time stats for households, population, and schemes
- **Form Validation**: React Hook Form with Zod schema validation
- **Responsive Design**: Mobile-first Tailwind CSS styling

## 📋 Tech Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend/Database**: Supabase (PostgreSQL, Auth, Storage)
- **Data Grid**: TanStack Table
- **Forms**: React Hook Form + Zod
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Supabase credentials to `.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Setup Database

1. Go to your Supabase SQL Editor
2. Execute the `schema.sql` file to create tables and policies
3. (Optional) Create a storage bucket named `photos` for household photos

### 4. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
village_crm/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Stats cards and grid
│   │   ├── households/     # Table and form components
│   │   ├── import/         # CSV import functionality
│   │   ├── layout/         # Sidebar, Topbar, Layout
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Route pages
│   ├── store/              # Zustand global store
│   ├── lib/                # Supabase client & utilities
│   ├── schemas/            # Zod validation schemas
│   ├── constants/          # App constants
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── schema.sql              # Database schema
└── package.json
```

## 📊 Database Schema

### Tables

1. **villages**
   - `id` (uuid, primary key)
   - `name` (text, unique)
   - `description` (text)
   - `created_at` (timestamp)

2. **households**
   - `id` (uuid, primary key)
   - `village_id` (uuid, foreign key)
   - `house_number` (text)
   - `head_name` (text)
   - `head_gender` (text)
   - `family_members_count` (int)
   - `mobile_numbers` (text[])
   - `ration_card_status` (text)
   - `schemes` (text[])
   - `sons_names` (text[])
   - `daughters_names` (text[])
   - `photo_url` (text)
   - `notes` (text)
   - `created_at` (timestamp)

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive credentials
- Input validation with Zod schemas
- Supabase Auth integration ready

## 📝 Usage

### Adding a Village

Execute in Supabase SQL Editor:
```sql
INSERT INTO villages (name, description) VALUES 
  ('Village Name', 'Description');
```

### Adding Households

1. Select a village from the sidebar
2. Click "Add Household" button
3. Fill in the form and submit

### Importing CSV Data

1. Navigate to "Import Data" page
2. Upload your Google Forms CSV export
3. Map CSV columns to database fields
4. Click "Import Data"

### Searching & Filtering

- Use the search bar to filter by name or mobile number
- Navigate pages with pagination controls
- 20 households per page by default

## 🎨 Customization

### Adding New Schemes

Edit `src/constants/schemes.js`:
```javascript
export const SCHEMES = [
  'Vidya Siri',
  'Your New Scheme',
  // ...
]
```

### Changing Pagination Size

Edit `src/components/households/HouseholdTable.jsx`:
```javascript
initialState: {
  pagination: {
    pageSize: 20  // Change this value
  }
}
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Deploy to Vercel/Netlify

1. Connect your GitHub repository
2. Set environment variables in the hosting platform
3. Deploy!

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Supabase Connection Error
- Verify your `.env.local` credentials
- Check if Supabase project is active
- Ensure RLS policies are set correctly

### CSV Import Fails
- Check column mapping
- Ensure required fields (house_number, head_name) are mapped
- Verify village is selected

### Table Not Loading
- Check browser console for errors
- Verify Supabase schema is executed
- Ensure village has households

## 📄 License

MIT

## 👨‍💻 Author

Built for village household data management and digitization.

---

**Need Help?** Check the Supabase documentation or open an issue.