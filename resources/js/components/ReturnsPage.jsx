import React from 'react';
import { useSeo } from '../hooks/useSeo';

function ReturnsPage() {
    useSeo({
        title: 'بازگردانی و مرجوعی | روژان - سیاست بازگشت کالا',
        description: 'شرایط و قوانین بازگردانی کالا در فروشگاه روژان. اطلاعات کامل درباره مراحل مرجوعی، شرایط بازگشت و استرداد وجه.',
        keywords: 'بازگردانی, مرجوعی, استرداد وجه, بازگشت کالا, روژان',
        canonical: window.location.origin + '/returns'
    });

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)] mb-3">بازگردانی و مرجوعی</h1>
                    <p className="text-[var(--color-text-muted)] text-sm leading-7">
                        شرایط و قوانین بازگردانی کالا در فروشگاه روژان. اطلاعات کامل درباره مراحل مرجوعی، شرایط بازگشت و استرداد وجه.
                    </p>
                </section>

                {/* Return Policy */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">سیاست بازگشت کالا</h2>
                    <div className="space-y-4 text-[var(--color-text-muted)] text-sm leading-7">
                        <p>
                            در فروشگاه روژان، رضایت مشتریان اولویت اول ماست. به همین دلیل امکان بازگردانی کالا 
                            در شرایط خاص برای شما فراهم شده است.
                        </p>
                        <p>
                            تمامی کالاها باید در شرایط اولیه و بدون استفاده تحویل داده شوند تا امکان بازگشت فراهم باشد.
                        </p>
                    </div>
                </section>

                {/* Return Conditions */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">شرایط بازگشت</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">کالاهای قابل بازگشت</h3>
                            <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">✓</span>
                                    <span className="leading-6">کالاهای بدون استفاده و در بسته‌بندی اصلی</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">✓</span>
                                    <span className="leading-6">کالاهای دارای عیب و نقص</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">✓</span>
                                    <span className="leading-6">کالاهای نادرست ارسال شده</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">کالاهای غیرقابل بازگشت</h3>
                            <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="leading-6">کالاهای استفاده شده</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="leading-6">کالاهای شخصی‌سازی شده</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span className="leading-6">کالاهای آسیب دیده توسط مشتری</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Return Process */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">مراحل بازگشت</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))" }}>1</div>
                            <div>
                                <h3 className="text-[var(--color-text)] font-semibold mb-1">تماس با پشتیبانی</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-6">از طریق اینستاگرام یا تلگرام با ما تماس بگیرید</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))" }}>2</div>
                            <div>
                                <h3 className="text-[var(--color-text)] font-semibold mb-1">ارسال مدارک</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-6">عکس کالا و فاکتور خرید را ارسال کنید</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))" }}>3</div>
                            <div>
                                <h3 className="text-[var(--color-text)] font-semibold mb-1">تایید بازگشت</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-6">پس از بررسی، تاییدیه بازگشت برای شما ارسال می‌شود</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))" }}>4</div>
                            <div>
                                <h3 className="text-[var(--color-text)] font-semibold mb-1">ارسال کالا</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-6">کالا را به آدرس مشخص شده ارسال کنید</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-accent))" }}>5</div>
                            <div>
                                <h3 className="text-[var(--color-text)] font-semibold mb-1">استرداد وجه</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-6">پس از دریافت کالا، وجه شما بازگردانده می‌شود</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Time Limits */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">مهلت بازگشت</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">کالاهای عادی</h3>
                            <p className="text-[var(--color-text-muted)] text-sm mb-3 leading-6">
                                امکان بازگشت تا 7 روز پس از دریافت کالا
                            </p>
                            <div className="text-[var(--color-primary-strong)] font-medium text-sm">7 روز کاری</div>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">کالاهای معیوب</h3>
                            <p className="text-[var(--color-text-muted)] text-sm mb-3 leading-6">
                                امکان بازگشت تا 14 روز پس از دریافت کالا
                            </p>
                            <div className="text-[var(--color-primary-strong)] font-medium text-sm">14 روز کاری</div>
                        </div>
                    </div>
                </section>

                {/* Refund Process */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">استرداد وجه</h2>
                    <div className="space-y-4 text-[var(--color-text-muted)] text-sm leading-7">
                        <p>
                            پس از تایید بازگشت کالا و دریافت آن در انبار، وجه شما به همان روش پرداخت اولیه 
                            بازگردانده می‌شود.
                        </p>
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-[var(--color-text)] font-semibold mb-2">زمان استرداد وجه</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>پرداخت آنلاین: 2-3 روز کاری</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>واریز به حساب: 3-5 روز کاری</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>کارت به کارت: 1-2 روز کاری</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">نیاز به کمک دارید؟</h2>
                    <p className="text-[var(--color-text-muted)] mb-4 text-sm leading-7">
                        تیم پشتیبانی ما آماده پاسخگویی به سوالات شما درباره بازگشت کالا است
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a 
                            href="https://instagram.com/rozhan_shopp" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-alt-hover)] text-[var(--color-text)] px-4 py-2 transition-colors text-sm"
                        >
                            اینستاگرام
                        </a>
                        <a 
                            href="https://t.me/rozhann" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-alt-hover)] text-[var(--color-text)] px-4 py-2 transition-colors text-sm"
                        >
                            تلگرام
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ReturnsPage;
