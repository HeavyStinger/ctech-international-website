import React from 'react';

export function Tabs({ items = [], activeId, onChange, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--space-border)',
      fontFamily: 'var(--font-sans)', ...style }}>
      {items.map((it) => {
        const active = it.id === activeId;
        return <TabItem key={it.id} item={it} active={active} onChange={onChange} />;
      })}
    </div>
  );
}

function TabItem({ item, active, onChange }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button role="tab" aria-selected={active} onClick={() => onChange && onChange(item.id)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: 'none', border: 'none', cursor: 'pointer',
        padding: '10px 16px', marginBottom: -1, fontFamily: 'var(--font-sans)',
        fontSize: 15, fontWeight: active ? 600 : 400,
        color: active ? 'var(--text-primary)' : hover ? 'var(--text-primary)' : 'var(--text-secondary)',
        borderBottom: '2px solid ' + (active ? 'var(--nebula-cyan)' : 'transparent'),
        textShadow: active ? '0 0 16px rgba(0,204,255,0.4)' : 'none',
        transition: 'all 200ms var(--ease-hud)' }}>{item.label}</button>
  );
}
