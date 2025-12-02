import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernSelect from './ModernSelect';
import { adminApiRequest } from '../../utils/adminApi';

function AdminOrderManagement() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const res = await adminApiRequest('/orders');
                
                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        setOrders(data.data);
                    }
                }
            } catch (error) {
                console.error('Failed to load orders:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const formatPrice = (value) => {
        try { 
            return Number(value || 0).toLocaleString('fa-IR'); 
        } catch { 
            return value || '0'; 
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'processing': return 'bg-blue-50 text-blue-600 border-blue-500/30';
            case 'shipped': return 'bg-[var(--color-primary)]/5 text-[var(--color-primary-strong)] border-[var(--color-primary)]/30';
            case 'delivered': return 'bg-green-50 text-green-600 border-green-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-600 border-red-500/30';
            default: return 'bg-gray-500/20 text-[var(--color-text-muted)] border-gray-500/30';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'در انتظار';
            case 'confirmed': return 'در حال آماده سازی';
            case 'processing': return 'در حال پردازش';
            case 'shipped': return 'ارسال شده';
            case 'delivered': return 'تحویل داده شده';
            case 'cancelled': return 'لغو شده';
            default: return status;
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const res = await adminApiRequest(`/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                setOrders(orders.map(order => 
                    order.id === orderId 
                        ? { ...order, status: newStatus }
                        : order
                ));
                window.dispatchEvent(new CustomEvent('toast:show', { 
                    detail: { type: 'success', message: 'وضعیت سفارش به‌روزرسانی شد' } 
                }));
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
            window.dispatchEvent(new CustomEvent('toast:show', { 
                detail: { type: 'error', message: 'خطا در به‌روزرسانی وضعیت' } 
            }));
        }
    };

    const filteredOrders = orders.filter(order => 
        filterStatus === 'all' || order.status === filterStatus
    );

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-center min-h-96">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[var(--color-text-muted)]">در حال بارگذاری...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">مدیریت سفارش‌ها</h1>
                        <p className="text-[var(--color-text-muted)]">مشاهده و مدیریت سفارش‌های مشتریان</p>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-xl border border-[var(--color-border-subtle)] p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-48">
                        <ModernSelect
                            value={filterStatus}
                            onChange={(value) => setFilterStatus(value)}
                            options={[
                                { value: 'all', label: 'همه سفارش‌ها' },
                                { value: 'pending', label: 'در انتظار' },
                                { value: 'processing', label: 'در حال پردازش' },
                                { value: 'shipped', label: 'ارسال شده' },
                                { value: 'delivered', label: 'تحویل داده شده' },
                                { value: 'cancelled', label: 'لغو شده' }
                            ]}
                            placeholder="فیلتر وضعیت"
                        />
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl border border-[var(--color-border-subtle)] shadow-2xl p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            {/* Order Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="text-[var(--color-text)] font-bold text-xl">سفارش #{order.id}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </span>
                                </div>

                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-[var(--color-text-muted)] text-sm">مشتری</p>
                                        <p className="text-[var(--color-text)] font-medium">{order.user?.name || 'نامشخص'}</p>
                                        <p className="text-[var(--color-text-muted)] text-sm">{order.user?.phone || order.user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--color-text-muted)] text-sm">تاریخ سفارش</p>
                                        <p className="text-[var(--color-text)] font-medium">
                                            {new Date(order.created_at).toLocaleDateString('fa-IR')}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-4">
                                    <p className="text-[var(--color-text-muted)] text-sm mb-2">محصولات سفارش:</p>
                                    <div className="space-y-2">
                                        {order.items?.map((item, index) => (
                                            <div key={index} className="bg-[var(--color-surface-alt)] rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center space-x-3 space-x-reverse">
                                                    {item.product?.images && item.product.images.length > 0 ? (
                                                        <img 
                                                            src={item.product.images[0].url} 
                                                            alt={item.product.title}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-sm">📦</div>
                                                    )}
                                                    <div>
                                                        <p className="text-[var(--color-text)] font-medium">{item.product?.title}</p>
                                                        <p className="text-[var(--color-text-muted)] text-sm">
                                                            تعداد: {item.quantity} • 
                                                            {item.color && ` رنگ: ${item.color.name}`} • 
                                                            {item.size && ` سایز: ${item.size.name}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-[var(--color-primary-strong)] font-medium">
                                                    {formatPrice(item.price)} تومان
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-[var(--color-text-muted)] text-sm">مبلغ کل</p>
                                        <p className="text-[var(--color-text)] font-bold text-lg">{formatPrice(order.total_amount)} تومان</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--color-text-muted)] text-sm">هزینه ارسال</p>
                                        <p className="text-[var(--color-text)] font-medium">{formatPrice(order.delivery_fee || 0)} تومان</p>
                                    </div>
                                    <div>
                                        <p className="text-[var(--color-text-muted)] text-sm">روش ارسال</p>
                                        <p className="text-[var(--color-text)] font-medium">{order.delivery_method?.name || 'نامشخص'}</p>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                {order.delivery_address && (
                                    <div className="mb-4">
                                        <p className="text-[var(--color-text-muted)] text-sm mb-2">آدرس تحویل:</p>
                                        <div className="bg-[var(--color-surface-alt)] rounded-lg p-3">
                                            <p className="text-[var(--color-text)]">{order.delivery_address.address}</p>
                                            <p className="text-[var(--color-text-muted)] text-sm">
                                                {order.delivery_address.city}، {order.delivery_address.province}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Payment Info */}
                                {order.payment_receipt && (
                                    <div className="mb-4">
                                        <p className="text-[var(--color-text-muted)] text-sm mb-2">فیش واریزی:</p>
                                        <div className="bg-[var(--color-surface-alt)] rounded-lg p-3">
                                            <img 
                                                src={order.payment_receipt} 
                                                alt="Payment Receipt"
                                                className="w-32 h-32 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                                                onClick={() => window.open(order.payment_receipt, '_blank')}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                                >
                                    مشاهده جزئیات
                                </button>
                                
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'processing')}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                                    >
                                        تایید سفارش
                                    </button>
                                )}
                                
                                {order.status === 'processing' && (
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                                        className="text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                                        style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}
                                    >
                                        ارسال سفارش
                                    </button>
                                )}
                                
                                {order.status === 'shipped' && (
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                                    >
                                        تحویل داده شد
                                    </button>
                                )}
                                
                                {(order.status === 'pending' || order.status === 'processing') && (
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-sm"
                                    >
                                        لغو سفارش
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && !loading && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-[var(--color-surface-alt)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-[var(--color-text)] text-xl font-semibold mb-2">سفارشی یافت نشد</h3>
                    <p className="text-[var(--color-text-muted)]">
                        {filterStatus !== 'all' 
                            ? 'هیچ سفارشی با وضعیت انتخابی یافت نشد' 
                            : 'هنوز سفارشی ثبت نشده است'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}

export default AdminOrderManagement;
