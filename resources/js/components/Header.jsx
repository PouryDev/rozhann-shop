import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import CheckoutAuthModal from "./CheckoutAuthModal";
import SearchDropdown from "./SearchDropdown";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAdmin } = useAuth();
    const { cartData } = useCart();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    // Check if user is in account area
    const isInAccountArea = location.pathname.startsWith("/account");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header
                className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl"
                style={{
                    borderBottom: "1px solid var(--color-border-subtle)",
                    boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors"
                        >
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="h-8 w-8"
                            />
                            <span className="font-bold text-xl">روژان</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8 text-sm text-[var(--color-text)]">
                            <Link
                                to="/"
                                className="transition-colors opacity-80 hover:opacity-100 hover:text-[var(--color-primary-strong)]"
                            >
                                خانه
                            </Link>
                            <Link
                                to="/products"
                                className="transition-colors opacity-80 hover:opacity-100 hover:text-[var(--color-primary-strong)]"
                            >
                                محصولات
                            </Link>
                            <Link
                                to="/about"
                                className="transition-colors opacity-80 hover:opacity-100 hover:text-[var(--color-primary-strong)]"
                            >
                                درباره ما
                            </Link>
                            <Link
                                to="/contact"
                                className="transition-colors opacity-80 hover:opacity-100 hover:text-[var(--color-primary-strong)]"
                            >
                                تماس
                            </Link>
                        </nav>

                        {/* Search Bar - Desktop */}
                        <div
                            className="hidden md:block w-80 relative"
                            style={{ zIndex: 99999 }}
                        >
                            <SearchDropdown />
                        </div>

                        {/* Right side items */}
                        <div className="flex items-center space-x-4">
                            {/* Cart */}
                            <Link
                                to="/cart"
                                className="relative group inline-flex items-center justify-center text-[var(--color-text)]"
                                aria-label="Cart"
                            >
                                <span className="absolute inset-0 rounded-full transition-colors group-hover:bg-[var(--color-surface-alt)]/80"></span>
                                <svg
                                    className="w-6 h-6 relative z-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 10-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
                                    />
                                </svg>
                                {cartData.count > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 z-20 text-white text-[10px] rounded-full h-5 min-w-5 px-1 flex items-center justify-center shadow"
                                        style={{
                                            background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))",
                                            boxShadow: "0 6px 15px rgba(244,172,63,0.35)",
                                        }}
                                    >
                                        {cartData.count}
                                    </span>
                                )}
                            </Link>

                            {/* User Menu - Only show when not in account area */}
                            {!isInAccountArea && (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setUserMenuOpen((v) => !v)
                                        }
                                        className="flex items-center space-x-2 text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <span className="hidden sm:block">
                                            حساب کاربری
                                        </span>
                                    </button>
                                    {userMenuOpen && (
                                        <div
                                            className="absolute left-0 mt-2 w-56 rounded-2xl p-2 shadow-xl"
                                            style={{
                                                zIndex: 9999,
                                                background: "rgba(255,255,255,0.97)",
                                                border: "1px solid var(--color-border-subtle)",
                                                backdropFilter: "blur(10px)",
                                            }}
                                        >
                                            {user ? (
                                                <>
                                                    <Link
                                                        to="/account"
                                                        className="block px-3 py-2 rounded-lg hover:bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)]"
                                                        onClick={() =>
                                                            setUserMenuOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        پنل کاربری
                                                    </Link>
                                                    {isAdmin && (
                                                        <Link
                                                            to="/admin"
                                                            className="block px-3 py-2 rounded-lg hover:bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)]"
                                                            onClick={() =>
                                                                setUserMenuOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            پنل ادمین
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={async () => {
                                                            await logout();
                                                            setUserMenuOpen(
                                                                false
                                                            );
                                                        }}
                                                        className="w-full text-right px-3 py-2 rounded-lg hover:bg-[var(--color-surface-alt)] text-sm text-red-500"
                                                    >
                                                        خروج
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            setAuthOpen(true);
                                                            setUserMenuOpen(
                                                                false
                                                            );
                                                        }}
                                                        className="w-full text-right px-3 py-2 rounded-lg hover:bg-[var(--color-surface-alt)] text-sm text-[var(--color-text)]"
                                                    >
                                                        ورود
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setAuthOpen(true);
                                                            setUserMenuOpen(
                                                                false
                                                            );
                                                        }}
                                                        className="w-full text-right px-3 py-2 rounded-lg text-sm text-white"
                                                        style={{
                                                            background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))",
                                                        }}
                                                    >
                                                        ثبت‌نام
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Mobile menu button */}
                            <button
                                onClick={toggleMenu}
                                className="md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary-strong)] transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div
                        className={`md:hidden absolute left-0 right-0 top-16 z-40 transition-all duration-200 ${
                            isMenuOpen
                                ? "opacity-100 translate-y-0"
                                : "pointer-events-none opacity-0 -translate-y-2"
                        }`}
                    >
                        <div
                            className="bg-white shadow-xl"
                            style={{ borderTop: "1px solid var(--color-border-subtle)" }}
                        >
                            {/* Mobile Search */}
                            <div
                                className="px-4 py-3 border-b"
                                style={{ borderColor: "var(--color-border-subtle)", zIndex: 99999 }}
                            >
                                <SearchDropdown />
                            </div>

                            <nav className="flex flex-col py-3 text-[var(--color-text)]">
                                <Link
                                    to="/"
                                    className="px-4 py-2 hover:bg-[var(--color-surface-alt)] transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    خانه
                                </Link>
                                <Link
                                    to="/products"
                                    className="px-4 py-2 hover:bg-[var(--color-surface-alt)] transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    محصولات
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-4 py-2 hover:bg-[var(--color-surface-alt)] transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    درباره ما
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-4 py-2 hover:bg-[var(--color-surface-alt)] transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    تماس
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <CheckoutAuthModal
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                onSuccess={(u) => {
                    setAuthOpen(false);
                    try {
                        window.dispatchEvent(
                            new CustomEvent("toast:show", {
                                detail: {
                                    type: "success",
                                    message: "ورود موفقیت‌آمیز بود",
                                },
                            })
                        );
                    } catch {}
                }}
            />
        </>
    );
}

export default Header;
