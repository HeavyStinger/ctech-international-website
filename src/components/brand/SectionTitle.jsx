import React from 'react';

export function SectionTitle({ title, lead }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 680 }}>
      <div style={{ width: 40, height: 2, background: 'var(--nebula-cyan)', boxShadow: '0 0 12px rgba(0,204,255,0.6)' }} />
      <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>{title}</h2>
      {lead && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{lead}</p>}
    </div>
  );
}
