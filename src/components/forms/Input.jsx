import React from 'react';
import { Star } from 'lucide-react';

export const Input = React.forwardRef(function Input({ label, hint, error, multiline = false, required = false, style, onFocus, onBlur, id, ...rest }, ref) {
  const [focus, setFocus] = React.useState(false);
  const generatedId = React.useId();
  const messageId = (error || hint) ? `${id || generatedId}-message` : undefined;
  const Field = multiline ? 'textarea' : 'input';
  const fieldStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--surface-translucent)',
    border: '1px solid ' + (error ? 'rgba(248,113,113,0.6)' : focus ? 'var(--nebula-cyan-60)' : 'var(--space-border)'),
    borderRadius: 'var(--radius-input)',
    boxShadow: focus && !error ? 'var(--glow-cyan-soft)' : 'none',
    color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 15,
    padding: '11px 14px', outline: 'none',
    transition: 'border-color 250ms var(--ease-hud), box-shadow 250ms var(--ease-hud)',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? 96 : undefined,
  };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', ...style }}>
      {label && (
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          {label}
          {required && <Star size={7} strokeWidth={0} fill="var(--nebula-cyan)" color="var(--nebula-cyan)" aria-label="required" />}
        </span>
      )}
      <Field ref={ref} id={id || generatedId} required={required} aria-invalid={error ? true : undefined} aria-describedby={messageId}
        onFocus={(e) => { setFocus(true); onFocus?.(e); }} onBlur={(e) => { setFocus(false); onBlur?.(e); }}
        style={fieldStyle} {...rest} />
      {error ? (
        <span id={messageId} style={{ fontSize: 12, color: '#F87171' }}>{error}</span>
      ) : hint ? (
        <span id={messageId} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{hint}</span>
      ) : null}
    </label>
  );
});
