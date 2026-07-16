import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../core/Button.jsx';

/* lucide-react dropped brand/logo icons, so socials are hand-drawn to match its thin-stroke line weight */
function InstagramGlyph({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M14 8.5h-1.5A1.5 1.5 0 0 0 11 10v2H9v3h2v5.5h3V15h2l.5-3h-2.5v-1.5a.5.5 0 0 1 .5-.5H16V8.5z" />
    </svg>
  );
}

function LinkedinGlyph({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <line x1="8" y1="10.5" x2="8" y2="16" />
      <circle cx="8" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.5 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="16" />
    </svg>
  );
}

function FooterLink({ href = '#', active, children }) {
  const [h, setH] = React.useState(false);
  const on = h || active;
  return (
    <a href={href} aria-current={active ? 'page' : undefined}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize: 14.5, textDecoration: 'none', fontWeight: active ? 600 : 400,
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        textShadow: on ? '0 0 14px rgba(0,204,255,0.5)' : 'none',
        transition: 'all 200ms var(--ease-hud)' }}>
      {children}
    </a>
  );
}

function FooterContactLink({ href, Icon, children }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, textDecoration: 'none',
        color: h ? 'var(--text-primary)' : 'var(--text-secondary)',
        textShadow: h ? '0 0 14px rgba(0,204,255,0.5)' : 'none',
        transition: 'all 200ms var(--ease-hud)' }}>
      <Icon size={15} strokeWidth={1.75} color={h ? 'var(--text-primary)' : 'var(--text-secondary)'} />
      {children}
    </a>
  );
}

function FooterColumn({ title, links, currentPath }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map((l) => (
          <FooterLink key={l.label} href={l.href} active={l.href !== '#' && currentPath === l.href}>{l.label}</FooterLink>
        ))}
      </div>
    </div>
  );
}

function SocialIconLink({ href, label, Glyph }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} aria-label={label} title={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-control)', textDecoration: 'none',
        background: hover ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid ' + (hover ? 'var(--nebula-cyan-50)' : 'var(--glass-border)'),
        boxShadow: (hover ? 'var(--glow-cyan-soft), ' : '') + 'var(--glass-highlight)',
        transition: 'all 250ms var(--ease-hud)' }}>
      <Glyph size={16} color={hover ? 'var(--nebula-cyan)' : 'var(--text-secondary)'} />
    </a>
  );
}

export function Footer() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48, position: 'relative' };
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const explore = [
    { label: 'Services & Tech', href: '/services' },
    { label: 'Build Your Site', href: '/build' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
  ];
  const products = [
    { label: 'Tapt', href: '/products' },
    { label: 'Tesseract', href: '/products' },
    { label: 'Book a Call', href: '#' },
  ];
  const legal = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];
  const socials = [
    { label: 'Instagram', Glyph: InstagramGlyph, href: '#' },
    { label: 'Facebook', Glyph: FacebookGlyph, href: '#' },
    { label: 'LinkedIn', Glyph: LinkedinGlyph, href: '#' },
  ];

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid var(--glass-border)',
      background: 'var(--glass-tint)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)' }}>

      <div style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-7)' }}>

        {/* the one glass element in the footer — subtle, not glowing, just enough separation to read as THE action */}
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glass-highlight)',
          padding: '40px 48px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, marginBottom: 'var(--space-9)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
            <div style={{ fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Let's build something that wins clients
            </div>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              A 20-minute call is all it takes to scope your project.
            </div>
          </div>
          <Button variant="primary" size="lg">Book a Consultation</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 280 }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-primary)' }}>
              CTECH INTERNATIONAL
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Websites, web apps, and everything around them. Built in Belize, ready for the world.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FooterContactLink href="tel:+5016008328" Icon={Phone}>+501 600-8328</FooterContactLink>
              <FooterContactLink href="mailto:info@ctechintl.com" Icon={Mail}>info@ctechintl.com</FooterContactLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                <MapPin size={15} strokeWidth={1.75} /> Belize City, Belize
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {socials.map(({ label, Glyph, href }) => (
                <SocialIconLink key={label} label={label} Glyph={Glyph} href={href} />
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={explore} currentPath={currentPath} />
          <FooterColumn title="Products" links={products} currentPath={currentPath} />
          <FooterColumn title="Legal" links={legal} currentPath={currentPath} />
        </div>

        <div style={{ height: 1, background: 'var(--space-border)', margin: 'var(--space-7) 0 var(--space-5)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          fontSize: 14, color: 'var(--text-secondary)' }}>
          <span>© 2026 Ctech International · Belize City, Belize</span>
          <span>Powered by <span style={{ color: 'var(--text-primary)' }}>Ctech International</span></span>
        </div>
      </div>
    </footer>
  );
}
