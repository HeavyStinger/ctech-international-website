import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';

const tick = { color: 'var(--nebula-cyan)', flexShrink: 0 };

const addOns = [
  'Extra pages',
  'E-commerce / online store',
  'Online booking & scheduling',
  'Custom copywriting',
  'Logo design',
  'Rush delivery',
];

export function Build() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48 };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 96, paddingBottom: 64,
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Build Your Site</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Two ways to get your site</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          A quick snapshot. The full configurator with a live price estimate is on its way.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 96, paddingBottom: 128 }}>
        <section style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            <Card padding={32}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>Starter</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>SUBSCRIPTION</div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>99 BZD</span>
                <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>/month</span>
              </div>
              <Badge variant="cyan" style={{ marginTop: 10 }}>85% off Custom Build</Badge>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>+ 100 BZD/year domain</div>
              <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Professionally built and maintained for you</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Hosting, updates, and domain handled by Ctech</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Up to 5 pages, home to contact</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Basic on-page SEO included</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Month-to-month, no long-term contract</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Lowest cost to get online</span></div>
              </div>
            </Card>
            <Card padding={32} glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>Custom Build</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--nebula-cyan)' }}>FULL OWNERSHIP</div>
              </div>
              <div style={{ marginTop: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 13, lineHeight: 1, color: 'var(--text-secondary)' }}>From</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>700 BZD</span>
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>one-time</span>
                </div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>+ 500 BZD/year hosting</div>
              <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Designed and engineered from scratch</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>You own the site and the domain outright</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Up to 5 pages included, add more anytime</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>E-commerce, booking, and other add-ons available</span></div>
                <div style={{ display: 'flex', gap: 10 }}><span style={tick}>—</span><span>Grows into web apps and integrations</span></div>
              </div>
            </Card>
          </div>
        </section>

        <section style={wrap}>
          <SectionTitle title="Popular add-ons"
            lead="Available on Custom Build. Priced during your consultation, based on scope." />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
            {addOns.map((a) => (
              <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                fontSize: 14.5, background: 'var(--space-surface)', border: '1px solid var(--space-border)',
                borderRadius: 'var(--radius-input)' }}>{a}</span>
            ))}
          </div>
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Not sure which fits? Let's scope it together.</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes.</p>
            <div style={{ marginTop: 10 }}><Button variant="primary" size="lg">Book a Consultation</Button></div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
