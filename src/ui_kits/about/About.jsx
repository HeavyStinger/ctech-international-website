import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { withBase } from '../../lib/url.js';

export function About() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>About</Eyebrow>
        <ShimmerHeading as="h1" size={56}>One studio, built to grow</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          A web development studio in Belize City, Belize.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <section style={wrap}>
          <SectionTitle title="Our story"
            lead="The owner has been building sites and apps since college. Ctech International became a formal brand a few months ago, built on that same hands-on experience." />
        </section>

        <section style={wrap}>
          <SectionTitle title="The team" />
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <Card padding={26}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>Solo-run studio</div>
              <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Every project is run directly by the owner, plus one graphic designer for design work.
              </p>
            </Card>
          </div>
        </section>

        <section style={wrap}>
          <SectionTitle title="Where we're headed"
            lead="Belize first, then bigger regional and international markets, without leaving our original Belize clients behind. Local-first credibility, building toward international scale." />
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px var(--space-7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Let's build something that wins clients</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes to scope your project.</p>
            <div style={{ marginTop: 10 }}>
              <a href={withBase('/build')} style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">Book a Consultation</Button>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
