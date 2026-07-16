import React from 'react';

export function Select({ label, options = [], style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', ...style }}>
      {label && <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>}
      <div style={{ position: 'relative' }}>
        <select onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ width: '100%', appearance: 'none', WebkitAppearance: 'none',
            background: 'var(--surface-translucent)',
            border: '1px solid ' + (focus ? 'var(--nebula-cyan-60)' : 'var(--space-border)'),
            boxShadow: focus ? 'var(--glow-cyan-soft)' : 'none',
            borderRadius: 'var(--radius-input)', color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)', fontSize: 15, padding: '11px 36px 11px 14px',
            outline: 'none', cursor: 'pointer', transition: 'all 250ms var(--ease-hud)' }} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value} style={{ background: '#0D1220', color: '#F8FAFC' }}>{o.label}</option>
          ))}
        </select>
        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 11 }}>▾</span>
      </div>
    </label>
  );
}
