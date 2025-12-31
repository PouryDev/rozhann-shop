import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer
            className="mt-20"
            style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(245,240,233,0.9))',
                borderTop: '1px solid var(--color-border-subtle)',
                boxShadow: '0 -20px 40px rgba(15,23,42,0.05)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[var(--color-text)]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <img src="/images/logo.png" alt="Logo" className="h-11 w-21"/>
                            <span className="font-bold text-xl">روژان</span>
                            <a referrerPolicy="origin" target="_blank"
                               href="https://trustseal.enamad.ir/?id=694869&Code=166I1OxC35qXk5Zi9blHVPciLamUaK54"><img
                                referrerPolicy="origin"
                                src="https://trustseal.enamad.ir/logo.aspx?id=694869&Code=166I1OxC35qXk5Zi9blHVPciLamUaK54"
                                alt="" style={{ cursor: 'pointer' }} code="166I1OxC35qXk5Zi9blHVPciLamUaK54"/></a>
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] mb-4">
                            فروشگاه آنلاین لباس با کیفیت و استایل مینیمال
                        </p>
                        <div className="flex space-x-4 text-[var(--color-text)]">
                            <a
                                href="https://instagram.com/rozhan_shopp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-[var(--color-primary-strong)]"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-[var(--color-text)]">لینک‌های سریع</h3>
                        <ul className="space-y-2 text-[var(--color-text)]">
                            <li>
                                <Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    خانه
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    محصولات
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    درباره ما
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    تماس
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold mb-4 text-[var(--color-text)]">خدمات مشتری</h3>
                        <ul className="space-y-2 text-[var(--color-text)]">
                            <li>
                                <Link to="/account" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    حساب کاربری
                                </Link>
                            </li>
                            <li>
                                <Link to="/account/orders" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    سفارشات
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    ارسال و تحویل
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-strong)] transition-colors">
                                    بازگردانی
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 text-center text-sm text-[var(--color-text-muted)]" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                    <p>© 2024 روژان. تمامی حقوق محفوظ است.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
