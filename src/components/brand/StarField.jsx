import React from 'react';

/* Deterministic scattered star-points. Parent must be position:relative. */
export function StarField({ count = 24, seed = 7, opacity = 0.35, style }) {
  const stars = React.useMemo(() => {
    let s = seed;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    return Array.from({ length: count }, (_, i) => ({
      id: i, x: rnd() * 100, y: rnd() * 100,
      r: 0.75 + rnd() * 1.25, o: 0.4 + rnd() * 0.6,
    }));
  }, [count, seed]);
  return (
    <svg aria-hidden="true" width="100%" height="100%" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, ...style }}>
      {stars.map((st) => (
        <circle key={st.id} cx={st.x + '%'} cy={st.y + '%'} r={st.r} fill="#F8FAFC" opacity={st.o} />
      ))}
    </svg>
  );
}
