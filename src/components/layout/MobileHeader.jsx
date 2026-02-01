import { Menu, X } from 'lucide-react'

export default function MobileHeader({ onMenuClick }) {
    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div>
                <h1 className="text-lg font-bold text-gray-900">Village CRM</h1>
                <p className="text-xs text-gray-500">Household Data</p>
            </div>
            <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>
        </div>
    )
}
