import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';

const groups = [
  {
    title: 'Development',
    items: [
      { name: 'Website Development', note: 'Marketing sites, landing pages, and everything in between.' },
      { name: 'Web App Development', note: 'Custom web applications built around your workflow.' },
      { name: 'Custom Services', note: 'Bespoke builds for needs a template can’t cover.' },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      { name: 'Hosting', note: 'Managed hosting, 99.9% uptime.' },
      { name: 'Custom Domain Email', note: 'Professional email on your own domain.' },
    ],
  },
  {
    title: 'Local Presence',
    items: [
      { name: 'Google Business Profiles', note: 'Setup and optimization to help you show up locally.' },
    ],
  },
  {
    title: 'Design',
    items: [
      { name: 'Business Cards', note: 'Special business card design.' },
      { name: 'Flyers', note: 'Flyer design for promotions and events.' },
      { name: 'Posters', note: 'Poster design for print or display.' },
      { name: 'Banners', note: 'Banner design for storefronts and events.' },
      { name: 'Billboards', note: 'Billboard design for wider reach.' },
      { name: 'T-Shirts', note: 'T-shirt design. The same brand, on and off the screen.' },
    ],
  },
];

export function Services() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48 };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 96, paddingBottom: 64,
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Services &amp; Tech</Eyebrow>
        <ShimmerHeading as="h1" size={56}>What we build</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Everything a business needs to look and run world-class online, from one studio in Belize City.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 96, paddingBottom: 128 }}>
        {groups.map((g) => (
          <section key={g.title} style={wrap}>
            <SectionTitle title={g.title} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 36 }}>
              {g.items.map((item) => (
                <Card key={item.name} padding={24}>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{item.name}</div>
                  <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{item.note}</p>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <section style={wrap}>
          <SectionTitle title="Emerging" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 36 }}>
            <Card padding={24} style={{ opacity: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>AI Automation</div>
                <span style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>COMING SOON</span>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>Not launched yet.</p>
            </Card>
          </div>
        </section>

        <section style={wrap}>
          <SectionTitle title="Frameworks & Stack" />
          <div style={{ marginTop: 24, border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-card)',
            padding: 28, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            This section is a placeholder. Once the specific frameworks and tools used for client
            work are confirmed, they'll be listed here.
          </div>
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Not sure what you need? Let's talk it through.</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes to scope your project.</p>
            <div style={{ marginTop: 10 }}><Button variant="primary" size="lg">Book a Consultation</Button></div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
