import React, { useState, useRef, useEffect } from 'react';

function AutocompleteSelect({ 
    options = [], 
    value = null, // Can be {id: X} or {name: 'Y'}
    onChange, 
    placeholder = 'تایپ کنید یا انتخاب کنید...',
    className = "",
    disabled = false,
    name
}) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Initialize input value from prop
    useEffect(() => {
        if (value) {
            if (value.id) {
                // Find the option by id
                const option = options.find(opt => opt.id === value.id);
                if (option) {
                    setInputValue(option.name);
                }
            } else if (value.name) {
                setInputValue(value.name);
            }
        } else {
            setInputValue('');
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter options based on input value
    const filteredOptions = inputValue.trim() 
        ? options.filter(option =>
            option.name.toLowerCase().includes(inputValue.toLowerCase())
          ).slice(0, 10) // Limit to 10 suggestions
        : options.slice(0, 10);

    // Check if input value exactly matches an existing option
    const exactMatch = options.find(option => 
        option.name.toLowerCase() === inputValue.toLowerCase().trim()
    );

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setShowSuggestions(true);
        setSelectedIndex(-1);

        // If exact match, use the id
        const match = options.find(option => 
            option.name.toLowerCase() === newValue.toLowerCase().trim()
        );
        
        if (match) {
            onChange({ id: match.id });
        } else if (newValue.trim()) {
            // New value, send name
            onChange({ name: newValue.trim() });
        } else {
            // Empty, send null
            onChange(null);
        }
    };

    const handleSelect = (option) => {
        setInputValue(option.name);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        onChange({ id: option.id });
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions && filteredOptions.length > 0 && (e.key === 'ArrowDown' || e.key === 'Enter')) {
            setShowSuggestions(true);
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => 
                prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && selectedIndex >= 0 && filteredOptions[selectedIndex]) {
            e.preventDefault();
            handleSelect(filteredOptions[selectedIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Hidden inputs for form submission */}
            {name && (
                <>
                    <input
                        type="hidden"
                        name={`${name}_id`}
                        value={value?.id || ''}
                    />
                    <input
                        type="hidden"
                        name={`${name}_name`}
                        value={value?.name || ''}
                    />
                </>
            )}
            
            {/* Input */}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 ${
                    disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : ''
                }`}
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border-subtle)] rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                    {filteredOptions.map((option, index) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`w-full text-right px-4 py-3 hover:bg-[var(--color-surface-alt)] transition-colors duration-200 ${
                                selectedIndex === index
                                    ? 'bg-[var(--color-primary)]/5 text-[var(--color-primary-strong)]' 
                                    : value?.id === option.id
                                    ? 'bg-[var(--color-primary)]/5 text-[var(--color-primary-strong)]'
                                    : 'text-[var(--color-text)]'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{option.name}</span>
                                {value?.id === option.id && (
                                    <svg className="w-4 h-4 text-[var(--color-primary-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Show indicator if it's a new value */}
            {inputValue.trim() && !exactMatch && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                    جدید
                </div>
            )}
        </div>
    );
}

export default AutocompleteSelect;

