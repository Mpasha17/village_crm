import { useState } from 'react'
import Papa from 'papaparse'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'
import Button from '../ui/Button'
import Select from '../ui/Select'

export default function CSVImporter() {
    const { villages, selectedVillage, addHousehold } = useStore()
    const [file, setFile] = useState(null)
    const [parsedData, setParsedData] = useState(null)
    const [headers, setHeaders] = useState([])
    const [mapping, setMapping] = useState({})
    const [importing, setImporting] = useState(false)
    const [results, setResults] = useState(null)

    const fieldOptions = [
        { value: '', label: 'Skip this column' },
        { value: 'house_number', label: 'House Number' },
        { value: 'head_name', label: 'Head Name' },
        { value: 'head_gender', label: 'Gender' },
        { value: 'family_members_count', label: 'Family Members Count' },
        { value: 'mobile_numbers', label: 'Mobile Numbers' },
        { value: 'ration_card_status', label: 'Ration Card Status' },
        { value: 'schemes', label: 'Schemes' },
        { value: 'sons_names', label: 'Sons Names' },
        { value: 'daughters_names', label: 'Daughters Names' },
        { value: 'notes', label: 'Notes' }
    ]

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        setFile(selectedFile)
        setResults(null)

        Papa.parse(selectedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setParsedData(result.data)
                setHeaders(result.meta.fields)

                // Auto-map common headers
                const autoMapping = {}
                result.meta.fields.forEach(header => {
                    const lowerHeader = header.toLowerCase()
                    if (lowerHeader.includes('house') && lowerHeader.includes('number')) {
                        autoMapping[header] = 'house_number'
                    } else if (lowerHeader.includes('name') || lowerHeader.includes('yajamani')) {
                        autoMapping[header] = 'head_name'
                    } else if (lowerHeader.includes('gender') || lowerHeader.includes('sex')) {
                        autoMapping[header] = 'head_gender'
                    } else if (lowerHeader.includes('mobile') || lowerHeader.includes('phone')) {
                        autoMapping[header] = 'mobile_numbers'
                    } else if (lowerHeader.includes('member') || lowerHeader.includes('family')) {
                        autoMapping[header] = 'family_members_count'
                    } else if (lowerHeader.includes('ration')) {
                        autoMapping[header] = 'ration_card_status'
                    }
                })
                setMapping(autoMapping)
            },
            error: (error) => {
                alert(`Error parsing CSV: ${error.message}`)
            }
        })
    }

    const handleMappingChange = (csvHeader, dbField) => {
        setMapping(prev => ({
            ...prev,
            [csvHeader]: dbField
        }))
    }

    const handleImport = async () => {
        if (!selectedVillage) {
            alert('Please select a village first')
            return
        }

        if (!parsedData || parsedData.length === 0) {
            alert('No data to import')
            return
        }

        setImporting(true)
        const importResults = {
            success: 0,
            failed: 0,
            errors: []
        }

        for (const row of parsedData) {
            try {
                const householdData = {
                    village_id: selectedVillage.id,
                    mobile_numbers: [],
                    schemes: [],
                    sons_names: [],
                    daughters_names: []
                }

                // Map CSV columns to database fields
                Object.entries(mapping).forEach(([csvHeader, dbField]) => {
                    if (!dbField || !row[csvHeader]) return

                    const value = row[csvHeader].trim()

                    if (dbField === 'mobile_numbers') {
                        // Split multiple numbers by comma or semicolon
                        householdData.mobile_numbers = value.split(/[,;]/).map(n => n.trim()).filter(Boolean)
                    } else if (dbField === 'schemes') {
                        householdData.schemes = value.split(/[,;]/).map(s => s.trim()).filter(Boolean)
                    } else if (dbField === 'sons_names' || dbField === 'daughters_names') {
                        householdData[dbField] = value.split(/[,;]/).map(n => n.trim()).filter(Boolean)
                    } else if (dbField === 'family_members_count') {
                        householdData[dbField] = parseInt(value) || 1
                    } else {
                        householdData[dbField] = value
                    }
                })

                // Validate required fields
                if (!householdData.house_number || !householdData.head_name) {
                    importResults.failed++
                    importResults.errors.push(`Row missing required fields: ${JSON.stringify(row)}`)
                    continue
                }

                const result = await addHousehold(householdData)

                if (result.success) {
                    importResults.success++
                } else {
                    importResults.failed++
                    importResults.errors.push(result.error)
                }
            } catch (error) {
                importResults.failed++
                importResults.errors.push(error.message)
            }
        }

        setImporting(false)
        setResults(importResults)
    }

    return (
        <div className="space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
                <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                                Upload CSV File
                            </span>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                            <Button variant="outline" className="mt-2" onClick={() => document.getElementById('file-upload').click()}>
                                Choose File
                            </Button>
                        </label>
                    </div>
                    {file && (
                        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>{file.name}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Column Mapping */}
            {headers.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Map CSV Columns to Database Fields
                    </h3>
                    <div className="space-y-3">
                        {headers.map((header) => (
                            <div key={header} className="grid grid-cols-2 gap-4 items-center">
                                <div className="text-sm font-medium text-gray-700">
                                    {header}
                                </div>
                                <Select
                                    value={mapping[header] || ''}
                                    onChange={(e) => handleMappingChange(header, e.target.value)}
                                    options={fieldOptions}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            {parsedData?.length || 0} rows found
                        </p>
                        <Button
                            onClick={handleImport}
                            disabled={importing || !selectedVillage}
                        >
                            {importing ? 'Importing...' : 'Import Data'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Results */}
            {results && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Import Results
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{results.success} households imported successfully</span>
                        </div>
                        {results.failed > 0 && (
                            <div className="flex items-center space-x-2 text-red-600">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-medium">{results.failed} failed</span>
                            </div>
                        )}
                        {results.errors.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Errors:</p>
                                <div className="bg-red-50 rounded p-3 max-h-48 overflow-y-auto">
                                    {results.errors.slice(0, 10).map((error, idx) => (
                                        <p key={idx} className="text-sm text-red-700">{error}</p>
                                    ))}
                                    {results.errors.length > 10 && (
                                        <p className="text-sm text-red-600 mt-2">
                                            ... and {results.errors.length - 10} more errors
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
