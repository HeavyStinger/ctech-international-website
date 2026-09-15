import React from 'react';

function CloseButton({ onClose }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClose} aria-label="Close"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: hover ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontSize: 20, lineHeight: 1, padding: 4, transition: 'color 150ms var(--ease-hud)' }}>×</button>
  );
}

export function Dialog({ open, onClose, title, children, footer, width = 480 }) {
  const panelRef = React.useRef(null);
  const previouslyFocused = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    panelRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100,
      background: 'var(--scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="ctech-dialog-title" tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ width, maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto', overscrollBehavior: 'contain',
          outline: 'none', background: 'var(--space-surface)',
          border: '1.6px solid var(--space-border)', borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glow-cyan-soft)', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 0' }}>
          <h2 id="ctech-dialog-title" style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{title}</h2>
          <CloseButton onClose={onClose} />
        </div>
        <div style={{ padding: '14px 24px 24px', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{children}</div>
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: '0 24px 24px' }}>{footer}</div>
        )}
      </div>
    </div>
  );
}
