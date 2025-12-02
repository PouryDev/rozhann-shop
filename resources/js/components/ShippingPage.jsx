import React from 'react';
import { useSeo } from '../hooks/useSeo';

function ShippingPage() {
    useSeo({
        title: 'ارسال و تحویل | روژان - فروشگاه آنلاین لباس',
        description: 'اطلاعات کامل درباره روش‌های ارسال، هزینه ارسال، زمان تحویل و شرایط ارسال در فروشگاه روژان. ارسال سریع و مطمئن به سراسر کشور.',
        keywords: 'ارسال, تحویل, پست, پیک, هزینه ارسال, زمان تحویل, روژان',
        canonical: window.location.origin + '/shipping'
    });

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)] mb-3">ارسال و تحویل</h1>
                    <p className="text-[var(--color-text-muted)] text-sm leading-7">
                        اطلاعات کامل درباره روش‌های ارسال، هزینه ارسال، زمان تحویل و شرایط ارسال در فروشگاه روژان
                    </p>
                </section>

                {/* Shipping Methods */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">روش‌های ارسال</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">پست پیشتاز</h3>
                            <p className="text-[var(--color-text-muted)] text-sm mb-3 leading-6">
                                ارسال از طریق پست پیشتاز با قابلیت ردیابی کامل
                            </p>
                            <div className="text-[var(--color-primary-strong)] font-medium text-sm">3-5 روز کاری</div>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">پیک موتوری</h3>
                            <p className="text-[var(--color-text-muted)] text-sm mb-3 leading-6">
                                ارسال سریع با پیک موتوری در شهر تهران
                            </p>
                            <div className="text-[var(--color-primary-strong)] font-medium text-sm">2-4 ساعت</div>
                        </div>
                    </div>
                </section>

                {/* Delivery Areas */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">مناطق تحت پوشش</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">تهران</h3>
                            <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>تمام مناطق تهران</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>ارسال با پیک موتوری</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>تحویل در همان روز</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-4">
                            <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">سایر شهرها</h3>
                            <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>ارسال با پست پیشتاز</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>قابلیت ردیابی</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                                    <span>تحویل در 3-5 روز</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Important Notes */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7 mb-6">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">نکات مهم</h2>
                    <div className="space-y-3 text-[var(--color-text-muted)] text-sm">
                        <div className="flex items-start gap-2">
                            <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                            <span className="leading-6">در صورت عدم حضور در آدرس، بسته به اداره پست محلی ارسال می‌شود</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                            <span className="leading-6">لطفاً شماره تماس صحیح وارد کنید تا در صورت نیاز با شما تماس گرفته شود</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                            <span className="leading-6">در صورت تغییر آدرس، حتماً قبل از ارسال با ما تماس بگیرید</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-[var(--color-primary-strong)] mt-1">•</span>
                            <span className="leading-6">هزینه ارسال برای سفارشات بالای 1 میلیون تومان رایگان است</span>
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7">
                    <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">سوالی دارید؟</h2>
                    <p className="text-[var(--color-text-muted)] mb-4 text-sm leading-7">
                        برای اطلاعات بیشتر درباره ارسال و تحویل، با ما تماس بگیرید
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

export default ShippingPage;
