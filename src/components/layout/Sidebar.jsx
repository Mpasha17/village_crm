import { useEffect } from 'react'
import { MapPin, X } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { cn } from '../../lib/utils'

export default function Sidebar({ isOpen, onClose }) {
    const { villages, selectedVillage, selectVillage, fetchVillages } = useStore()

    useEffect(() => {
        fetchVillages()
    }, [fetchVillages])

    const handleVillageSelect = (village) => {
        selectVillage(village)
        // Close sidebar on mobile after selection
        if (window.innerWidth < 768) {
            onClose()
        }
    }

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'bg-white border-r border-gray-200 h-screen z-50 transition-transform duration-300',
                    // Mobile: fixed overlay, hidden by default
                    'fixed top-0 left-0 w-64',
                    // Desktop: static, always visible
                    'md:static md:block',
                    // Show/hide based on isOpen state (mobile only)
                    isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                )}
            >
                <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Village CRM</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Household Data Management</p>
                    </div>
                    {/* Close button - only on mobile */}
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                <nav className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Villages
                    </h2>
                    <ul className="space-y-1">
                        {villages.map((village) => (
                            <li key={village.id}>
                                <button
                                    onClick={() => handleVillageSelect(village)}
                                    className={cn(
                                        'w-full flex items-center space-x-3 px-3 py-2.5 sm:py-2 rounded-lg transition-colors text-left',
                                        'hover:bg-gray-100 active:bg-gray-200',
                                        selectedVillage?.id === village.id
                                            ? 'bg-primary-50 text-primary-700 font-medium'
                                            : 'text-gray-700'
                                    )}
                                >
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate text-sm sm:text-base">{village.name}</span>
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
        </>
    )
}
