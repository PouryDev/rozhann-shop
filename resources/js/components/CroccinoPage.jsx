import React, { useEffect, useState } from 'react';
import { useSeo } from '../hooks/useSeo';

const navItems = [
    { label: 'خانه', target: 'hero' },
    { label: 'چرا پرستیژ', target: 'why-us' },
    { label: 'گالری', target: 'gallery' },
    { label: 'تماس', target: 'contact' },
];

const services = [
    {
        title: 'کراتینه مو',
        description: 'صافی طبیعی، کنترل وز و ماندگاری بالا برای ظاهر حرفه‌ای در طول روز.',
        icon: 'M6 20c2-3 2-8 0-11m6 11c2-3 2-8 0-11m6 11c2-3 2-8 0-11M4 6c2 2 5 2 7 0s5-2 7 0 5 2 7 0',
    },
    {
        title: 'اصلاح صورت و مو',
        description: 'مدل‌سازی متناسب با فرم چهره برای ساخت یک استایل شارپ و تاثیرگذار.',
        icon: 'M4 7h9m-9 4h6m7-4l-4 10m0 0l-2-2m2 2l2-2M16 4l4 4',
    },
    {
        title: 'وکس صورت',
        description: 'پاکسازی سریع موهای زائد برای پوستی یکدست و ظاهری مرتب در نگاه نزدیک.',
        icon: 'M8 20c5-2 8-7 8-12 0-3-2-5-4-5-4 0-8 3-8 8 0 5 2 8 4 9zM9 9h.01M15 11h.01',
    },
    {
        title: 'روتین پوستی',
        description: 'آبرسانی، آرام‌سازی و تقویت پوست برای چهره‌ای سالم، شاداب و بااعتماد.',
        icon: 'M12 3l2.4 4.8L20 9l-4 3.8L17 18l-5-2.7L7 18l1-5.2L4 9l5.6-1.2L12 3z',
    },
];

