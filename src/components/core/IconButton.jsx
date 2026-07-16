import React from 'react';

export function IconButton({ variant = 'secondary', size = 'md', disabled = false, label, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const h = hover && !disabled;
  const dims = { sm: 32, md: 40, lg: 48 };
  const d = dims[size];
  const variants = {
    primary: { background: 'var(--nebula-cyan)', color: 'var(--space-black)', border: 'none', boxShadow: h ? 'var(--glow-cyan-strong)' : 'none' },
    secondary: { background: 'var(--surface-translucent)', color: 'var(--text-primary)', border: '0.8px solid ' + (h ? 'var(--nebula-cyan-60)' : 'var(--nebula-cyan-50)'), boxShadow: h ? 'var(--glow-cyan-strong)' : 'var(--glow-cyan)' },
    ghost: { background: h ? 'var(--glass-bg-hover)' : 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', color: 'var(--text-primary)', border: '1px solid ' + (h ? 'var(--nebula-cyan-50)' : 'var(--glass-border)'), boxShadow: (h ? 'var(--glow-cyan-soft), ' : '') + 'var(--glass-highlight)' },
  };
  return (
    <button aria-label={label} title={label} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-control)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, transition: 'all 250ms var(--ease-hud)', ...variants[variant], ...style }}
      {...rest}>{children}</button>
  );
}
