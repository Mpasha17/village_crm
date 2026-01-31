import { Link, useLocation } from 'react-router-dom'
import { Home, Upload } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function Topbar() {
    const location = useLocation()

    const navItems = [
        { path: '/', label: 'Dashboard', icon: Home },
        { path: '/import', label: 'Import Data', icon: Upload }
    ]

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-6 py-4">
                <nav className="flex items-center space-x-6">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className={cn(
                                'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                                'hover:bg-gray-100',
                                location.pathname === path
                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                    : 'text-gray-600'
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
