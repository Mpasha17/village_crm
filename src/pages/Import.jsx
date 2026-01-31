import { useStore } from '../store/useStore'
import CSVImporter from '../components/import/CSVImporter'

export default function Import() {
    const { selectedVillage } = useStore()

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Import Household Data</h1>
                <p className="text-gray-600 mt-1">
                    Upload a CSV file from Google Forms to import household data
                </p>
                {selectedVillage && (
                    <p className="text-sm text-primary-600 mt-2">
                        Importing to: <span className="font-medium">{selectedVillage.name}</span>
                    </p>
                )}
            </div>

            <CSVImporter />
        </div>
    )
}
