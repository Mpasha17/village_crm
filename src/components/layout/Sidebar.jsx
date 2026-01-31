import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../lib/utils'

export default function Sidebar() {
    const { villages, selectedVillage, selectVillage, fetchVillages } = useStore()

    useEffect(() => {
        fetchVillages()
    }, [fetchVillages])

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Village CRM</h1>
                <p className="text-sm text-gray-500 mt-1">Household Data Management</p>
            </div>

            <nav className="p-4">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Villages
                </h2>
                <ul className="space-y-1">
                    {villages.map((village) => (
                        <li key={village.id}>
                            <button
                                onClick={() => selectVillage(village)}
                                className={cn(
                                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                                    'hover:bg-gray-100',
                                    selectedVillage?.id === village.id
                                        ? 'bg-primary-50 text-primary-700 font-medium'
                                        : 'text-gray-700'
                                )}
                            >
                                <MapPin className="w-4 h-4" />
                                <span className="truncate">{village.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {villages.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                        No villages found
                    </p>
                )}
            </nav>
        </aside>
    )
}
