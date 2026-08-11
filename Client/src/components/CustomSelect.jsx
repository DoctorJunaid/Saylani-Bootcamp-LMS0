import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ label, defaultOption, options, value, onChange, className = '' }) {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(defaultOption || (options && options[0]));
  const ref = useRef(null);

  // Use controlled value if provided, else internal state
  const selected = value !== undefined ? value : internalSelected;

  // Handle click outside to close
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = (opt) => {
    if (onChange) {
      onChange(opt);
    } else {
      setInternalSelected(opt);
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative w-full sm:w-auto ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between gap-2 w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[var(--color-primary)] text-sm font-medium cursor-pointer transition-all duration-[var(--duration-fast)] ${
          open
            ? 'bg-[var(--color-primary-container)]/10 text-[var(--color-primary)]'
            : 'bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:opacity-90'
        }`}
      >
        <span className="truncate">{selected}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-[var(--duration-fast)] ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full sm:min-w-[180px] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] py-1 max-h-60 overflow-auto"
        >
          {/* Include defaultOption in the list if provided */}
          {(defaultOption ? [defaultOption, ...options] : options).map((opt) => {
            const isSelected = opt === selected;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt)}
                className={`flex items-center justify-between gap-2 px-4 py-2 text-sm cursor-pointer transition-colors duration-[var(--duration-fast)] ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] font-medium'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-low)] hover:text-[var(--color-text)]'
                }`}
              >
                {opt}
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
