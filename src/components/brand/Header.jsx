import React from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../core/Button.jsx';
import { withBase } from '../../lib/url.js';

const SERVICES_SECTIONS = [
  { label: 'Development', id: 'development' },
  { label: 'Infrastructure', id: 'infrastructure' },
  { label: 'Local Presence', id: 'local-presence' },
  { label: 'Design', id: 'design' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Emerging', id: 'emerging' },
  { label: 'Frameworks & Stack', id: 'frameworks-stack' },
  { label: 'Design & Development Tools', id: 'design-tools' },
];

// withBase('/') always ends in a trailing slash, but the browser's actual
// pathname for the homepage may or may not have one depending on how the
// URL was reached, so compare paths with any trailing slash stripped.
function samePath(a, b) {
  const strip = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  return strip(a) === strip(b);
}

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
        transition: 'color 200ms var(--ease-hud), text-shadow 200ms var(--ease-hud), border-color 200ms var(--ease-hud)' }}>{children}</a>
  );
}

function DropdownLink({ href, children, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onFocus={() => setH(true)} onBlur={() => setH(false)}
      style={{ display: 'block', padding: '9px 12px', borderRadius: 'var(--radius-control)', fontSize: 14,
        textDecoration: 'none', color: h ? 'var(--text-primary)' : 'var(--text-secondary)',
        background: h ? 'var(--space-surface-hover)' : 'transparent',
        transition: 'color 150ms var(--ease-hud), background 150ms var(--ease-hud)' }}>
      {children}
    </a>
  );
}

// desktop-only: "Services" nav link with a hover-revealed dropdown listing
// every section of the Services page, each linking to its #id with the
// page's own scroll-behavior:smooth (see BaseLayout.astro) doing the rest.
// Opens on hover OR keyboard focus (onFocus/onBlur with a contains() check),
// and closes on Escape, so keyboard users can reach it too.
function ServicesNavDropdown({ href, active, sections }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef(null);
  // Escape closes the menu and returns focus to the trigger link — but that
  // link sits inside this same onFocus-opens-the-menu container, so the
  // refocus would otherwise immediately reopen it. Suppress exactly the one
  // focus event that follows an Escape-triggered refocus.
  const suppressFocusOpen = React.useRef(false);
  const on = open || active;
  const handleFocus = () => {
    if (suppressFocusOpen.current) {
      suppressFocusOpen.current = false;
      return;
    }
    setOpen(true);
  };
  const handleBlur = (e) => {
    if (!containerRef.current || !containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      suppressFocusOpen.current = true;
      setOpen(false);
      containerRef.current?.querySelector('a')?.focus();
    }
  };
  return (
    <div ref={containerRef} style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <a href={href} aria-current={active ? 'page' : undefined} aria-expanded={open} aria-haspopup="true"
        style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)', fontSize: 14.5,
          textDecoration: 'none', padding: '8px 2px',
          color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
          textShadow: on ? '0 0 14px rgba(0,204,255,0.5)' : 'none',
          borderBottom: active ? '2px solid var(--nebula-cyan)' : '2px solid transparent',
          transition: 'color 200ms var(--ease-hud), text-shadow 200ms var(--ease-hud), border-color 200ms var(--ease-hud)' }}>
        Services
        <ChevronDown size={13} strokeWidth={2} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--ease-hud)' }} />
      </a>
      <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 10,
        opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden',
        transform: open ? 'translateY(0)' : 'translateY(-6px)',
        transition: 'opacity 180ms var(--ease-hud), transform 180ms var(--ease-hud)', pointerEvents: open ? 'auto' : 'none' }}>
        <div style={{ minWidth: 230, display: 'flex', flexDirection: 'column', gap: 2, padding: 8,
          background: 'var(--space-surface)', border: '1px solid var(--space-border)',
          borderRadius: 'var(--radius-card)', boxShadow: 'var(--glass-highlight)' }}>
          {sections.map((s) => (
            <DropdownLink key={s.id} href={`${href}#${s.id}`}>{s.label}</DropdownLink>
          ))}
        </div>
      </div>
    </div>
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
  const panelRef = React.useRef(null);
  const previouslyFocused = React.useRef(null);

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

  // same focus-trap pattern as Dialog.jsx: move focus in on open, cycle Tab
  // within the panel, restore focus to whatever opened it on close.
  React.useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    panelRef.current?.querySelector('button[aria-label="Close menu"]')?.focus();
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
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
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus?.();
    };
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
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Site navigation" onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '80vh', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', overscrollBehavior: 'contain',
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
          <React.Fragment key={l.label}>
            <HeaderNavLink href={l.href} active={samePath(path, l.href)} large onClick={onClose}>
              {l.label}
            </HeaderNavLink>
            {l.sections && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1,
                paddingLeft: 16, marginTop: -2, marginBottom: 6, borderLeft: '1px solid var(--space-border)' }}>
                {l.sections.map((s) => (
                  <a key={s.id} href={`${l.href}#${s.id}`} onClick={onClose}
                    style={{ padding: '7px 14px', fontSize: 13.5, textDecoration: 'none', color: 'var(--text-secondary)' }}>
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
        <Button href={`${withBase('/contact')}#form`} onClick={onClose} variant="secondary" size="sm" style={{ width: '100%', marginTop: 8 }}>Contact the Professionals</Button>
      </div>
    </div>,
    document.body
  );
}

export function Header({ currentPath } = {}) {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  // `currentPath` is passed by the Astro page (known server-side via Astro.url.pathname)
  // so the active-link state matches between SSR and hydration; falls back to
  // window.location for any caller that doesn't pass it.
  const path = currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const links = [
    { label: 'Home', href: withBase('/') },
    { label: 'Services', href: withBase('/services'), sections: SERVICES_SECTIONS },
    { label: 'Build My Site Estimate', href: withBase('/build') },
    { label: 'Portfolio', href: withBase('/portfolio') },
    { label: 'Products', href: withBase('/products') },
    { label: 'About', href: withBase('/about') },
  ];

  React.useEffect(() => {
    function onResize() {
      // must match the .ctech-nav-desktop breakpoint in effects.css
      if (window.innerWidth >= 1024) setDrawerOpen(false);
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
          <img src={withBase('/logo.png')} alt="Ctech International" width={63} height={34} loading="eager" fetchPriority="high" decoding="async" style={{ height: 34, width: 63, display: 'block', filter: 'brightness(0) invert(1)' }} />
        </a>
        <nav className="ctech-nav-desktop" style={{ alignItems: 'center', gap: 26 }}>
          {links.map((l) => l.sections
            ? <ServicesNavDropdown key={l.label} href={l.href} active={samePath(path, l.href)} sections={l.sections} />
            : <HeaderNavLink key={l.label} href={l.href} active={samePath(path, l.href)}>{l.label}</HeaderNavLink>)}
          <Button href={`${withBase('/contact')}#form`} variant="secondary" size="sm">Contact the Professionals</Button>
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
