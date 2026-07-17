import React from 'react';
import { Lock } from 'lucide-react';

/* Browser-chrome frame for a website/web-app preview. */
export function MockupFrame({ domain, name, image, alt }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
        borderBottom: '1px solid var(--space-border)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FEBC2E' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11.5, color: 'var(--text-secondary)',
          background: 'var(--space-surface)', borderRadius: 'var(--radius-input)', padding: '3px 10px' }}>
          <Lock size={11} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{domain || name}</span>
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
        {image ? (
          <img src={image} alt={alt || name} loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-input)',
            fontSize: 13, color: 'var(--text-secondary)' }}>
            Awaiting artwork
          </div>
        )}
      </div>
    </div>
  );
}
