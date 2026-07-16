import React from 'react';
import { Button } from '../core/Button.jsx';

function HeaderNavLink({ href, active, children }) {
  const [h, setH] = React.useState(false);
  const on = h || active;
  return (
    <a href={href} aria-current={active ? 'page' : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize: 14.5, textDecoration: 'none', padding: '8px 2px',
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        textShadow: on ? '0 0 14px rgba(0,204,255,0.5)' : 'none',
        borderBottom: active ? '2px solid var(--nebula-cyan)' : '2px solid transparent',
        transition: 'all 200ms var(--ease-hud)' }}>{children}</a>
  );
}

export function Header() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48 };
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const links = [
    { label: 'Services', href: '/services' },
    { label: 'Build Your Site', href: '/build' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
  ];
  return (
    <header data-screen-label="Nav" style={{ position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(5,8,15,0.5)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
      borderBottom: '1px solid var(--glass-border)' }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Ctech International" style={{ height: 34, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {links.map((l) => <HeaderNavLink key={l.label} href={l.href} active={path === l.href}>{l.label}</HeaderNavLink>)}
          <Button variant="secondary" size="sm">Book a Call</Button>
        </nav>
      </div>
    </header>
  );
}
