import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';

const projects = [
  { name: 'YEC Belize', type: 'Website', domain: 'yecbelize.com' },
  { name: 'Healing Touch Day Spa', type: 'Website', domain: 'healingtouchdayspa.com' },
  { name: 'Into the Blue Excursions', type: 'Website', domain: 'intotheblueexcursions.bz' },
  { name: 'Father of the Nation', type: 'Website', domain: 'fatherofthenation.blog' },
  { name: 'CareBelize', type: 'Website' },
  { name: 'Superstar Car Wash', type: 'Website' },
  { name: 'Tsunami Adventures', type: 'Flyer Design' },
];

export function Portfolio() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48 };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 96, paddingBottom: 64,
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Portfolio</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Past client work</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          A look at what we've built for businesses across Belize.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 96, paddingBottom: 128 }}>
        <section style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {projects.map((p) => (
              <Card key={p.name} interactive padding={26}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontSize: 19, fontWeight: 600 }}>{p.name}</div>
                  <span style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--nebula-cyan)' }}>{p.type.toUpperCase()}</span>
                </div>
                {p.domain && (
                  <a href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', marginTop: 10, fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {p.domain}
                  </a>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Want to be featured here next?</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes to scope your project.</p>
            <div style={{ marginTop: 10 }}><Button variant="primary" size="lg">Book a Consultation</Button></div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
