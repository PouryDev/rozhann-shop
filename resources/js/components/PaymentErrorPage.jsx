import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function PaymentErrorPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    const message =
        searchParams.get("message") || "پرداخت انجام نشد یا توسط کاربر لغو شد";

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            navigate("/checkout");
        }
    }, [countdown, navigate]);

    return (
        <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl border shadow-2xl p-8 text-center" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                        style={{ background: 'linear-gradient(120deg, #f87171, #fb923c)' }}>
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                        پرداخت ناموفق بود
                    </h1>

                    <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                        {message}
                    </p>

                    <div className="rounded-xl p-4 mb-6 border bg-[var(--color-surface-alt)]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <p className="text-[var(--color-text-muted)] text-sm mb-2">
                            در حال بازگشت به صفحه تسویه حساب...
                        </p>
                        <div className="text-3xl font-bold text-[var(--color-text)]">
                            {countdown}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate("/checkout")}
                            className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                            style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 15px 30px rgba(244,172,63,0.3)' }}
                        >
                            بازگشت به تسویه حساب
                        </button>

                        <button
                            onClick={() => navigate("/cart")}
                            className="w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 border"
                            style={{ 
                                background: 'var(--color-surface-alt)',
                                borderColor: 'var(--color-border-subtle)',
                                color: 'var(--color-text)'
                            }}
                        >
                            مشاهده سبد خرید
                        </button>
                    </div>

                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                            در صورت بروز مشکل، لطفاً با پشتیبانی تماس بگیرید.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-[var(--color-text-muted)] text-sm">روژان</p>
                </div>
            </div>
        </div>
    );
}

export default PaymentErrorPage;
