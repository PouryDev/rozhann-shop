import React from 'react';
import { useSeo } from '../hooks/useSeo';

const navItems = [
    { label: 'خدمات', target: 'services' },
    { label: 'چرا پرستیژ', target: 'why-us' },
    { label: 'نمونه‌کار', target: 'gallery' },
    { label: 'تماس و لوکیشن', target: 'contact' },
];

const services = [
    {
        title: 'اصلاح تخصصی و استایل کلاسیک',
        description:
            'با تکنیک‌های دقیق و توجه به فرم صورت، ظاهری مرتب، حرفه‌ای و ماندگار می‌سازیم تا در نگاه اول اعتماد ایجاد کنید.',
    },
    {
        title: 'فید حرفه‌ای و گریم ریش',
        description:
            'ترکیب فید تمیز با طراحی ریش متناسب با چهره؛ نتیجه‌ای که هم جذابیت بصری دارد و هم حس قدرت و آراستگی منتقل می‌کند.',
    },
    {
        title: 'پکیج دامادی و VIP',
        description:
            'برای روزهای مهم زندگی، تجربه‌ای آرام، لوکس و دقیق ارائه می‌دهیم تا با اعتماد کامل مقابل دوربین و جمع ظاهر شوید.',
    },
];

const stats = [
    { value: '+۱۲۰۰', label: 'مشتری وفادار در محله' },
    { value: '۹۶٪', label: 'نرخ رضایت ثبت‌شده' },
    { value: '۷ روز', label: 'فعالیت در هفته با رزرو منعطف' },
];

