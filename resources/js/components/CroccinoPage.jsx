import React, { useEffect } from 'react';
import { useSeo } from '../hooks/useSeo';

const navItems = [
    { label: 'خدمات', target: 'services' },
    { label: 'مزیت پرستیژ', target: 'why-us' },
    { label: 'گالری', target: 'gallery' },
    { label: 'تماس', target: 'contact' },
];

const services = [
    {
        title: 'کراتینه مو',
        description: 'صافی طبیعی، درخشندگی بالا و کاهش وز مو برای استایلی تمیز و حرفه‌ای در تمام طول روز.',
        icon: 'M6 20c2-3 2-8 0-11m6 11c2-3 2-8 0-11m6 11c2-3 2-8 0-11M4 6c2 2 5 2 7 0s5-2 7 0 5 2 7 0',
        accent: 'from-amber-100 to-orange-50',
    },
    {
        title: 'اصلاح صورت و مو',
        description: 'اصلاح دقیق متناسب با فرم چهره برای ساختن اولین برداشت قدرتمند در قرارهای مهم کاری و اجتماعی.',
        icon: 'M4 7h9m-9 4h6m7-4l-4 10m0 0l-2-2m2 2l2-2M16 4l4 4',
        accent: 'from-sky-100 to-cyan-50',
    },
    {
        title: 'وکس صورت',
        description: 'پاکسازی سریع موهای زائد برای پوستی یکدست، مرتب و آماده‌ی نزدیک‌ترین نگاه‌ها.',
        icon: 'M8 20c5-2 8-7 8-12 0-3-2-5-4-5-4 0-8 3-8 8 0 5 2 8 4 9zM9 9h.01M15 11h.01',
        accent: 'from-rose-100 to-pink-50',
    },
    {
        title: 'روتین پوستی آقایان',
        description: 'آبرسانی، لایه‌برداری ملایم و مراقبت تخصصی برای پوستی سالم که جوانی و اعتماد‌به‌نفس را منتقل کند.',
        icon: 'M12 3l2.4 4.8L20 9l-4 3.8L17 18l-5-2.7L7 18l1-5.2L4 9l5.6-1.2L12 3z',
        accent: 'from-emerald-100 to-teal-50',
    },
];

const stats = [
    { value: '+۱۴۰۰', label: 'مشتری راضی' },
    { value: '۹۷٪', label: 'رضایت از استایل نهایی' },
    { value: 'کمتر از ۵ دقیقه', label: 'زمان پاسخ برای رزرو' },
];

