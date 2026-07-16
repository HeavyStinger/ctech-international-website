import React from 'react';

export function Tag({ children, onRemove, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 400,
        background: hover ? 'var(--space-surface-hover)' : 'var(--space-surface)',
        color: 'var(--text-primary)', border: '1px solid var(--space-border)',
        borderRadius: 'var(--radius-input)', transition: 'all 150ms var(--ease-hud)', ...style }}>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1 }}>×</button>
      )}
    </span>
  );
}
