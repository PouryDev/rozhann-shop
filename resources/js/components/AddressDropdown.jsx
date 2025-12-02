import React from 'react';

function AddressDropdown({ addresses, selectedAddress, onSelect, onAddNew, loading = false }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (address) => {
        onSelect(address);
        setIsOpen(false);
    };

    const handleAddNew = () => {
        onAddNew();
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                disabled={loading}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-right text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(244, 172, 63, 0.1)', color: 'var(--color-primary)' }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="text-right">
                            {selectedAddress ? (
                                <>
                                    <div className="font-semibold text-[var(--color-text)] text-sm">
                                        {selectedAddress.title || 'آدرس انتخاب شده'}
                                    </div>
                                    <div className="text-xs text-[var(--color-text-muted)] truncate max-w-[200px]">
                                        {selectedAddress.address}
                                    </div>
                                </>
                            ) : addresses.length > 0 ? (
                                <div className="text-[var(--color-text-muted)] text-sm">انتخاب آدرس</div>
                            ) : (
                                <div className="text-[var(--color-text-muted)] text-sm">افزودن آدرس جدید</div>
                            )}
                        </div>
                    </div>
                    <svg 
                        className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-2xl overflow-hidden">
                    <div className="max-h-80 overflow-y-auto">
                        {addresses.length === 0 ? (
                            <div className="p-6 text-center">
                                <div className="w-16 h-16 bg-[var(--color-surface-alt)] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-[var(--color-text)] text-sm font-semibold mb-2">هنوز آدرسی اضافه نکرده‌اید</h3>
                                <p className="text-[var(--color-text-muted)] text-xs mb-4">اولین آدرس خود را اضافه کنید</p>
                            </div>
                        ) : (
                            addresses.map((address) => (
                                <button
                                    key={address.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleSelect(address);
                                    }}
                                    className={`w-full text-right p-4 hover:bg-[var(--color-surface-alt)] transition-colors border-b border-[var(--color-border-subtle)] last:border-b-0 ${
                                        selectedAddress?.id === address.id ? 'bg-[var(--color-primary)]/5' : ''
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(244, 172, 63, 0.1)', color: 'var(--color-primary)' }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="font-semibold text-[var(--color-text)] text-sm">
                                                    {address.title || 'آدرس'}
                                                </div>
                                                {address.is_default && (
                                                    <span className="text-white text-xs px-2 py-1 rounded-full" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}>
                                                        پیش‌فرض
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                                {address.address}
                                            </div>
                                            {(address.city || address.province) && (
                                                <div className="text-xs text-[var(--color-text-muted)] mt-1">
                                                    {[address.city, address.province].filter(Boolean).join('، ')}
                                                </div>
                                            )}
                                        </div>
                                        {selectedAddress?.id === address.id && (
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}>
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                    
                    {/* Add New Address Button */}
                    <div className="border-t border-[var(--color-border-subtle)] p-3">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddNew();
                            }}
                            className="w-full flex items-center justify-center gap-2 text-white rounded-lg py-2.5 px-4 transition-all duration-200" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-sm font-medium">افزودن آدرس جدید</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

export default AddressDropdown;
