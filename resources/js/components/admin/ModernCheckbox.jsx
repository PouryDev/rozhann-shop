import React from 'react';

function ModernCheckbox({ 
    checked = false, 
    onChange, 
    label, 
    disabled = false,
    className = "",
    name
}) {
    return (
        <label className={`flex items-center space-x-3 space-x-reverse cursor-pointer group ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    checked
                        ? 'border-[var(--color-primary)]'
                        : 'border-[var(--color-border-subtle)] hover:border-[var(--color-primary)]/40'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={checked ? { background: 'linear-gradient(120deg, var(--color-primary), var(--color-accent))' } : {}}
                >
                    {checked && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            </div>
            {label && (
                <span className={`text-sm transition-colors duration-200 ${
                    disabled 
                        ? 'text-[var(--color-text-muted)]' 
                        : checked 
                            ? 'text-[var(--color-text)]' 
                            : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]'
                }`}>
                    {label}
                </span>
            )}
        </label>
    );
}

export default ModernCheckbox;