function Icon({ path }) {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function CroccinoPage() {
    useSeo({
        title: 'آرایشگاه مردانه پرستیژ | اصلاح حرفه‌ای، فید تخصصی و استایل VIP',
        description:
            'آرایشگاه مردانه پرستیژ در مسیر /croccino با خدمات اصلاح تخصصی، فید حرفه‌ای، گریم ریش و پکیج VIP؛ تجربه‌ای لوکس برای آقایانی که ظاهر حرفه‌ای می‌خواهند.',
        keywords:
            'آرایشگاه مردانه پرستیژ, barbershop, اصلاح مردانه, فید حرفه‌ای, گریم ریش, پیرایش مردانه, آرایشگاه مردانه نزدیک من',
        canonical: `${window.location.origin}/croccino`,
    });

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="prestige-page relative overflow-hidden" dir="rtl">
            <section className="mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pt-10 lg:px-8">
                <div className="glass-card animate-fade-up rounded-3xl border border-white/60 bg-white/80 p-6 sm:p-10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-white/85 px-3 py-2 text-sm">
                            <span className="text-[var(--color-primary-strong)]">
                                <Icon path="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z" />
                            </span>
                            <span>پرستیژ؛ انتخاب آقایانی که دیده می‌شوند</span>
                        </div>
                        <nav className="flex flex-wrap gap-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.target}
                                    onClick={() => scrollToSection(item.target)}
                                    className="rounded-full border border-[var(--color-border-subtle)] bg-white px-4 py-2 text-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)]"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
                        <div className="space-y-5">
                            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
                                آرایشگاه مردانه <span className="text-[var(--color-primary-strong)]">پرستیژ</span>
                                <br />
                                جایی که استایل شما تبدیل به امضای شخصیت‌تان می‌شود.
                            </h1>
                            <p className="max-w-2xl text-[15px] leading-8 text-[var(--color-text-muted)] sm:text-lg">
                                اگر دنبال یک <strong>barbershop حرفه‌ای</strong> هستید که علاوه بر اصلاح، اعتمادبه‌نفس و جذابیت شما را چند پله بالا ببرد،
                                پرستیژ دقیقاً برای شماست. ما با طراحی چهره، اصلاح اختصاصی و تجربه VIP کمک می‌کنیم در جلسه کاری، قرار مهم یا مهمانی،
                                اولین تأثیر را حرفه‌ای بسازید.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-3 font-semibold text-white transition hover:brightness-95"
                                >
                                    <Icon path="M7 10l5 5 5-5" />
                                    مشاهده آدرس و تماس
                                </button>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 font-semibold transition hover:border-[var(--color-primary)]"
                                >
                                    <Icon path="M5 12h14M12 5l7 7-7 7" />
                                    بررسی خدمات تخصصی
                                </button>
                            </div>
                        </div>
                        <div className="animate-float rounded-3xl border border-[var(--color-border-subtle)] bg-gradient-to-b from-white to-[var(--color-sand-100)] p-4">
                            <div className="aspect-[4/5] rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-sand-50)] p-4">
                                <div className="flex h-full items-center justify-center text-center text-sm leading-7 text-[var(--color-text-muted)]">
                                    محل قرارگیری عکس شاخص آرایشگاه
                                    <br />
                                    (بهینه برای SEO و برندینگ)
                                </div>
                                {/* <img src="/images/prestige-hero.jpg" alt="نمای داخلی آرایشگاه مردانه پرستیژ" className="h-full w-full rounded-2xl object-cover" loading="eager" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold sm:text-3xl">خدمات کلیدی برای جذب نگاه اول</h2>
                <p className="mt-3 max-w-3xl text-[var(--color-text-muted)]">
                    متن خدمات بر اساس نورومارکتینگ نوشته شده تا مزیت‌ها شفاف باشد: نتیجه قابل دیدن، حس لوکس، و تصمیم سریع برای انتخاب شما.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {services.map((service, index) => (
                        <article
                            key={service.title}
                            className="animate-fade-up rounded-2xl border border-[var(--color-border-subtle)] bg-white/90 p-5"
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            <h3 className="text-lg font-bold">{service.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">{service.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="why-us" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-white/85 p-6 sm:p-8">
                    <h2 className="text-2xl font-extrabold sm:text-3xl">چرا «پرستیژ» انتخاب مطمئن آقایان سخت‌پسند است؟</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-2xl bg-[var(--color-sand-50)] p-5 text-center">
                                <p className="text-3xl font-extrabold text-[var(--color-primary-strong)]">{stat.value}</p>
                                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-extrabold sm:text-3xl">نمونه‌کارها و فضای آرایشگاه</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-white p-3">
                            <div className="flex h-full items-center justify-center rounded-xl bg-[var(--color-sand-50)] text-center text-xs leading-6 text-[var(--color-text-muted)]">
                                Placeholder تصویر شماره {item}
                            </div>
                            {/* <img src={`/images/prestige-gallery-${item}.jpg`} alt={`نمونه اصلاح در آرایشگاه پرستیژ ${item}`} className="h-full w-full rounded-xl object-cover" loading="lazy" /> */}
                        </div>
                    ))}
                </div>
            </section>

            <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-ink-800)] p-6 text-white sm:p-8">
                    <h2 className="text-2xl font-extrabold sm:text-3xl">ارتباط سریع با پرستیژ</h2>
                    <p className="mt-2 text-sm text-white/80 sm:text-base">برای هماهنگی، مشاوره استایل یا ثبت لوکیشن دقیق، اطلاعات زیر را استفاده کنید.</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <a href="tel:+989121234567" className="rounded-2xl border border-white/20 bg-white/5 p-4 transition hover:bg-white/10">
                            <div className="mb-2 inline-flex rounded-full bg-white/15 p-2">
                                <Icon path="M5 4h3l2 5-2 1a15 15 0 007 7l1-2 5 2v3a2 2 0 01-2 2A17 17 0 013 7a2 2 0 012-3z" />
                            </div>
                            <p className="text-sm text-white/70">تلفن</p>
                            <p className="font-bold">۰۹۱۲ ۱۲۳ ۴۵ ۶۷</p>
                        </a>

                        <a href="https://instagram.com/prestige.barbershop" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/20 bg-white/5 p-4 transition hover:bg-white/10">
                            <div className="mb-2 inline-flex rounded-full bg-white/15 p-2">
                                <Icon path="M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm-4 13a4 4 0 110-8 4 4 0 010 8zm5-9h.01" />
                            </div>
                            <p className="text-sm text-white/70">اینستاگرام</p>
                            <p className="font-bold">@prestige.barbershop</p>
                        </a>

                        <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
                            <div className="mb-2 inline-flex rounded-full bg-white/15 p-2">
                                <Icon path="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            </div>
                            <p className="text-sm text-white/70">آدرس</p>
                            <p className="font-bold leading-7">تهران، سعادت‌آباد، بلوار اصلی، پلاک ۲۵</p>
                        </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-dashed border-white/35 bg-white/5 p-4 text-sm text-white/80">
                        محل قرارگیری نقشه/لوکیشن (Google Map یا نشان)
                    </div>
                </div>
            </section>
        </div>
    );
}
