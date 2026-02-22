import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PRIMARY_DOMAIN = 'rozhann.ir';

function isPrimaryDomain() {
    if (typeof window === 'undefined') return true;
    return window.location.hostname === PRIMARY_DOMAIN;
}

function Layout({ children }) {
    const location = useLocation();
    const primaryDomain = isPrimaryDomain();
    const isStandalonePage = !primaryDomain || location.pathname === '/croccino';

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
            {!isStandalonePage && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 opacity-70"
                    style={{
                        background:
                            'radial-gradient(circle at 20% 20%, rgba(255,210,143,.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(190,229,201,.25), transparent 35%)',
                    }}
                />
            )}
            <div className="relative">
                {!isStandalonePage && <Header />}
                <main className="relative">{children}</main>
                {!isStandalonePage && <Footer />}
            </div>
        </div>
    );
}

export default Layout;
