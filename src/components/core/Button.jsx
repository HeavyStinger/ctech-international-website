import React from 'react';

export function Button({ variant = 'primary', size = 'md', disabled = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const h = hover && !disabled;
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 14 },
    md: { padding: '12px 24px', fontSize: 16 },
    lg: { padding: '16px 32px', fontSize: 18 },
  };
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--radius-control)',
    transition: 'all 250ms var(--ease-hud)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    opacity: disabled ? 0.4 : 1,
    ...sizes[size],
  };
  const variants = {
    primary: {
      background: 'var(--nebula-cyan)', color: 'var(--space-black)', border: 'none',
      boxShadow: h ? 'var(--glow-cyan-strong)' : 'none',
    },
    secondary: {
      background: 'var(--surface-translucent)', color: 'var(--text-primary)',
      border: '0.8px solid ' + (h ? 'var(--nebula-cyan-60)' : 'var(--nebula-cyan-50)'),
      boxShadow: h ? 'var(--glow-cyan-strong)' : 'var(--glow-cyan)',
    },
    ghost: {
      background: h ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
      color: 'var(--text-primary)',
      border: '1px solid ' + (h ? 'var(--nebula-cyan-50)' : 'var(--glass-border)'),
      boxShadow: (h ? 'var(--glow-cyan-soft), ' : '') + 'var(--glass-highlight)',
      transform: h ? 'translateY(-2px)' : 'translateY(0)',
    },
  };
  return (
    <button disabled={disabled} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }} {...rest}>{children}</button>
  );
}
