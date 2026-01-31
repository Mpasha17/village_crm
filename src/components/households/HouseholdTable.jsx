import { useState, useMemo } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender
} from '@tanstack/react-table'
import { Edit, Trash2, Phone, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatPhoneNumbers } from '../../lib/utils'
import Button from '../ui/Button'
import SearchBar from '../ui/SearchBar'
import HouseholdForm from './HouseholdForm'

export default function HouseholdTable() {
    const { households, selectedVillage, deleteHousehold } = useStore()
    const [globalFilter, setGlobalFilter] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingHousehold, setEditingHousehold] = useState(null)

    const columns = useMemo(
        () => [
            {
                accessorKey: 'submission_timestamp',
                header: 'Timestamp',
                cell: ({ getValue }) => {
                    const timestamp = getValue()
                    if (!timestamp) return <span className="text-gray-400">N/A</span>
                    return (
                        <span className="text-sm text-gray-600">
                            {new Date(timestamp).toLocaleDateString('en-IN')}
                        </span>
                    )
                }
            },
            {
                accessorKey: 'house_number',
                header: 'House No',
                cell: ({ getValue }) => (
                    <span className="font-medium text-gray-900">{getValue()}</span>
                )
            },
            {
                accessorKey: 'photo_url',
                header: 'Photo',
                cell: ({ getValue }) => {
                    const photoUrl = getValue()

                    // Convert Google Drive link to direct image URL
                    const getDirectImageUrl = (url) => {
                        if (!url) return null

                        // Check if it's a Google Drive link
                        if (url.includes('drive.google.com')) {
                            // Extract file ID from various Google Drive URL formats
                            let fileId = null

                            // Format: https://drive.google.com/open?id=FILE_ID
                            if (url.includes('open?id=')) {
                                fileId = url.split('open?id=')[1].split('&')[0]
                            }
                            // Format: https://drive.google.com/file/d/FILE_ID/view
                            else if (url.includes('/file/d/')) {
                                fileId = url.split('/file/d/')[1].split('/')[0]
                            }

                            // Return direct image URL
                            if (fileId) {
                                return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
                            }
                        }

                        return url
                    }

                    const directUrl = getDirectImageUrl(photoUrl)

                    return (
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            {directUrl ? (
                                <img
                                    src={directUrl}
                                    alt="Household"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Photo</div>'
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    No Photo
                                </div>
                            )}
                        </div>
                    )
                }
            },
            {
                accessorKey: 'head_name',
                header: 'Head Name',
                cell: ({ row }) => (
                    <div>
                        <div className="font-medium text-gray-900">{row.original.head_name}</div>
                        {row.original.head_gender && (
                            <div className="text-sm text-gray-500">{row.original.head_gender}</div>
                        )}
                    </div>
                )
            },
            {
                accessorKey: 'family_members_count',
                header: 'Family Members',
                cell: ({ getValue }) => (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getValue() || 0}
                    </span>
                )
            },
            {
                accessorKey: 'sons_names',
                header: 'Sons',
                cell: ({ getValue }) => {
                    const sons = getValue()
                    if (!sons || sons.length === 0) return <span className="text-gray-400">None</span>
                    return <span className="text-sm text-gray-700">{sons.join(', ')}</span>
                }
            },
            {
                accessorKey: 'daughters_names',
                header: 'Daughters',
                cell: ({ getValue }) => {
                    const daughters = getValue()
                    if (!daughters || daughters.length === 0) return <span className="text-gray-400">None</span>
                    return <span className="text-sm text-gray-700">{daughters.join(', ')}</span>
                }
            },
            {
                accessorKey: 'daughter_in_law_names',
                header: 'Daughter-in-law',
                cell: ({ getValue }) => {
                    const dil = getValue()
                    if (!dil || dil.length === 0) return <span className="text-gray-400">None</span>
                    return <span className="text-sm text-gray-700">{dil.join(', ')}</span>
                }
            },
            {
                accessorKey: 'grandchildren_names',
                header: 'Grandchildren',
                cell: ({ getValue }) => {
                    const grandchildren = getValue()
                    if (!grandchildren || grandchildren.length === 0) return <span className="text-gray-400">None</span>
                    return <span className="text-sm text-gray-700">{grandchildren.join(', ')}</span>
                }
            },
            {
                accessorKey: 'mobile_numbers',
                header: 'Mobile',
                cell: ({ getValue }) => {
                    const numbers = getValue()
                    return (
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">
                                {formatPhoneNumbers(numbers) || 'N/A'}
                            </span>
                        </div>
                    )
                }
            },
            {
                accessorKey: 'ration_card_status',
                header: 'Ration Card',
                cell: ({ getValue }) => {
                    const status = getValue()
                    if (!status) return <span className="text-gray-400">N/A</span>
                    return <span className="text-sm text-gray-700">{status}</span>
                }
            },
            {
                accessorKey: 'schemes',
                header: 'Govt Schemes',
                cell: ({ getValue }) => {
                    const schemes = getValue()
                    if (!schemes || schemes.length === 0) return <span className="text-gray-400">None</span>
                    return (
                        <div className="flex flex-wrap gap-1">
                            {schemes.slice(0, 2).map((scheme, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                                >
                                    {scheme}
                                </span>
                            ))}
                            {schemes.length > 2 && (
                                <span className="text-xs text-gray-500">+{schemes.length - 2} more</span>
                            )}
                        </div>
                    )
                }
            },
            {
                accessorKey: 'postal_schemes',
                header: 'Postal Schemes',
                cell: ({ getValue }) => {
                    const schemes = getValue()
                    if (!schemes || schemes.length === 0) return <span className="text-gray-400">None</span>
                    return <span className="text-sm text-gray-700">{schemes.join(', ')}</span>
                }
            },
            {
                accessorKey: 'pensioner_info',
                header: 'Pensioner Info',
                cell: ({ getValue }) => {
                    const info = getValue()
                    if (!info) return <span className="text-gray-400">N/A</span>
                    return <span className="text-sm text-gray-700">{info}</span>
                }
            },
            {
                accessorKey: 'immigration_details',
                header: 'Immigration',
                cell: ({ getValue }) => {
                    const details = getValue()
                    if (!details) return <span className="text-gray-400">N/A</span>
                    return <span className="text-sm text-gray-700">{details}</span>
                }
            },
            {
                accessorKey: 'notes',
                header: 'Info Provider',
                cell: ({ getValue }) => {
                    const notes = getValue()
                    if (!notes) return <span className="text-gray-400">N/A</span>
                    return <span className="text-sm text-gray-700">{notes}</span>
                }
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleEdit(row.original)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )
            }
        ],
        []
    )

    const table = useReactTable({
        data: households,
        columns,
        state: {
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {
            // Custom filter to search across ALL columns
            const searchValue = filterValue.toLowerCase()

            // Helper to check if a value matches
            const matches = (value) => {
                if (!value) return false
                if (Array.isArray(value)) {
                    return value.some(item => String(item).toLowerCase().includes(searchValue))
                }
                return String(value).toLowerCase().includes(searchValue)
            }

            // Search across all relevant fields
            return (
                matches(row.original.house_number) ||
                matches(row.original.head_name) ||
                matches(row.original.head_gender) ||
                matches(row.original.mobile_numbers) ||
                matches(row.original.sons_names) ||
                matches(row.original.daughters_names) ||
                matches(row.original.daughter_in_law_names) ||
                matches(row.original.grandchildren_names) ||
                matches(row.original.ration_card_status) ||
                matches(row.original.schemes) ||
                matches(row.original.postal_schemes) ||
                matches(row.original.pensioner_info) ||
                matches(row.original.immigration_details) ||
                matches(row.original.notes)
            )
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 20
            }
        }
    })

    const handleEdit = (household) => {
        setEditingHousehold(household)
        setIsFormOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this household?')) {
            await deleteHousehold(id)
        }
    }

    const handleFormClose = () => {
        setIsFormOpen(false)
        setEditingHousehold(null)
    }

    if (!selectedVillage) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500">Please select a village from the sidebar</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Households - {selectedVillage.name}
                    </h2>
                    <Button onClick={() => setIsFormOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Household
                    </Button>
                </div>
                <SearchBar
                    value={globalFilter ?? ''}
                    onChange={setGlobalFilter}
                    placeholder="Search across all fields..."
                    className="max-w-md"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                    No households found
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} results
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-700">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Form Modal */}
            <HouseholdForm
                isOpen={isFormOpen}
                onClose={handleFormClose}
                household={editingHousehold}
            />
        </div>
    )
}
