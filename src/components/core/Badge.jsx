import React from 'react';

export function Badge({ variant = 'cyan', children, style }) {
  const variants = {
    cyan: { background: 'var(--nebula-cyan-10)', color: 'var(--nebula-cyan)', border: '1px solid var(--nebula-cyan-30)' },
    neutral: { background: 'var(--space-surface-hover)', color: 'var(--text-secondary)', border: '1px solid var(--space-border)' },
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
      textTransform: 'uppercase', borderRadius: 'var(--radius-control)',
      ...variants[variant], ...style }}>{children}</span>
  );
}
