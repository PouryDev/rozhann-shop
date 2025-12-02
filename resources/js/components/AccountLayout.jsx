import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function AccountLayout() {
    const navigate = useNavigate();

    const menuItems = [
        { path: '/account', icon: '👤', label: 'پروفایل', exact: true },
        { path: '/account/orders', icon: '📦', label: 'سفارش‌ها' },
        { path: '/account/addresses', icon: '📍', label: 'آدرس‌ها' },
    ];

    const handleLogout = async () => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            await fetch('/logout', {
                method: 'POST',
                headers: { 
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                credentials: 'same-origin'
            });
            window.__USER__ = null;
            window.dispatchEvent(new CustomEvent('user:updated', { detail: null }));
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
                {/* Mobile Horizontal Tabs */}
                <div className="md:hidden mb-6">
                    <div className="rounded-2xl p-2 bg-white shadow-lg border border-[var(--color-border-subtle)]">
                        <nav className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-hide">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.exact}
                                    className={({ isActive }) =>
                                        `flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
                                            isActive
                                                ? 'text-white shadow-md'
                                                : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)]'
                                        }`}
                                    style={({ isActive }) => isActive ? {
                                        background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))'
                                    } : {}}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-xs font-semibold whitespace-nowrap">{item.label}</span>
                                </NavLink>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                                <span className="text-xs font-semibold whitespace-nowrap">خروج</span>
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block md:col-span-1">
                        <div className="rounded-2xl p-4 bg-white shadow-lg border border-[var(--color-border-subtle)] sticky top-20">
                            <nav className="space-y-1">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.exact}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                                isActive
                                                    ? 'text-white shadow-md'
                                                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)]'
                                            }`
                                        }
                                        style={({ isActive }) => isActive ? {
                                            background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))'
                                        } : {}}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-semibold">{item.label}</span>
                                    </NavLink>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                                    <span className="font-semibold">خروج</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="md:col-span-3">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default AccountLayout;

