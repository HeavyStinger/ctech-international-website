import React from 'react';

export function Switch({ label, checked, onChange, disabled = false, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-primary)', opacity: disabled ? 0.4 : 1, ...style }}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span aria-hidden="true" style={{ width: 38, height: 20, flexShrink: 0, borderRadius: 'var(--radius-input)',
        position: 'relative',
        background: checked ? 'var(--nebula-cyan-10)' : 'var(--space-surface-hover)',
        border: '1px solid ' + (checked ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        boxShadow: checked ? 'var(--glow-cyan-soft)' : 'none',
        transition: 'all 250ms var(--ease-hud)' }}>
        <span style={{ position: 'absolute', top: 2, left: checked ? 19 : 2, width: 14, height: 14,
          borderRadius: '2px', background: checked ? 'var(--nebula-cyan)' : 'var(--text-secondary)',
          transition: 'all 250ms var(--ease-hud)' }} />
      </span>
      {label}
    </label>
  );
}
