import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Home, ShoppingBag, LayoutGrid, Plus } from 'lucide-react';

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1e2235] text-white flex flex-col shrink-0 flex-none">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6">
                    <div className="flex items-center gap-2">
                        <span className="text-white text-xl font-bold tracking-tight">Productr</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#F16521]">
                            <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="3" />
                            <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>
                </div>

                {/* Global Sidebar Search */}
                <div className="px-4 py-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-[#2a2e45] text-sm text-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/dashboard' ? 'bg-[#2a2e45] text-white' : 'text-gray-400 hover:bg-[#2a2e45] hover:text-white'
                            }`}
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                    <Link
                        to="/dashboard/products"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname.includes('/products') ? 'bg-[#2a2e45] text-white' : 'text-gray-400 hover:bg-[#2a2e45] hover:text-white'
                            }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Products
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#F4F6F9]">
                {/* Top Header */}
                <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-gray-200 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-3 text-gray-800 font-medium">
                        {location.pathname.includes('products') ? (
                            <>
                                <ShoppingBag className="w-4 h-4 text-gray-500" />
                                <span>Products</span>
                            </>
                        ) : (
                            <>
                                <Home className="w-4 h-4 text-gray-500" />
                                <span>Home</span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative w-72 hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Services, Products"
                                className="w-full bg-gray-100 text-sm text-gray-700 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Avatar Dropdown Area */}
                        <div className="flex items-center gap-2 cursor-pointer border-l border-gray-200 pl-6">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
