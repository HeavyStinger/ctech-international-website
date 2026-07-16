import React from 'react';

export function Eyebrow({ children, style }) {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-eyebrow)', fontWeight: 400,
      letterSpacing: 'normal', textTransform: 'uppercase', color: 'var(--text-primary)', ...style }}>{children}</div>
  );
}
