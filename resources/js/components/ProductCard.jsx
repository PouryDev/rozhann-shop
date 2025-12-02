import React, { useState } from 'react';
import ProductModal from './ProductModal';
import { apiRequest } from '../utils/sanctumAuth';
import { useCart } from '../contexts/CartContext';
import { calculateCampaignPrice } from '../utils/pricing';

function ProductCard({ product, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getProductQuantity } = useCart();

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    function formatPriceFa(value) {
        try { return Number(value || 0).toLocaleString('fa-IR'); } catch { return value; }
    }

    // Check if product is out of stock
    function isOutOfStock() {
        // For products with variants, check if at least one variant has stock
        if (product.has_variants || product.has_colors || product.has_sizes) {
            // If total_stock is available, use it (if > 0, product is available)
            if (product.total_stock !== undefined && product.total_stock !== null) {
                return product.total_stock <= 0;
            }
            // Check active_variants array if available
            if (product.active_variants && Array.isArray(product.active_variants)) {
                // Product is available if at least one variant has stock > 0
                const hasAvailableVariant = product.active_variants.some(variant => (variant.stock || 0) > 0);
                return !hasAvailableVariant; // Out of stock if no variant has stock
            }
            // If variants data is not loaded, check if product has any variants at all
            // In this case, we can't determine, so assume it's available (don't show out of stock)
            return false;
        }
        // For products without variants, check main stock
        return (product.stock || 0) <= 0;
    }

    const qtyInCart = getProductQuantity(product.id);
    const outOfStock = isOutOfStock();

    const increment = async (e) => {
        e.stopPropagation();
        
        // Check if product is out of stock
        if (isOutOfStock()) {
            window.dispatchEvent(new CustomEvent('toast:show', { detail: { type: 'error', message: 'محصول موجود نیست' } }));
            return;
        }
        
        if (product.has_variants || product.has_colors || product.has_sizes) {
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await apiRequest(`/api/cart/add/${product.slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: 1 })
            });
            if (!response.ok) throw new Error('failed');
            const data = await response.json();
            if (data && data.ok) {
                window.dispatchEvent(new Event('cart:update'));
                window.dispatchEvent(new CustomEvent('toast:show', { detail: { type: 'success', message: 'به سبد اضافه شد' } }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const decrement = async (e) => {
        e.stopPropagation();
        try {
            const summary = await apiRequest('/api/cart/json');
            if (!summary.ok) throw new Error('failed');
            const payload = await summary.json();
            const items = payload.items || [];
            const target = items.find((it) => String(it.product?.id) === String(product.id));
            if (!target) return;

            const removeRes = await apiRequest(`/api/cart/remove/${encodeURIComponent(target.key)}`, {
                method: 'DELETE'
            });
            if (!removeRes.ok) throw new Error('failed');
            let state = await removeRes.json();
            if ((target.quantity || 0) - 1 > 0) {
                const addRes = await apiRequest(`/api/cart/add/${product.slug}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: (target.quantity - 1) })
                });
                if (!addRes.ok) throw new Error('failed');
                state = await addRes.json();
            }
            if (state && state.ok) {
                window.dispatchEvent(new Event('cart:update'));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const primaryCampaign = product.campaigns && product.campaigns.length > 0 ? product.campaigns[0] : null;
    const campaignPrice = calculateCampaignPrice(product.price, primaryCampaign);

    return (
        <>
            <div
                className={`product-card group relative rounded-2xl overflow-hidden bg-white transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl`}
                style={{
                    animationDelay: `${index * 100}ms`,
                    border: isHovered ? '1px solid var(--color-primary)' : '1px solid var(--color-border-subtle)',
                    boxShadow: isHovered ? '0 20px 45px rgba(15,23,42,0.15)' : '0 14px 40px rgba(15,23,42,0.08)',
                    opacity: 1,
                    transform: 'translateY(0)'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                {/* Out of Stock Badge */}
                {outOfStock && (
                    <div className="absolute top-2 left-2 z-30">
                        <span className="px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap text-white bg-gray-600"
                            style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.35)' }}>
                            ناموجود
                        </span>
                    </div>
                )}
                
                {/* Campaign Badge */}
                {primaryCampaign && !outOfStock && (
                    <div className="absolute top-2 left-2 z-20">
                        <span className="px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap text-white"
                            style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 8px 20px rgba(244,172,63,0.35)' }}>
                            {primaryCampaign.badge_text ||
                                (primaryCampaign.type === 'percentage'
                                    ? `${primaryCampaign.discount_value}% تخفیف`
                                    : `${formatPriceFa(primaryCampaign.discount_value)} تومان`)}
                        </span>
                    </div>
                )}
                
                {/* Campaign Badge - Right side when out of stock badge is shown */}
                {primaryCampaign && outOfStock && (
                    <div className="absolute top-2 right-2 z-20">
                        <span className="px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap text-white"
                            style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 8px 20px rgba(244,172,63,0.35)' }}>
                            {primaryCampaign.badge_text ||
                                (primaryCampaign.type === 'percentage'
                                    ? `${primaryCampaign.discount_value}% تخفیف`
                                    : `${formatPriceFa(primaryCampaign.discount_value)} تومان`)}
                        </span>
                    </div>
                )}

                <div className="relative bg-[var(--color-surface-alt)]">
                    <img
                        src={/^https?:\/\//i.test(product.images?.[0]?.path) ? product.images[0].path : (product.images?.[0]?.path ? `/storage/${product.images[0].path}` : '/images/placeholder.jpg')}
                        alt={product.title}
                        className="w-full aspect-square object-cover transition duration-300 group-hover:scale-[1.02]"
                        onError={(e) => {
                            const img = e.currentTarget;
                            if (img.src.includes('/images/placeholder.jpg') || img.dataset.placeholderTried === 'true') {
                                img.style.display = 'none';
                                return;
                            }
                            img.dataset.placeholderTried = 'true';
                            img.src = '/images/placeholder.jpg';
                        }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 via-white/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 right-2 z-10">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-full px-1.5 py-1 border" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <button onClick={decrement} className="w-7 h-7 inline-flex items-center justify-center rounded-full text-[var(--color-text)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface)] text-xs">−</button>
                            <div className="min-w-[28px] text-center text-[var(--color-text)] text-[11px] bg-white rounded px-1 py-0.5">
                                {formatPriceFa(qtyInCart || 0)}
                            </div>
                            <button 
                                onClick={increment} 
                                disabled={outOfStock}
                                className={`w-7 h-7 inline-flex items-center justify-center rounded-full text-white text-xs ${
                                    outOfStock ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                                style={outOfStock 
                                    ? { background: '#6b7280' } 
                                    : { background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-3 md:p-3">
                    <h3 className="font-semibold text-[13px] md:text-base text-[var(--color-text)] line-clamp-2 min-h-[36px]">
                        {product.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                        {primaryCampaign ? (
                            <>
                                <span className="text-xs line-through text-[var(--color-text-muted)]">
                                    {formatPriceFa(campaignPrice.originalPrice)} تومان
                                </span>
                                <span className="text-sm font-bold" style={{ color: 'var(--color-primary-strong)' }}>
                                    {formatPriceFa(campaignPrice.finalPrice)} تومان
                                </span>
                            </>
                        ) : (
                            <span className="text-sm font-bold" style={{ color: 'var(--color-primary-strong)' }}>
                                {formatPriceFa(product.price)} تومان
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <ProductModal 
                product={product} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}

export default ProductCard;
