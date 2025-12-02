import React from 'react';
import { useSeo } from '../hooks/useSeo';

function ContactPage(){
    useSeo({
        title: 'تماس با ما - فروشگاه روژان',
        description: 'راه‌های ارتباط با روژان: پشتیبانی واتساپ و تلگرام، ایمیل و فرم تماس. سوالی دارید؟ همین حالا پیام بفرستید.',
        keywords: 'تماس با روژان, پشتیبانی, شماره تماس, ایمیل, واتساپ, تلگرام',
        image: '/images/logo.png',
        canonical: window.location.origin + '/contact'
    });

    // فرم حذف شد؛ فقط راه‌های ارتباطی باقی مانده است

    return (
        <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Intro */}
                <section className="rounded-2xl bg-white shadow-lg border border-[var(--color-border-subtle)] p-5 md:p-7">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-[var(--color-text)]">بیایید صحبت کنیم</h1>
                    <p className="text-[var(--color-text-muted)] text-sm leading-7">
                        تیم پشتیبانی روژان اینجاست تا سریع پاسخ بدهد. اگر درباره سفارش، سایزبندی یا موجودی سوال دارید، همین حالا از یکی از راه‌های زیر پیام بفرستید.
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                        <a href="https://t.me/rozhann" target="_blank" rel="noopener noreferrer" className="block rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-3 hover:bg-[var(--color-surface-alt-hover)] transition text-[var(--color-text)]">
                            تلگرام: @rozhann
                        </a>
                        <a href="mailto:support@rozhann.shop" className="block rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-3 hover:bg-[var(--color-surface-alt-hover)] transition text-[var(--color-text)]">
                            ایمیل: support@rozhann.shop
                        </a>
                        <a href="https://instagram.com/rozhan_shopp" target="_blank" rel="noopener noreferrer" className="block rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] p-3 hover:bg-[var(--color-surface-alt-hover)] transition text-[var(--color-text)]">
                            اینستاگرام: @rozhann
                        </a>
                    </div>
                </section>

                
            </div>
        </div>
    );
}

export default ContactPage;


