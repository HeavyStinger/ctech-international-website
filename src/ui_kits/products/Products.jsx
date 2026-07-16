import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';

const tick = { color: 'var(--nebula-cyan)', flexShrink: 0 };

export function Products() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48 };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 96, paddingBottom: 64,
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Products</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Our own products</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Two products we've built and run ourselves, alongside client work.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 96, paddingBottom: 128 }}>
        <section style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            <Card padding={32}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>Tapt</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>NFC SMART CARDS</div>
              </div>
              <div style={{ marginTop: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 13, lineHeight: 1, color: 'var(--text-secondary)' }}>From</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>150 BZD</span>
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>/year</span>
                </div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>Business card tier, no setup fee</div>
              <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Digital business card</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Google review boosting</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Digital menus</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>WiFi-sharing (planned)</span></div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 20, lineHeight: 1.5 }}>
                Pricing varies by use case. Ask us for a quote on anything beyond the business card tier.
              </p>
              <div style={{ marginTop: 8 }}><Button variant="secondary" size="sm">Ask for a Quote</Button></div>
            </Card>

            <Card padding={32} glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>Tesseract</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--nebula-cyan)' }}>LINK IN BIO</div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>100 BZD</span>
                <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>/year</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>Priced below typical alternatives</div>
              <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>One link for everything you share</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>A premium alternative to Linktree</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>More capable, priced lower</span></div>
              </div>
              <div style={{ marginTop: 32 }}><Button variant="primary" size="sm">Get Tesseract</Button></div>
            </Card>
          </div>
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Have questions about Tapt or Tesseract?</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes.</p>
            <div style={{ marginTop: 10 }}><Button variant="primary" size="lg">Book a Consultation</Button></div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
