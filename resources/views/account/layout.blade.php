<x-layouts.app :title="$title ?? 'پنل کاربری'">
    <style>
        [data-account-theme] {
            --account-surface: #ffffff;
            --account-soft: #f7f3ea;
            --account-border: rgba(15,23,42,0.08);
            --account-text: var(--color-text, #1d1c19);
            --account-muted: var(--color-text-muted, #6b665d);
        }
        [data-account-theme] [class*="bg-white/"],
        [data-account-theme] .bg-white\/5,
        [data-account-theme] .bg-white\/10,
        [data-account-theme] .bg-white\/20,
        [data-account-theme] .bg-gradient-to-b.from-white\/5 {
            background-color: var(--account-surface) !important;
            backdrop-filter: none !important;
        }
        [data-account-theme] .hover\:bg-white\/5:hover {
            background-color: var(--account-soft) !important;
        }
        [data-account-theme] [class*="border-white/"],
        [data-account-theme] .border-white\/10,
        [data-account-theme] .border-white\/20,
        [data-account-theme] .divide-white\/10 > :not([hidden]) ~ :not([hidden]) {
            border-color: var(--account-border) !important;
        }
        [data-account-theme] .text-gray-100,
        [data-account-theme] .text-gray-200,
        [data-account-theme] .text-gray-300,
        [data-account-theme] .text-gray-400,
        [data-account-theme] .text-white {
            color: var(--account-text) !important;
        }
        [data-account-theme] .text-gray-300,
        [data-account-theme] .text-gray-400 {
            color: var(--account-muted) !important;
        }
        [data-account-theme] table thead tr {
            background: var(--account-soft) !important;
        }
    </style>
    <div data-account-theme class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside class="md:col-span-1 space-y-2">
            @php
                $linkBase = 'block rounded-2xl px-4 py-3 border transition-all duration-200';
                $activeClasses = 'border-[var(--color-primary)] bg-white shadow font-semibold text-[var(--color-text)]';
                $idleClasses = 'border-[var(--color-border-subtle)] bg-white/70 hover:bg-white hover:shadow text-[var(--color-text)]';
            @endphp
            <a href="{{ route('account.index') }}" class="{{ $linkBase }} {{ request()->routeIs('account.index') ? $activeClasses : $idleClasses }}">داشبورد</a>
            <a href="{{ route('cart.index') }}" class="{{ $linkBase }} {{ request()->routeIs('cart.index') ? $activeClasses : $idleClasses }}">سبد خرید</a>
            <a href="{{ route('account.orders') }}" class="{{ $linkBase }} {{ request()->routeIs('account.orders') || request()->routeIs('account.orders.show') ? $activeClasses : $idleClasses }}">سفارش‌های من</a>
            <a href="{{ route('account.settings') }}" class="{{ $linkBase }} {{ request()->routeIs('account.settings') ? $activeClasses : $idleClasses }}">تنظیمات</a>
            @if(auth()->check() && auth()->user()->is_admin)
                <a href="{{ route('admin.dashboard') }}" class="{{ $linkBase }} text-white" style="background: linear-gradient(120deg, var(--color-primary), var(--color-accent)); border: none;">پنل ادمین</a>
            @endif
        </aside>
        <section class="md:col-span-3">
            {{ $slot }}
        </section>
    </div>
</x-layouts.app>
