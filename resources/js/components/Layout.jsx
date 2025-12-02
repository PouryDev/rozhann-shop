import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 opacity-70"
                style={{
                    background:
                        'radial-gradient(circle at 20% 20%, rgba(255,210,143,.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(190,229,201,.25), transparent 35%)',
                }}
            />
            <div className="relative">
                <Header />
                <main className="relative">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
