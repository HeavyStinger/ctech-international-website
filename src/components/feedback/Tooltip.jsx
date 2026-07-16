import React from 'react';

export function Tooltip({ label, children, style }) {
  const [show, setShow] = React.useState(false);
  return (
    <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}>
      {children}
      {show && (
        <span role="tooltip" style={{ position: 'absolute', bottom: '100%', left: '50%',
          transform: 'translateX(-50%) translateY(-8px)', whiteSpace: 'nowrap',
          background: 'var(--space-surface-hover)', border: '1px solid var(--nebula-cyan-30)',
          borderRadius: 'var(--radius-input)', boxShadow: 'var(--glow-cyan-soft)',
          color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 12.5,
          padding: '6px 10px', zIndex: 50, pointerEvents: 'none' }}>{label}</span>
      )}
    </span>
  );
}
