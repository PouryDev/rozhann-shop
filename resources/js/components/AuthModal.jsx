import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { convertPersianToEnglish } from '../utils/convertPersianNumbers';
import { apiRequest } from '../utils/sanctumAuth';

function AuthModal({ open, onClose, onSuccess, initialTab = 'login' }) {
    const { login } = useAuth();
    const [tab, setTab] = React.useState(initialTab);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [loginForm, setLoginForm] = React.useState({ login_field: '', password: '' });
    const [registerForm, setRegisterForm] = React.useState({ name: '', instagram_id: '', phone: '', password: '', password_confirmation: '' });

    React.useEffect(() => {
        if (open) {
            setTab(initialTab);
        }
    }, [open, initialTab]);

    React.useEffect(() => {
        if (!open) {
            setError(null);
            setErrors({});
            setLoading(false);
        }
    }, [open]);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true); 
        setError(null);
        setErrors({});
        
        try {
            const res = await apiRequest('/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login_field: convertPersianToEnglish(loginForm.login_field),
                    password: loginForm.password
                }),
            });
            const data = await res.json();
            
            if (res.status === 422) {
                setErrors(data.errors || {});
                setError(data.message || 'لطفا فیلدها را بررسی کنید');
            } else if (!res.ok || !data?.success) {
                setError(data?.message || 'ورود ناموفق بود. لطفا اطلاعات را بررسی کنید.');
            } else {
                await login(data.user);
                onSuccess?.(data.user);
                onClose?.();
            }
        } catch (e) {
            const errorMessage = e?.response?.data?.message || e?.message || 'ورود ناموفق بود. لطفا اطلاعات را بررسی کنید.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setErrors({});
        
        try {
            const instagramId = registerForm.instagram_id?.trim() ?? '';
            const res = await apiRequest('/api/auth/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: registerForm.name,
                    instagram_id: instagramId.length ? instagramId : null,
                    phone: convertPersianToEnglish(registerForm.phone),
                    password: registerForm.password,
                    password_confirmation: registerForm.password_confirmation
                }),
            });
            const data = await res.json();
            
            if (res.status === 422) {
                setErrors(data.errors || {});
                setError(data.message || 'لطفا فیلدها را بررسی کنید');
            } else if (!res.ok || !data?.success) {
                setError(data?.message || 'ثبت‌نام ناموفق بود.');
            } else {
                await login(data.user);
                onSuccess?.(data.user);
                onClose?.();
            }
        } catch (e) {
            const errorMessage = e?.response?.data?.message || e?.message || 'ثبت‌نام ناموفق بود.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const inputClass = (hasError) => `w-full bg-[var(--color-surface)] border ${hasError ? 'border-red-400' : 'border-[var(--color-border-subtle)]'} rounded-xl px-3 py-2 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition`;

    return (
        <div className={`fixed inset-0 z-50 ${open ? '' : 'hidden'}`} aria-hidden={!open}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur" onClick={onClose} />
            <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
                <div className="bg-white rounded-t-3xl md:rounded-3xl max-w-md w-full mx-auto shadow-[0_30px_80px_rgba(15,23,42,0.25)] animate-slide-up text-[var(--color-text)]">
                    <div className="px-4 pt-4 pb-3 md:p-5 flex items-center justify-between border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <div className="font-bold text-lg">ورود / ثبت‌نام</div>
                        <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition">✕</button>
                    </div>
                    <div className="px-4 md:px-5 pb-5">
                        <div className="flex bg-[var(--color-surface)] rounded-2xl p-1 text-sm mb-4 border" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <button 
                                onClick={() => { setTab('login'); setError(null); setErrors({}); }} 
                                className={`flex-1 py-2 rounded-xl transition ${tab==='login'?'bg-white shadow font-semibold':'text-[var(--color-text-muted)]'}`}
                            >
                                ورود
                            </button>
                            <button 
                                onClick={() => { setTab('register'); setError(null); setErrors({}); }} 
                                className={`flex-1 py-2 rounded-xl transition ${tab==='register'?'bg-white shadow font-semibold':'text-[var(--color-text-muted)]'}`}
                            >
                                ثبت‌نام
                            </button>
                        </div>

                        {error && (
                            <div className="mb-3 rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 text-sm px-3 py-2">{error}</div>
                        )}

                        {tab === 'login' ? (
                            <form onSubmit={handleLogin} className="space-y-3">
                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-1">آیدی اینستاگرام یا شماره تلفن</label>
                                    <input type="text" value={loginForm.login_field} onChange={(e)=>setLoginForm({...loginForm, login_field:convertPersianToEnglish(e.target.value)})} placeholder="@username یا 09123456789" required className={inputClass(errors.login_field)} />
                                    {errors.login_field && <p className="text-red-500 text-xs mt-1">{errors.login_field[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-1">رمز عبور</label>
                                    <input type="password" value={loginForm.password} onChange={(e)=>setLoginForm({...loginForm, password:e.target.value})} required className={inputClass(errors.password)} />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                                </div>
                                <button type="submit" disabled={loading} className="w-full rounded-2xl px-4 py-3 font-semibold text-white transition" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 15px 30px rgba(244,172,63,0.25)' }}>
                                    {loading?'در حال ورود...':'ورود'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-3">
                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-1">نام و نام خانوادگی</label>
                                    <input value={registerForm.name} onChange={(e)=>setRegisterForm({...registerForm, name:e.target.value})} required className={inputClass(errors.name)} />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-1">آیدی اینستاگرام</label>
                                    <input
                                        type="text"
                                        value={registerForm.instagram_id}
                                        onChange={(e)=>setRegisterForm({...registerForm, instagram_id:e.target.value})}
                                        placeholder="@username"
                                        className={inputClass(errors.instagram_id)}
                                    />
                                    {errors.instagram_id && <p className="text-red-500 text-xs mt-1">{errors.instagram_id[0]}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm text-[var(--color-text-muted)] mb-1">شماره تماس</label>
                                    <input value={registerForm.phone} onChange={(e)=>setRegisterForm({...registerForm, phone:convertPersianToEnglish(e.target.value)})} placeholder="09123456789" required className={inputClass(errors.phone)} />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm text-[var(--color-text-muted)] mb-1">رمز عبور</label>
                                        <input type="password" value={registerForm.password} onChange={(e)=>setRegisterForm({...registerForm, password:e.target.value})} required className={inputClass(errors.password)} />
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[var(--color-text-muted)] mb-1">تکرار رمز</label>
                                        <input type="password" value={registerForm.password_confirmation} onChange={(e)=>setRegisterForm({...registerForm, password_confirmation:e.target.value})} required className={inputClass(errors.password_confirmation)} />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="w-full rounded-2xl px-4 py-3 font-semibold text-white transition" style={{ background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))', boxShadow: '0 15px 30px rgba(244,172,63,0.25)' }}>
                                    {loading?'در حال ثبت‌نام...':'ثبت‌نام'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
