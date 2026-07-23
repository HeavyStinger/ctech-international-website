import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';

export function Contact() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };

  // client:only means this element doesn't exist yet when the browser does its
  // one-time scroll-to-hash on load, so #form links (from other pages) need a
  // manual scroll once the real DOM node is up.
  React.useEffect(() => {
    if (window.location.hash === '#form') {
      const el = document.getElementById('form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Contact</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Let's talk</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Tell us what you need and we'll get back to you within one business day.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <section id="form" style={{ ...wrap, scrollMarginTop: 88 }}>
          <div style={{ border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-card)',
            padding: '48px var(--space-7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600 }}>The contact form is on its way</div>
              <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 440 }}>
                For now, reach us directly and we'll pick up from there.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
              <a href="tel:+5016008328" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                fontSize: 15, fontWeight: 600, textDecoration: 'none', color: 'var(--text-primary)',
                border: '1px solid var(--nebula-cyan-50)', borderRadius: 'var(--radius-control)',
                background: 'var(--surface-translucent)', boxShadow: 'var(--glow-cyan)' }}>
                <Phone size={17} strokeWidth={1.75} />
                +501 600-8328
              </a>
              <a href="mailto:info@ctechintl.com" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
                fontSize: 15, fontWeight: 600, textDecoration: 'none', color: 'var(--text-primary)',
                border: '1px solid var(--space-border)', borderRadius: 'var(--radius-control)',
                background: 'var(--space-surface)' }}>
                <Mail size={17} strokeWidth={1.75} />
                info@ctechintl.com
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
