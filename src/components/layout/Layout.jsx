import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import MobileHeader from './MobileHeader'

export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile Header */}
            <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

            {/* Sidebar - Desktop: always visible, Mobile: overlay */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Desktop Topbar - hidden on mobile */}
                <div className="hidden md:block">
                    <Topbar />
                </div>

                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
