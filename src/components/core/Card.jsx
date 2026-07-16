import React from 'react';

export function Card({ interactive = false, glow = false, padding = 24, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const h = interactive && hover;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: h ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid ' + (h ? 'var(--nebula-cyan-30)' : 'var(--glass-border)'),
        borderRadius: 'var(--radius-card)', padding,
        boxShadow: (glow || h ? 'var(--glow-cyan-soft), ' : '') + 'var(--glass-highlight)',
        cursor: interactive ? 'pointer' : 'default',
        transform: h ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 300ms var(--ease-hud)',
        fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', ...style }}
      {...rest}>{children}</div>
  );
}
