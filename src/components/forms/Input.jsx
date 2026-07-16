import React from 'react';

export function Input({ label, hint, error, multiline = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const Field = multiline ? 'textarea' : 'input';
  const fieldStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--surface-translucent)',
    border: '1px solid ' + (error ? 'rgba(248,113,113,0.6)' : focus ? 'var(--nebula-cyan-60)' : 'var(--space-border)'),
    borderRadius: 'var(--radius-input)',
    boxShadow: focus && !error ? 'var(--glow-cyan-soft)' : 'none',
    color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 15,
    padding: '11px 14px', outline: 'none',
    transition: 'all 250ms var(--ease-hud)',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? 96 : undefined,
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', ...style }}>
      {label && <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>}
      <Field onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={fieldStyle} {...rest} />
      {error ? (
        <span style={{ fontSize: 12, color: '#F87171' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{hint}</span>
      ) : null}
    </label>
  );
}
