import React from 'react';

export function Radio({ label, checked, onChange, name, value, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <label onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-primary)', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled}
        onChange={() => onChange && onChange(value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" style={{ width: 18, height: 18, flexShrink: 0, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid ' + (checked ? 'var(--nebula-cyan)' : hover ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        background: 'var(--surface-translucent)',
        boxShadow: checked ? 'var(--glow-cyan-soft)' : 'none',
        transition: 'all 150ms var(--ease-hud)' }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nebula-cyan)' }} />}
      </span>
      {label}
    </label>
  );
}
