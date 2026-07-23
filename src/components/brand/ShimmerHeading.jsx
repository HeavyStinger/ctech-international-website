import React from 'react';

export function ShimmerHeading({ as = 'h1', size = 80, animated = true, children, style }) {
  const Tag = as;
  return (
    <Tag className={animated ? 'shimmer-text' : undefined}
      style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 700,
        // fluid below the size the heading was designed at, never above it —
        // desktop (where vw comfortably exceeds `size`) renders at exactly `size`,
        // unchanged; narrow viewports scale the font down instead of overflowing.
        fontSize: `min(${size}px, 13vw)`, lineHeight: 1.05, letterSpacing: '-0.01em',
        ...(animated ? {} : {
          background: 'var(--shimmer-gradient)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
          WebkitTextFillColor: 'transparent', color: 'transparent',
        }), ...style }}>{children}</Tag>
  );
}
