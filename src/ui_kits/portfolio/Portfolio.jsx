import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { MockupFrame } from '../../components/brand/MockupFrame.jsx';
import { AlbumStack } from '../../components/brand/AlbumStack.jsx';
import { FlyerLightbox } from '../../components/brand/FlyerLightbox.jsx';

const websites = [
  { name: 'YEC Belize', domain: 'yecbelize.com', image: '/portfolio/websites/yec.webp' },
  { name: 'Healing Touch Day Spa', domain: 'healingtouchdayspa.com', image: '/portfolio/websites/healingtouchdayspa.webp' },
  { name: 'Into the Blue Excursions', domain: 'intotheblueexcursions.bz', image: '/portfolio/websites/intotheblueexcursions.webp' },
  { name: 'Father of the Nation', domain: 'fatherofthenation.blog', image: '/portfolio/websites/fatherofthenation.webp' },
  { name: 'CareBelize', domain: 'carebelize.bz', image: '/portfolio/websites/carebelize.webp' },
  { name: 'Superstar Car Wash', domain: 'heavystinger.github.io/superstar-car-wash-website/', image: '/portfolio/websites/superstarcarwash.webp' },
];

function albumImages(folder, count) {
  return Array.from({ length: count }, (_, i) => `/portfolio/flyers/${folder}/${folder}-${i + 1}.webp`);
}

const flyers = [
  { name: 'Tsunami Adventures', images: albumImages('tsunami-adventures', 6) },
  { name: 'Edmund Kwan · Re-Elect 2026', images: albumImages('edmund-kwan-re-elect-2026', 6) },
];

function WebsiteGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 36 }}>
      {items.map((p) => {
        const card = (
          <Card interactive padding={0} style={{ overflow: 'hidden' }}>
            <MockupFrame domain={p.domain} name={p.name} image={p.image} alt={p.name} />
            <div style={{ padding: '16px 20px', fontSize: 17, fontWeight: 600 }}>{p.name}</div>
          </Card>
        );
        return p.domain ? (
          <a key={p.name} href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            {card}
          </a>
        ) : (
          <div key={p.name}>{card}</div>
        );
      })}
    </div>
  );
}

function FlyerGrid({ items, onOpen }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 260px))', gap: 20, marginTop: 36 }}>
      {items.map((p) => (
        <Card key={p.name} interactive padding={20}
          onClick={p.images.length > 0 ? () => onOpen(p) : undefined}>
          <AlbumStack images={p.images} />
          <div style={{ marginTop: 12, fontSize: 17, fontWeight: 600, textAlign: 'center' }}>{p.name}</div>
        </Card>
      ))}
    </div>
  );
}

export function Portfolio() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 48, paddingRight: 48 };
  const [lightboxFlyer, setLightboxFlyer] = React.useState(null);
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
          <SectionTitle title="Websites" lead="Including web apps." />
          <WebsiteGrid items={websites} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Flyers" />
          <FlyerGrid items={flyers} onOpen={setLightboxFlyer} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Concepts" />
          <div style={{ marginTop: 24, border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-card)',
            padding: 28, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Design concepts are on their way. Check back soon.
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

      <FlyerLightbox open={!!lightboxFlyer} images={lightboxFlyer?.images ?? []}
        name={lightboxFlyer?.name} onClose={() => setLightboxFlyer(null)} />
    </div>
  );
}
