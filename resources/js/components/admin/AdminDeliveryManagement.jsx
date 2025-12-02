import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/sanctumAuth';

function AdminDeliveryManagement() {
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingMethod, setEditingMethod] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        fee: '',
        is_active: true,
        sort_order: 0
    });

    useEffect(() => {
        fetchDeliveryMethods();
    }, []);

    const fetchDeliveryMethods = async () => {
        try {
            setLoading(true);
            const response = await apiRequest('/api/admin/delivery-methods');
            
            if (response.ok) {
                const data = await response.json();
                setDeliveryMethods(data.data);
            } else {
                setError('خطا در بارگذاری روش‌های ارسال');
            }
        } catch (err) {
            setError('خطا در ارتباط با سرور');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = editingMethod 
                ? `/api/admin/delivery-methods/${editingMethod.id}`
                : '/api/admin/delivery-methods';
            
            const method = editingMethod ? 'PUT' : 'POST';
            
            const response = await apiRequest(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await fetchDeliveryMethods();
                setShowForm(false);
                setEditingMethod(null);
                setFormData({
                    title: '',
                    fee: '',
                    is_active: true,
                    sort_order: 0
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'خطا در ذخیره روش ارسال');
            }
        } catch (err) {
            setError('خطا در ارتباط با سرور');
        }
    };

    const handleEdit = (method) => {
        setEditingMethod(method);
        setFormData({
            title: method.title,
            fee: method.fee.toString(),
            is_active: method.is_active,
            sort_order: method.sort_order
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('آیا مطمئن هستید که می‌خواهید این روش ارسال را حذف کنید؟')) {
            return;
        }

        try {
            const response = await apiRequest(`/api/admin/delivery-methods/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchDeliveryMethods();
            } else {
                setError('خطا در حذف روش ارسال');
            }
        } catch (err) {
            setError('خطا در ارتباط با سرور');
        }
    };

    const toggleStatus = async (method) => {
        try {
            const response = await apiRequest(`/api/admin/delivery-methods/${method.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...method,
                    is_active: !method.is_active
                }),
            });

            if (response.ok) {
                await fetchDeliveryMethods();
            } else {
                setError('خطا در تغییر وضعیت روش ارسال');
            }
        } catch (err) {
            setError('خطا در ارتباط با سرور');
        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingMethod(null);
        setFormData({
            title: '',
            fee: '',
            is_active: true,
            sort_order: 0
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] text-[var(--color-text)]">
                <div className="sticky top-0 z-50 bg-white border-b border-[var(--color-border-subtle)] px-4 py-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold text-[var(--color-text)]">روش‌های ارسال</h1>
                        <div className="w-16"></div>
                    </div>
                </div>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] text-[var(--color-text)]">
            {/* Mobile Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-[var(--color-border-subtle)] px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-[var(--color-text)]">روش‌های ارسال</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-[var(--color-text)] font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm"
                    >
                        افزودن
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-4">

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-red-600 text-sm">{error}</p>
                            <button
                                onClick={() => setError(null)}
                                className="text-red-600 hover:text-red-600 text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <div className="bg-white rounded-t-xl sm:rounded-xl p-6 w-full h-[90vh] sm:h-auto sm:max-w-md overflow-y-auto border-t sm:border border-[var(--color-border-subtle)] shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                                    {editingMethod ? 'ویرایش روش ارسال' : 'افزودن روش ارسال'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                                        عنوان روش ارسال
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full px-3 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-base"
                                        required
                                        placeholder="مثال: ارسال عادی"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                                        هزینه ارسال (تومان)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.fee}
                                        onChange={(e) => setFormData({...formData, fee: e.target.value})}
                                        className="w-full px-3 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-base"
                                        required
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">
                                        ترتیب نمایش
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.sort_order}
                                        onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                                        className="w-full px-3 py-3 bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-base"
                                        min="0"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex items-center p-3 bg-[var(--color-surface-alt)] rounded-lg border border-[var(--color-border-subtle)]">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                        className="w-5 h-5 text-[var(--color-primary-strong)] bg-[var(--color-surface)] border-[var(--color-border-subtle)] rounded focus:ring-[var(--color-primary)]"
                                    />
                                    <label htmlFor="is_active" className="mr-3 text-sm text-[var(--color-text-muted)]">
                                        فعال
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-base"
                                    >
                                        {editingMethod ? 'ویرایش' : 'افزودن'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface-alt-hover)] text-[var(--color-text)] font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-base border border-[var(--color-border-subtle)]"
                                    >
                                        انصراف
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delivery Methods List */}
                <div className="space-y-3">
                    {deliveryMethods.map((method) => (
                        <div key={method.id} className="bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-[var(--color-text)] font-semibold text-base mb-1">{method.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                                        <span>{method.fee.toLocaleString('fa-IR')} تومان</span>
                                        <span>ترتیب: {method.sort_order}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleStatus(method)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                            method.is_active
                                                ? 'bg-green-50 text-green-600 hover:bg-green-500/30'
                                                : 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
                                        }`}
                                    >
                                        {method.is_active ? 'فعال' : 'غیرفعال'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(method)}
                                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors py-2 px-3 rounded-lg text-sm font-medium"
                                >
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => handleDelete(method.id)}
                                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors py-2 px-3 rounded-lg text-sm font-medium"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {deliveryMethods.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-[var(--color-text-muted)] mb-4">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                            </svg>
                        </div>
                        <p className="text-[var(--color-text-muted)] text-lg mb-2">هیچ روش ارسالی یافت نشد</p>
                        <p className="text-[var(--color-text-muted)] text-sm">برای شروع، اولین روش ارسال را اضافه کنید</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDeliveryManagement;
