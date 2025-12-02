import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import LoadingSpinner from "./LoadingSpinner";

function AccountOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    useSeo({
        title: "سفارش‌های من - فروشگاه روژان",
        description: "مشاهده و پیگیری سفارش‌ها",
        canonical: window.location.origin + "/account/orders",
    });

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/account/orders", {
                headers: { Accept: "application/json" },
                credentials: "same-origin",
            });
            if (!res.ok) throw new Error("failed");
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (v) => {
        try {
            return Number(v || 0).toLocaleString("fa-IR");
        } catch {
            return v;
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: {
                text: "در انتظار پرداخت",
                class: "bg-yellow-500/20 text-yellow-300",
            },
            confirmed: {
                text: "تایید شده",
                class: "bg-emerald-500/20 text-emerald-300",
            },
            paid: { text: "پرداخت شده", class: "bg-blue-500/20 text-blue-300" },
            processing: {
                text: "در حال پردازش",
                class: "bg-purple-500/20 text-purple-300",
            },
            shipped: {
                text: "ارسال شده",
                class: "bg-cyan-500/20 text-cyan-300",
            },
            delivered: {
                text: "تحویل داده شده",
                class: "bg-green-500/20 text-green-300",
            },
            cancelled: { text: "لغو شده", class: "bg-red-500/20 text-red-300" },
        };
        return badges[status] || badges.pending;
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <LoadingSpinner />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="rounded-2xl p-8 bg-white shadow-lg border border-[var(--color-border-subtle)] text-center">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                    سفارشی ثبت نشده
                </h3>
                <p className="text-[var(--color-text-muted)] mb-6">هنوز سفارشی ثبت نکرده‌اید</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-lg text-white font-semibold transition" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}
                >
                    شروع خرید
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[var(--color-text)]">سفارش‌های من</h2>
                <span className="text-sm text-[var(--color-text-muted)]">
                    {orders.length} سفارش
                </span>
            </div>

            {orders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                    <div
                        key={order.id}
                        className="rounded-2xl p-4 md:p-5 bg-white shadow-lg border border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/30 transition"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(244, 172, 63, 0.1)', color: 'var(--color-primary)' }}>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-[var(--color-text)] font-semibold">
                                        سفارش #{order.id}
                                    </div>
                                    <div className="text-xs text-[var(--color-text-muted)]">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString("fa-IR")}
                                    </div>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.class}`}
                            >
                                {badge.text}
                            </span>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                            {order.items?.slice(0, 2).map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 bg-[var(--color-surface-alt)] rounded-lg p-2"
                                >
                                    <img
                                        src={
                                            item.product_image ||
                                            "/images/placeholder.jpg"
                                        }
                                        alt={item.product_title}
                                        className="w-12 h-12 rounded object-cover"
                                        onError={(e) => {
                                            const img = e.currentTarget;
                                            if (
                                                img.src.includes(
                                                    "/images/placeholder.jpg"
                                                ) ||
                                                img.dataset.placeholderTried ===
                                                    "true"
                                            ) {
                                                img.style.display = "none";
                                                return;
                                            }
                                            img.dataset.placeholderTried =
                                                "true";
                                            img.src = "/images/placeholder.jpg";
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[var(--color-text)] text-sm truncate">
                                            {item.product_title}
                                        </div>
                                        <div className="text-xs text-[var(--color-text-muted)]">
                                            تعداد: {formatPrice(item.quantity)}
                                        </div>
                                    </div>
                                    <div className="text-[var(--color-primary-strong)] text-sm font-semibold whitespace-nowrap">
                                        {formatPrice(item.unit_price)} تومان
                                    </div>
                                </div>
                            ))}
                            {order.items?.length > 2 && (
                                <div className="text-center text-xs text-[var(--color-text-muted)]">
                                    و {formatPrice(order.items.length - 2)}{" "}
                                    محصول دیگر
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)]">
                            <div className="text-[var(--color-text-muted)] text-sm">مجموع</div>
                            <div className="text-[var(--color-text)] font-bold text-lg">
                                {formatPrice(order.final_amount)} تومان
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-2">
                            <Link
                                to={`/account/orders/${order.id}`}
                                className="flex-1 text-center px-4 py-2 rounded-lg bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface-alt)]/80 text-[var(--color-text)] text-sm font-semibold transition border border-[var(--color-border-subtle)]"
                            >
                                جزئیات سفارش
                            </Link>
                            {order.invoice && (
                                <Link
                                    to={`/account/invoices/${order.invoice.id}`}
                                    className="flex-1 text-center px-4 py-2 rounded-lg text-white text-sm font-semibold transition" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' }}
                                >
                                    مشاهده فاکتور
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AccountOrders;
