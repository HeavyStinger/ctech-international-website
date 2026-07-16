import React from 'react';

export function Dialog({ open, onClose, title, children, footer, width = 480 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100,
      background: 'var(--scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{ width, maxWidth: '100%', background: 'var(--space-surface)',
          border: '1.6px solid var(--space-border)', borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glow-cyan-soft)', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
          <button onClick={onClose} aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
              fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
        </div>
        <div style={{ padding: '14px 24px 24px', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{children}</div>
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '0 24px 24px' }}>{footer}</div>
        )}
      </div>
    </div>
  );
}