function Icon({ path, className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function CroccinoPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

    useSeo({
        title: 'آرایشگاه مردانه پرستیژ | کراتینه، اصلاح حرفه‌ای، وکس و روتین پوستی',
        description:
            'پرستیژ یک آرایشگاه مردانه مدرن در /croccino با خدمات کراتینه مو، اصلاح صورت و مو، وکس صورت و روتین پوستی؛ تجربه VIP با تمرکز بر استایل حرفه‌ای.',
        keywords:
            'آرایشگاه مردانه پرستیژ, barbershop, کراتینه مو مردانه, اصلاح صورت و مو, وکس صورت, روتین پوستی مردانه, پیرایش مردانه',
        canonical: `${window.location.origin}/croccino`,
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Barbershop',
            name: 'آرایشگاه مردانه پرستیژ',
            url: `${window.location.origin}/croccino`,
            telephone: '+989121234567',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'سعادت‌آباد، بلوار اصلی، پلاک ۲۵',
                addressLocality: 'تهران',
                addressCountry: 'IR',
            },
            sameAs: ['https://instagram.com/prestige.barbershop'],
        });
        document.head.appendChild(script);

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
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
        );

        items.forEach((item) => observer.observe(item));

        return () => {
            observer.disconnect();
            script.remove();
        };
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileMenuOpen(false);
    };

    return (
        <div className="prestige-page min-h-screen bg-[#0c0f14] text-white" dir="rtl">
            <div className="mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8">
                <header className="sticky top-3 z-40 mb-6 rounded-2xl border border-white/10 bg-zinc-900/80 p-3 backdrop-blur-xl shadow-[0_16px_45px_rgba(0,0,0,.45)]">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2"
                        >
                            <Icon path="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z" className="h-4 w-4 text-amber-300" />
                            <span className="text-sm font-extrabold">پرستیژ</span>
                        </button>

                        <nav className="hidden items-center gap-2 md:flex">
                            <button
                                onClick={() => setServicesMenuOpen((v) => !v)}
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm"
                            >
                                خدمات
                                <Icon path="M7 10l5 5 5-5" className={`h-4 w-4 transition-transform duration-300 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {navItems.map((item) => (
                                <button
                                    key={item.target}
                                    onClick={() => scrollToSection(item.target)}
                                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm transition hover:border-amber-300/60"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <button
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="inline-flex rounded-xl border border-white/15 bg-white/5 p-2 md:hidden"
                            aria-label="باز کردن منو"
                        >
                            <Icon path="M4 7h16M4 12h16M4 17h16" />
                        </button>
                    </div>

                    <div className={`smooth-expand hidden md:block ${servicesMenuOpen ? 'open' : ''}`}>
                        <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 sm:grid-cols-2">
                            {services.map((service) => (
                                <button
                                    key={service.title}
                                    onClick={() => scrollToSection('services')}
                                    className="flex items-center gap-2 rounded-xl bg-black/30 px-3 py-2 text-right text-sm hover:bg-black/50"
                                >
                                    <Icon path={service.icon} className="h-4 w-4 text-amber-300" />
                                    {service.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`smooth-expand md:hidden ${mobileMenuOpen ? 'open' : ''}`}>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <button
                                onClick={() => setServicesMenuOpen((v) => !v)}
                                className="mb-2 flex w-full items-center justify-between rounded-xl bg-black/30 px-3 py-2 text-sm"
                            >
                                زیرمنوی خدمات
                                <Icon path="M7 10l5 5 5-5" className={`h-4 w-4 transition-transform duration-300 ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`smooth-expand ${servicesMenuOpen ? 'open' : ''}`}>
                                <div className="space-y-1 rounded-xl bg-black/30 p-2">
                                    {services.map((service) => (
                                        <button
                                            key={service.title}
                                            onClick={() => scrollToSection('services')}
                                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm"
                                        >
                                            <Icon path={service.icon} className="h-4 w-4 text-amber-300" />
                                            {service.title}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.target}
                                        onClick={() => scrollToSection(item.target)}
                                        className="rounded-xl bg-black/30 px-3 py-2 text-sm"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                <section id="hero" className="reveal-on-scroll rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 shadow-[0_20px_70px_rgba(0,0,0,.5)] sm:p-8">
                    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
                        <div>
                            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
                                آرایشگاه مردانه <span className="text-amber-300">پرستیژ</span>
                                <br />
                                تجربه‌ای لوکس، سریع و حرفه‌ای.
                            </h1>
                            <p className="mt-4 text-sm leading-8 text-zinc-300 sm:text-base">
ما در پرستیژ فقط مو کوتاه نمی‌کنیم.
ما ظاهر شما را طوری می‌سازیم که در جلسه، قرار یا مهمانی
با اعتمادبه‌نفس وارد شوید.                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-black/25 p-3 shadow-[0_14px_38px_rgba(0,0,0,.35)]">
                            <div className="aspect-[4/5] rounded-2xl border border-dashed border-white/25 bg-zinc-900/60 p-4">
                                {/* <div className="flex h-full items-center justify-center text-center text-sm text-zinc-400">تصویر شاخص پرستیژ</div> */}
                                <img src="/images/best-outside-template.png" alt="نمای داخلی آرایشگاه مردانه پرستیژ" className="h-full w-full rounded-2xl object-cover" loading="eager" />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="services" className="pt-12 scroll-mt-28">
                    <h2 className="reveal-on-scroll text-2xl font-extrabold sm:text-3xl">خدمات تخصصی</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {services.map((service, index) => (
                            <article
                                key={service.title}
                                className="reveal-on-scroll rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-[0_18px_35px_rgba(0,0,0,.38)]"
                                style={{ transitionDelay: `${index * 90}ms` }}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="rounded-xl bg-amber-300/15 p-3 text-amber-300">
                                        <Icon path={service.icon} className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{service.title}</h3>
                                        <p className="mt-2 text-sm leading-7 text-zinc-300">{service.description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="why-us" className="pt-12 scroll-mt-28">
                    <div className="reveal-on-scroll rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,.35)]">
                        <h2 className="text-2xl font-extrabold sm:text-3xl">چرا پرستیژ؟</h2>
                        <p className="mt-3 text-sm leading-8 text-zinc-300">دقت در جزئیات، محیط تمیز، اجرای سریع و نتیجه‌ای که اعتمادبه‌نفس شما را بالا می‌برد.</p>
                    </div>
                </section>

                <section id="gallery" className="pt-12 scroll-mt-28">
                    <h2 className="reveal-on-scroll text-2xl font-extrabold sm:text-3xl">گالری</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item, index) => (
                            <div
                                key={item}
                                className="reveal-on-scroll aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-white/20 bg-zinc-900 p-3 shadow-[0_12px_30px_rgba(0,0,0,.3)]"
                                style={{ transitionDelay: `${index * 90}ms` }}
                            >
                                {/* <div className="flex h-full items-center justify-center rounded-xl bg-zinc-800 text-xs text-zinc-400">Placeholder تصویر {item}</div> */}
                                <img src={`/images/best-inner-template-view-${item}.png`} alt={`نمونه کار آرایشگاه پرستیژ ${item}`} className="h-full w-full rounded-xl object-cover" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="pt-12 scroll-mt-28">
                    <div className="reveal-on-scroll rounded-3xl border border-amber-300/20 bg-gradient-to-br from-zinc-900 to-black p-6 shadow-[0_20px_55px_rgba(0,0,0,.48)]">
                        <h2 className="text-2xl font-extrabold sm:text-3xl">تماس و لوکیشن</h2>
                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                            <a href="tel:+989121234567" className="rounded-2xl border border-white/15 bg-white/5 p-4">
                                <p className="text-xs text-zinc-400">تلفن</p>
                                <p style={{direction: 'ltr'}} className="mt-1 font-bold">۰۹۰۳ ۷۱۴ ۷۴۶۴</p>
                            </a>
                            <a href="https://instagram.com/prestige.barbershop" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/15 bg-white/5 p-4">
                                <p className="text-xs text-zinc-400">اینستاگرام</p>
                                <p style={{direction: 'ltr'}} className="mt-1 font-bold">@prestige.barbershop</p>
                            </a>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                                <p className="text-xs text-zinc-400">آدرس</p>
                                <p className="mt-1 font-bold">جاده قدیم آمل بابل، روستای قمی کلا کوچه گلستان</p>
                            </div>
                        </div>
                        <div className="mt-4 rounded-2xl border border-dashed border-white/25 bg-white/5 p-4 text-sm text-zinc-400">محل قرارگیری نقشه / لوکیشن</div>
                    </div>
                </section>

                <footer className="reveal-on-scroll mt-12 rounded-3xl border border-white/10 bg-zinc-900/80 p-5 shadow-[0_12px_30px_rgba(0,0,0,.35)]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-zinc-300">© آرایشگاه مردانه پرستیژ | barbershop تخصصی آقایان</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                            <button onClick={() => scrollToSection('services')} className="rounded-full bg-white/5 px-3 py-1.5">کراتینه مو</button>
                            <button onClick={() => scrollToSection('services')} className="rounded-full bg-white/5 px-3 py-1.5">وکس صورت</button>
                            <button onClick={() => scrollToSection('contact')} className="rounded-full bg-white/5 px-3 py-1.5">لوکیشن</button>
                        </div>
                    </div>
                </footer>
            </div>

            <div className="fixed inset-x-0 bottom-3 z-30 mx-auto w-[calc(100%-1rem)] max-w-md sm:hidden">
                <div className="grid grid-cols-4 rounded-2xl border border-white/15 bg-zinc-900/90 p-2 shadow-[0_14px_38px_rgba(0,0,0,.48)] backdrop-blur-xl">
                    {navItems.map((item) => (
                        <button key={item.target} onClick={() => scrollToSection(item.target)} className="rounded-xl px-2 py-2 text-xs text-zinc-200">
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
