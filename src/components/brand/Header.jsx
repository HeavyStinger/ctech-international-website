import React from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../core/Button.jsx';
import { withBase } from '../../lib/url.js';

function HeaderNavLink({ href, active, children, onClick, large }) {
  const [h, setH] = React.useState(false);
  const on = h || active;
  return (
    <a href={href} aria-current={active ? 'page' : undefined} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontFamily: 'var(--font-sans)', fontSize: large ? 17 : 14.5, textDecoration: 'none', padding: large ? '12px 2px' : '8px 2px',
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        textShadow: on ? '0 0 14px rgba(0,204,255,0.5)' : 'none',
        borderBottom: active ? '2px solid var(--nebula-cyan)' : '2px solid transparent',
        transition: 'all 200ms var(--ease-hud)' }}>{children}</a>
  );
}

// how long the enter/exit transform+opacity transition runs — kept in one place
// so the "wait, then unmount" timer below can't drift out of sync with the CSS.
const DRAWER_DURATION = 260;

function NavDrawer({ open, onClose, links, path }) {
  const [visible, setVisible] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const rafRef = React.useRef(null);
  const closeTimerRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      clearTimeout(closeTimerRef.current);
      setVisible(true);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setEntered(true));
      });
      document.body.style.overflow = 'hidden';
    } else {
      setEntered(false); // play the exit transition first
      closeTimerRef.current = setTimeout(() => setVisible(false), DRAWER_DURATION);
      document.body.style.overflow = '';
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [open]);

  React.useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!visible || typeof document === 'undefined') return null;

  // portalled to <body>: the header uses backdrop-filter, which creates a new
  // containing block for `position: fixed` descendants — without the portal,
  // this sheet would be clipped to the header's own box instead of the viewport.
  return createPortal(
    <div className="ctech-nav-drawer" onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'var(--scrim)',
        fontFamily: 'var(--font-sans)',
        opacity: entered ? 1 : 0, transition: `opacity ${DRAWER_DURATION}ms var(--ease-hud)` }}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '80vh', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto',
          padding: 'var(--space-3) var(--space-7) calc(var(--space-6) + env(safe-area-inset-bottom, 0px))',
          background: 'var(--space-surface)', border: '1px solid var(--space-border)', borderBottom: 'none',
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
          boxShadow: 'var(--glass-highlight)',
          transform: entered ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform ${DRAWER_DURATION}ms var(--ease-hud)` }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--space-border)', margin: '0 auto 4px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button aria-label="Close menu" onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)',
              padding: 6, display: 'flex' }}>
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>
        {links.map((l) => (
          <HeaderNavLink key={l.label} href={l.href} active={path === l.href} large onClick={onClose}>
            {l.label}
          </HeaderNavLink>
        ))}
        <a href={withBase('/build')} onClick={onClose} style={{ textDecoration: 'none', marginTop: 8, display: 'block' }}>
          <Button variant="secondary" size="sm" style={{ width: '100%' }}>Book a Call</Button>
        </a>
      </div>
    </div>,
    document.body
  );
}

export function Header() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const links = [
    { label: 'Home', href: withBase('/') },
    { label: 'Services', href: withBase('/services') },
    { label: 'Build Your Site', href: withBase('/build') },
    { label: 'Portfolio', href: withBase('/portfolio') },
    { label: 'Products', href: withBase('/products') },
    { label: 'About', href: withBase('/about') },
  ];

  React.useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setDrawerOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header data-screen-label="Nav" style={{ position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(5,8,15,0.5)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
      borderBottom: '1px solid var(--glass-border)' }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href={withBase('/')} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={withBase('/logo.png')} alt="Ctech International" style={{ height: 34, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
        </a>
        <nav className="ctech-nav-desktop" style={{ alignItems: 'center', gap: 26 }}>
          {links.map((l) => <HeaderNavLink key={l.label} href={l.href} active={path === l.href}>{l.label}</HeaderNavLink>)}
          <a href={withBase('/build')} style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="sm">Book a Call</Button>
          </a>
        </nav>
        <button className="ctech-nav-toggle" aria-label="Open menu" onClick={() => setDrawerOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 6 }}>
          <Menu size={24} strokeWidth={1.75} />
        </button>
      </div>

      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={links} path={path} />
    </header>
  );
}
