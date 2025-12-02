<!DOCTYPE html>
<html lang="fa" dir="rtl">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title ?? 'روژان' }}</title>
        @vite(['resources/css/app.css','resources/js/app.js'])
        
        <style>
            body { font-family: Vazirmatn, var(--font-sans); background: var(--color-surface); color: var(--color-text); }
            .lite-header { background: linear-gradient(135deg, rgba(255,236,214,0.8), rgba(235,247,240,0.9)); border-bottom: 1px solid var(--color-border-subtle); box-shadow: 0 20px 45px rgba(15,23,42,0.08); }
            .lite-footer { color: var(--color-text-muted); border-top: 1px solid var(--color-border-subtle); }
        </style>
    </head>
    <body class="min-h-screen bg-[var(--color-surface)]">
        <header class="lite-header p-4 sticky top-0 z-30 backdrop-blur">
            <div class="max-w-5xl mx-auto flex items-center justify-between">
                <a href="/" class="text-2xl font-extrabold text-[var(--color-text)]">روژان</a>
                <nav class="flex items-center gap-4 text-sm text-[var(--color-text)]">
                    <a href="/" class="hover:text-[var(--color-primary-strong)] transition">خانه</a>
                    <a href="{{ route('cart.index') }}" class="hover:text-[var(--color-primary-strong)] transition">سبد خرید</a>
                </nav>
            </div>
        </header>
        <main class="max-w-5xl mx-auto p-4">
            {{ $slot }}
        </main>
        <footer class="p-6 text-center text-xs lite-footer">© {{ date('Y') }} روژان</footer>
    </body>
 </html>
