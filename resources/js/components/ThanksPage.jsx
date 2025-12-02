import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ThanksPage() {
    const { invoiceId } = useParams();
    const [notificationSent, setNotificationSent] = useState(false);
    
    useEffect(() => {
        // Send notification when page loads
        // Retry mechanism: try up to 5 times with 2 second delay between retries
        // This is needed because for card-to-card payment, Order might not be created yet
        const sendNotification = async (retryCount = 0) => {
            const maxRetries = 5;
            
            try {
                const response = await fetch('/api/orders/send-notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        invoice_id: invoiceId,
                    }),
                });
                
                const data = await response.json();
                if (data.success) {
                    setNotificationSent(true);
                    console.log('Telegram notification sent successfully');
                } else {
                    // If order not found and we haven't exceeded max retries, retry
                    if (data.message && data.message.includes('سفارش یافت نشد') && retryCount < maxRetries) {
                        console.log(`Order not found yet, retrying... (${retryCount + 1}/${maxRetries})`);
                        setTimeout(() => {
                            sendNotification(retryCount + 1);
                        }, 2000); // Wait 2 seconds before retry
                    } else {
                        console.warn('Failed to send notification:', data.message);
                    }
                }
            } catch (error) {
                console.error('Error sending notification:', error);
                // Retry on network errors too
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        sendNotification(retryCount + 1);
                    }, 2000);
                }
            }
        };
        
        if (invoiceId) {
            sendNotification();
        }
    }, [invoiceId]);

    return (
        <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl border shadow-2xl p-8 text-center" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                        style={{ background: 'linear-gradient(120deg, var(--color-accent), rgba(116,185,255,0.8))' }}>
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
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                        سفارش شما ثبت شد!
                    </h1>

                    <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
                        سفارش شما با موفقیت ثبت شد و در حال پردازش است. شماره
                        فاکتور شما:{" "}
                        <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
                            #{invoiceId}
                        </span>
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="rounded-xl p-4 border bg-[var(--color-surface-alt)]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <div className="flex items-center justify-between">
                                <span className="text-[var(--color-text-muted)] text-sm">
                                    وضعیت سفارش
                                </span>
                                <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                                    در انتظار پردازش
                                </span>
                            </div>
                        </div>

                        <div className="rounded-xl p-4 border bg-[var(--color-surface-alt)]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <div className="flex items-center justify-between">
                                <span className="text-[var(--color-text-muted)] text-sm">
                                    شماره فاکتور
                                </span>
                                <span className="text-sm font-medium text-[var(--color-text)]">
                                    #{invoiceId}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() =>
                                (window.location.href = "/account/orders")
                            }
                            className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                            style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 15px 30px rgba(244,172,63,0.3)' }}
                        >
                            مشاهده سفارشات
                        </button>

                        <button
                            onClick={() => (window.location.href = "/")}
                            className="w-full font-medium py-3 px-6 rounded-xl transition-all duration-200 border"
                            style={{ 
                                background: 'var(--color-surface-alt)',
                                borderColor: 'var(--color-border-subtle)',
                                color: 'var(--color-text)'
                            }}
                        >
                            بازگشت به صفحه اصلی
                        </button>
                    </div>

                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                        <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                            لطفاً فیش واریزی را به شماره فاکتور ارسال کنید. پس
                            از تایید پرداخت، سفارش شما آماده ارسال خواهد شد.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-[var(--color-text-muted)] text-sm">
                        با تشکر از اعتماد شما به روژان
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ThanksPage;
