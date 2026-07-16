import React from 'react';

export function Checkbox({ label, checked, onChange, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <label onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-primary)', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" style={{ width: 18, height: 18, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-control)',
        border: '1px solid ' + (checked ? 'var(--nebula-cyan)' : hover ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        background: checked ? 'var(--nebula-cyan)' : 'var(--surface-translucent)',
        boxShadow: checked ? 'var(--glow-cyan-soft)' : 'none',
        transition: 'all 150ms var(--ease-hud)' }}>
        {checked && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.8 9L10 3.5" stroke="#05080F" strokeWidth="2" strokeLinecap="square" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
