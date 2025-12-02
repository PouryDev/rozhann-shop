import React from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/sanctumAuth';
import VariantSelectorModal from './VariantSelectorModal';

function CartPage() {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [originalTotal, setOriginalTotal] = React.useState(0);
    const [totalDiscount, setTotalDiscount] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [removingKey, setRemovingKey] = React.useState(null);
    const [variantModal, setVariantModal] = React.useState({ isOpen: false, product: null, quantity: 1 });

    const fetchCart = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiRequest('/api/cart/json');
            if (!res.ok) throw new Error('failed');
            const data = await res.json();
            setItems(data.items || []);
            setTotal(data.total || 0);
            setOriginalTotal(data.original_total || data.total || 0);
            setTotalDiscount(data.total_discount || 0);
            setCount(data.count || 0);
            window.dispatchEvent(new Event('cart:update'));
        } catch (e) {
            setError('خطا در دریافت سبد خرید');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    async function handleRemove(cartKey) {
        setRemovingKey(cartKey);
        try {
            const res = await apiRequest(`/api/cart/remove/${encodeURIComponent(cartKey)}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('failed');
            const data = await res.json();
            setItems(data.items || []);
            setTotal(data.total || 0);
            setOriginalTotal(data.original_total || data.total || 0);
            setTotalDiscount(data.total_discount || 0);
            setCount(data.count || 0);
            window.dispatchEvent(new Event('cart:update'));
        } catch (e) {
        } finally {
            setRemovingKey(null);
        }
    }

    async function decrementItem(item) {
        setRemovingKey(item.key);
        try {
            const removeRes = await apiRequest(`/api/cart/remove/${encodeURIComponent(item.key)}`, {
                method: 'DELETE',
            });
            if (!removeRes.ok) throw new Error('failed');
            let state = await removeRes.json();
            if ((item.quantity || 0) - 1 > 0) {
                const addRes = await apiRequest(`/api/cart/add/${item.slug}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        quantity: (item.quantity - 1),
                        color_id: item.color_id || null,
                        size_id: item.size_id || null
                    })
                });
                if (!addRes.ok) throw new Error('failed');
                state = await addRes.json();
            }
            setItems(state.items || []);
            setTotal(state.total || 0);
            setOriginalTotal(state.original_total || state.total || 0);
            setTotalDiscount(state.total_discount || 0);
            setCount(state.count || 0);
            try { localStorage.setItem('cart', JSON.stringify(state.items || [])); } catch { }
            window.dispatchEvent(new Event('cart:update'));
        } catch (e) {
        } finally {
            setRemovingKey(null);
        }
    }

    async function incrementItem(item) {
        setRemovingKey(item.key);
        try {
            const res = await apiRequest(`/api/cart/add/${item.slug}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: 1 })
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                if (res.status === 400 && errorData.message?.includes('رنگ و سایز')) {
                    setVariantModal({
                        isOpen: true,
                        product: item.product,
                        quantity: item.quantity + 1
                    });
                    return;
                }
                throw new Error('failed');
            }
            
            const state = await res.json();
            setItems(state.items || []);
            setTotal(state.total || 0);
            setOriginalTotal(state.original_total || state.total || 0);
            setTotalDiscount(state.total_discount || 0);
            setCount(state.count || 0);
            try { localStorage.setItem('cart', JSON.stringify(state.items || [])); } catch { }
            window.dispatchEvent(new Event('cart:update'));
        } catch (e) {
            console.error('Increment error:', e);
        } finally {
            setRemovingKey(null);
        }
    }

    function formatPrice(value) {
        try { return Number(value || 0).toLocaleString('fa-IR'); } catch { return value; }
    }

    return (
        <div className="min-h-screen bg-[var(--color-surface)]">
            <div
                className="sticky top-0 z-30 bg-white/90 backdrop-blur"
                style={{ borderBottom: '1px solid var(--color-border-subtle)', boxShadow: '0 10px 25px rgba(15,23,42,0.06)' }}
            >
                <div className="max-w-md mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-[var(--color-text)] text-center">سبد خرید</h1>
                </div>
            </div>

            <div className="max-w-md mx-auto px-4 py-6 text-[var(--color-text)]">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="text-red-400 mb-2">⚠️</div>
                        <div className="text-red-500">{error}</div>
                    </div>
                ) : count === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🛒</div>
                        <div className="text-lg text-[var(--color-text-muted)]">سبد خرید خالی است</div>
                        <Link to="/" className="inline-block mt-4 text-white px-6 py-2 rounded-full text-sm font-medium transition-all"
                            style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 12px 30px rgba(244,172,63,0.3)' }}>
                            شروع خرید
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div key={item.key} className="rounded-2xl p-4 bg-white shadow border" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                        style={{ background: 'var(--color-surface-alt)' }}>
                                        🛍️
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm leading-tight truncate">{item.title}</h3>
                                        {item.variant_display_name && (
                                            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.variant_display_name}</div>
                                        )}
                                        {item.campaign && (
                                            <div className="text-xs text-[var(--color-accent)] mt-0.5">🎉 {item.campaign.name}</div>
                                        )}
                                        <div className="flex items-center gap-2 mt-1 text-xs">
                                            {item.original_price && item.original_price !== item.price && (
                                                <span className="text-[var(--color-text-muted)] line-through">{formatPrice(item.original_price)}</span>
                                            )}
                                            <span style={{ color: 'var(--color-primary-strong)' }}>{formatPrice(item.price)} تومان</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="font-bold text-sm">{formatPrice(item.total)} تومان</div>
                                        {item.total_discount > 0 && (
                                            <div className="text-xs text-[var(--color-accent)]">صرفه‌جویی: {formatPrice(item.total_discount)}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => decrementItem(item)}
                                            disabled={removingKey === item.key}
                                            className="w-8 h-8 rounded-full bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface)] text-sm disabled:opacity-50 flex items-center justify-center"
                                        >
                                            −
                                        </button>
                                        <div className="w-8 text-center text-sm font-medium">
                                            {item.quantity}
                                        </div>
                                        <button
                                            onClick={() => incrementItem(item)}
                                            disabled={removingKey === item.key}
                                            className="w-8 h-8 rounded-full text-white text-sm disabled:opacity-50 flex items-center justify-center"
                                            style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(item.key)}
                                        disabled={removingKey === item.key}
                                        className="text-xs px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                                        style={{ color: '#f87171', background: 'rgba(248,113,113,0.08)' }}
                                    >
                                        {removingKey === item.key ? 'حذف...' : 'حذف'}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {totalDiscount > 0 && (
                            <div className="rounded-2xl p-4 border" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-surface-alt)' }}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🎉</span>
                                        <span className="font-medium">تخفیف کمپین</span>
                                    </div>
                                    <div className="font-bold" style={{ color: 'var(--color-accent)' }}>{formatPrice(totalDiscount)} تومان</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {count > 0 && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur"
                    style={{ borderTop: '1px solid var(--color-border-subtle)', boxShadow: '0 -10px 30px rgba(15,23,42,0.08)' }}
                >
                    <div className="max-w-md mx-auto px-4 py-4">
                        <div className="space-y-2">
                            {totalDiscount > 0 && (
                                <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
                                    <span>قیمت اصلی:</span>
                                    <span className="line-through">{formatPrice(originalTotal)} تومان</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-xs text-[var(--color-text-muted)]">جمع کل</div>
                                    <div className="font-bold text-lg">{formatPrice(total)} تومان</div>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="rounded-2xl py-3 px-8 font-semibold text-white transition-transform"
                                    style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 15px 30px rgba(244,172,63,0.3)' }}
                                >
                                    ادامه خرید
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <VariantSelectorModal
                product={variantModal.product}
                isOpen={variantModal.isOpen}
                onClose={() => setVariantModal({ isOpen: false, product: null, quantity: 1 })}
                onSuccess={() => {
                    fetchCart();
                }}
                currentQuantity={variantModal.quantity}
            />
        </div>
    );
}

export default CartPage;
