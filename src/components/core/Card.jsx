import React from 'react';

export function Card({ interactive = false, glow = false, padding = 24, children, style, onClick, onKeyDown, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const h = interactive && hover;
  // only become its own tab stop when there's actually a click handler to
  // trigger — Card is also used purely for the hover-lift styling inside an
  // already-focusable wrapper (e.g. an <a>), where a second tab stop would
  // just be a redundant stop for keyboard users, not an extra feature.
  const clickable = interactive && !!onClick;
  const handleKeyDown = (e) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
    onKeyDown?.(e);
  };
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={onClick} onKeyDown={handleKeyDown}
      role={clickable ? 'button' : undefined} tabIndex={clickable ? 0 : undefined}
      style={{ background: h ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid ' + (h ? 'var(--nebula-cyan-30)' : 'var(--glass-border)'),
        borderRadius: 'var(--radius-card)', padding,
        boxShadow: (glow || h ? 'var(--glow-cyan-soft), ' : '') + 'var(--glass-highlight)',
        cursor: interactive ? 'pointer' : 'default',
        transform: h ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 300ms var(--ease-hud), background 300ms var(--ease-hud), border-color 300ms var(--ease-hud), box-shadow 300ms var(--ease-hud)',
        fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', ...style }}
      {...rest}>{children}</div>
  );
}
