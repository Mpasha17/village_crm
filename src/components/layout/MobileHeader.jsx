import { Menu } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function MobileHeader({ onMenuClick }) {
    const { selectedVillage } = useStore()

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex-1">
                <h1 className="text-lg font-bold text-gray-900">Village CRM</h1>
                {selectedVillage && (
                    <p className="text-xs text-primary-600 font-medium">{selectedVillage.name}</p>
                )}
            </div>
            <button
                onClick={onMenuClick}
                className="p-2.5 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors border border-primary-200"
                aria-label="Open villages menu"
            >
                <Menu className="w-5 h-5 text-primary-700" />
            </button>
        </div>
    )
}