function Icon({ path, className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function CroccinoPage() {
    useSeo({
        title: 'آرایشگاه مردانه پرستیژ | کراتینه، اصلاح حرفه‌ای، وکس صورت و روتین پوستی',
        description:
            'پرستیژ در /croccino یک barbershop مدرن برای آقایان سخت‌پسند است: کراتینه مو، اصلاح صورت و مو، وکس صورت و روتین پوستی با تجربه VIP.',
        keywords:
            'آرایشگاه مردانه پرستیژ, کراتینه مو مردانه, اصلاح صورت و مو, وکس صورت آقایان, روتین پوستی مردانه, barbershop تهران',
        canonical: `${window.location.origin}/croccino`,
    });

    useEffect(() => {
        const items = document.querySelectorAll('.reveal-on-scroll');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
        );

        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="prestige-page bg-[#0f1115] text-white" dir="rtl">
            <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
                <header className="reveal-on-scroll rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 shadow-[0_20px_80px_rgba(0,0,0,.45)] sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-xs sm:text-sm">
                            <Icon path="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z" />
                            پرستیژ Barbershop
                        </div>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-[1.02]"
                        >
                            رزرو سریع
                        </button>
                    </div>

                    <div className="mt-7 grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
                        <div>
                            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
                                آرایشگاه مردانه <span className="text-amber-300">پرستیژ</span>
                                <br />
                                استایلی که کاری می‌کند بیشتر دیده شوید.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-zinc-300 sm:text-base">
                                ما صرفاً اصلاح انجام نمی‌دهیم؛ با ترکیب مهارت، نورومارکتینگ در پیام برند، و توجه به جزئیات چهره،
                                کمک می‌کنیم ظاهر شما در ذهن بماند. اینجا هر سرویس برای افزایش جذابیت، اعتمادبه‌نفس و اثرگذاری شما طراحی شده.
                            </p>
                            <nav className="mt-6 flex flex-wrap gap-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.target}
                                        onClick={() => scrollToSection(item.target)}
                                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:border-amber-300/60 hover:bg-amber-300/10"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/20 p-3 shadow-[0_16px_44px_rgba(0,0,0,.35)]">
                            <div className="aspect-[4/5] rounded-2xl border border-dashed border-white/25 bg-zinc-900/70 p-4">
                                <div className="flex h-full items-center justify-center text-center text-sm text-zinc-400">
                                    تصویر شاخص آرایشگاه پرستیژ
                                </div>
                                {/* <img src="/images/prestige-hero.jpg" alt="نمای داخلی آرایشگاه مردانه پرستیژ" className="h-full w-full rounded-2xl object-cover" loading="eager" /> */}
                            </div>
                        </div>
                    </div>
                </header>

                <section id="services" className="scroll-mt-24 pt-12">
                    <div className="reveal-on-scroll flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold sm:text-3xl">خدمات تخصصی پرستیژ</h2>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {services.map((service, index) => (
                            <article
                                key={service.title}
                                className={`reveal-on-scroll group rounded-2xl border border-white/10 bg-gradient-to-br ${service.accent} p-[1px] shadow-[0_16px_34px_rgba(0,0,0,.35)]`}
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                <div className="h-full rounded-2xl bg-zinc-900/95 p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-xl bg-white/10 p-3 text-amber-300">
                                            <Icon path={service.icon} className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{service.title}</h3>
                                            <p className="mt-2 text-sm leading-7 text-zinc-300">{service.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="why-us" className="scroll-mt-24 pt-12">
                    <div className="reveal-on-scroll rounded-3xl border border-white/10 bg-zinc-900/75 p-5 shadow-[0_16px_40px_rgba(0,0,0,.35)] sm:p-7">
                        <h2 className="text-2xl font-extrabold sm:text-3xl">چرا پرستیژ؟</h2>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {stats.map((item, index) => (
                                <div
                                    key={item.label}
                                    className="reveal-on-scroll rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                                    style={{ transitionDelay: `${index * 90}ms` }}
                                >
                                    <p className="text-2xl font-extrabold text-amber-300">{item.value}</p>
                                    <p className="mt-1 text-sm text-zinc-300">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="gallery" className="scroll-mt-24 pt-12">
                    <h2 className="reveal-on-scroll text-2xl font-extrabold sm:text-3xl">نمونه‌کارها</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item, index) => (
                            <div
                                key={item}
                                className="reveal-on-scroll aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-white/20 bg-zinc-900 p-3 shadow-[0_12px_32px_rgba(0,0,0,.3)]"
                                style={{ transitionDelay: `${index * 90}ms` }}
                            >
                                <div className="flex h-full items-center justify-center rounded-xl bg-zinc-800 text-center text-xs text-zinc-400">
                                    Placeholder تصویر {item}
                                </div>
                                {/* <img src={`/images/prestige-gallery-${item}.jpg`} alt={`نمونه اصلاح پرستیژ ${item}`} className="h-full w-full rounded-xl object-cover" loading="lazy" /> */}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="scroll-mt-24 pt-12">
                    <div className="reveal-on-scroll rounded-3xl border border-amber-300/20 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-[0_20px_55px_rgba(0,0,0,.5)]">
                        <h2 className="text-2xl font-extrabold sm:text-3xl">تماس و لوکیشن</h2>
                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                            <a href="tel:+989121234567" className="rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10">
                                <p className="text-xs text-zinc-400">تلفن</p>
                                <p className="mt-1 font-bold">۰۹۱۲ ۱۲۳ ۴۵ ۶۷</p>
                            </a>
                            <a href="https://instagram.com/prestige.barbershop" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10">
                                <p className="text-xs text-zinc-400">اینستاگرام</p>
                                <p className="mt-1 font-bold">@prestige.barbershop</p>
                            </a>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                                <p className="text-xs text-zinc-400">آدرس</p>
                                <p className="mt-1 font-bold">تهران، سعادت‌آباد، بلوار اصلی، پلاک ۲۵</p>
                            </div>
                        </div>
                        <div className="mt-4 rounded-2xl border border-dashed border-white/25 bg-white/5 p-4 text-sm text-zinc-400">
                            محل قرارگیری نقشه/لوکیشن
                        </div>
                    </div>
                </section>
            </div>

            <div className="fixed inset-x-0 bottom-4 z-20 mx-auto w-[calc(100%-1.25rem)] max-w-md px-1 sm:hidden">
                <div className="flex items-center justify-between rounded-full border border-white/15 bg-zinc-900/90 p-2 shadow-[0_14px_38px_rgba(0,0,0,.45)] backdrop-blur">
                    {navItems.map((item) => (
                        <button
                            key={item.target}
                            onClick={() => scrollToSection(item.target)}
                            className="rounded-full px-3 py-1.5 text-xs text-zinc-200"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
