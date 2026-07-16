import React from 'react';

export function Toast({ title, description, variant = 'info', onDismiss, style }) {
  const dot = variant === 'success' ? 'var(--nebula-cyan)' : variant === 'error' ? '#F87171' : 'var(--text-secondary)';
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 12,
      width: 360, maxWidth: '100%', padding: '14px 16px',
      background: 'var(--space-surface)', border: '1px solid var(--space-border)',
      borderRadius: 'var(--radius-card)',
      boxShadow: variant === 'success' ? 'var(--glow-cyan-soft)' : '0 8px 24px rgba(0,0,0,0.5)',
      fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', ...style }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, marginTop: 6, flexShrink: 0,
        boxShadow: variant === 'success' ? '0 0 8px rgba(0,204,255,0.6)' : 'none' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 2 }}>{description}</div>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
            fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
      )}
    </div>
  );
}
