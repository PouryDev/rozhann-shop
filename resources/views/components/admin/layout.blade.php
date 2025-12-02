<x-layouts.app :title="$title ?? 'پنل ادمین'">
    <style>
        [data-admin-theme] {
            --admin-surface: #ffffff;
            --admin-soft: #f6f4ef;
            --admin-border: rgba(15,23,42,0.08);
            --admin-text: var(--color-text, #1c1c1c);
            --admin-text-muted: var(--color-text-muted, #5f5b53);
        }
        [data-admin-theme] .text-white,
        [data-admin-theme] .text-gray-100,
        [data-admin-theme] .text-gray-200 {
            color: var(--admin-text) !important;
        }
        [data-admin-theme] .text-gray-300,
        [data-admin-theme] .text-gray-400 {
            color: var(--admin-text-muted) !important;
        }
        [data-admin-theme] [class*="bg-white\/"],
        [data-admin-theme] .bg-white\/5,
        [data-admin-theme] .bg-white\/10,
        [data-admin-theme] .bg-white\/20,
        [data-admin-theme] .bg-white\/30,
        [data-admin-theme] .bg-gradient-to-b.from-white\/5 {
            background-color: var(--admin-surface) !important;
            backdrop-filter: none !important;
        }
        [data-admin-theme] .hover\:bg-white\/5:hover {
            background-color: var(--admin-soft) !important;
        }
        [data-admin-theme] [class*="border-white\/"],
        [data-admin-theme] .border-white\/10,
        [data-admin-theme] .border-white\/20 {
            border-color: var(--admin-border) !important;
        }
        [data-admin-theme] .divide-white\/10 > :not([hidden]) ~ :not([hidden]),
        [data-admin-theme] .divide-white\/20 > :not([hidden]) ~ :not([hidden]) {
            border-color: var(--admin-border) !important;
        }
        [data-admin-theme] .from-white\/5 {
            --tw-gradient-from: rgba(255,255,255,0.98) var(--tw-gradient-from-position);
            --tw-gradient-to: rgba(255,255,255,0) var(--tw-gradient-to-position);
            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }
        [data-admin-theme] table thead tr {
            background: var(--admin-soft) !important;
        }
    </style>
    @php
        $navClass = 'block rounded-2xl border px-4 py-2 transition-all text-[var(--color-text)]';
        $chipBase = 'shrink-0 rounded-full px-4 py-2 text-sm border transition-all text-[var(--color-text)]';
        $active = 'border-[var(--color-primary)] bg-white shadow font-semibold';
        $idle = 'border-[var(--color-border-subtle)] bg-white/70 hover:bg-white hover:shadow';
    @endphp
    <div data-admin-theme class="space-y-6">
        <div class="hidden lg:flex gap-6">
            <aside class="w-64 shrink-0 sticky top-20 self-start">
                <nav class="space-y-3 text-sm">
                    <a href="{{ route('admin.products.index') }}" class="{{ $navClass }} {{ request()->routeIs('admin.products.*') ? $active : $idle }}">📦 محصولات</a>
                    <a href="{{ route('admin.orders.index') }}" class="{{ $navClass }} {{ request()->routeIs('admin.orders.*') ? $active : $idle }}">🧾 سفارش‌ها</a>
                    <a href="/" class="{{ $navClass }} {{ $idle }}">🏪 فروشگاه</a>
                </nav>
            </aside>
            <section class="flex-1 min-w-0">
                {{ $slot }}
            </section>
        </div>

        <div class="lg:hidden space-y-3 -mx-4 px-4 mb-4">
            <div class="flex gap-2 overflow-x-auto overflow-y-hidden no-scrollbar">
                <a href="{{ route('admin.products.index') }}" class="{{ $chipBase }} {{ request()->routeIs('admin.products.*') ? $active : $idle }}">📦 محصولات</a>
                <a href="{{ route('admin.orders.index') }}" class="{{ $chipBase }} {{ request()->routeIs('admin.orders.*') ? $active : $idle }}">🧾 سفارش‌ها</a>
                <a href="/" class="{{ $chipBase }} {{ $idle }}">🏪 فروشگاه</a>
            </div>
            <section>
                {{ $slot }}
            </section>
        </div>
    </div>
</x-layouts.app>
