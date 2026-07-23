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
import { ConceptMarquee } from '../../components/brand/ConceptMarquee.jsx';
import { ImageLightbox } from '../../components/brand/ImageLightbox.jsx';
import { withBase } from '../../lib/url.js';

const websites = [
  { name: 'YEC Belize', domain: 'yecbelize.com', image: withBase('/portfolio/websites/yec.webp'), description: 'Civil & structural engineering firm' },
  { name: 'Healing Touch Day Spa', domain: 'healingtouchdayspa.com', image: withBase('/portfolio/websites/healingtouchdayspa.webp'), description: 'Massage & wellness spa in Caye Caulker' },
  { name: 'Into the Blue Excursions', domain: 'intotheblueexcursions.bz', image: withBase('/portfolio/websites/intotheblueexcursions.webp'), description: 'Scenic flights, snorkeling & diving tours' },
  { name: 'Father of the Nation', domain: 'fatherofthenation.blog', image: withBase('/portfolio/websites/fatherofthenation.webp'), description: "Tribute site for Belize's founding father" },
  { name: 'CareBelize', domain: 'carebelize.bz', image: withBase('/portfolio/websites/carebelize.webp'), description: 'On-demand telemedicine for visitors across Belize' },
  { name: 'Superstar Car Wash', domain: 'heavystinger.github.io/superstar-car-wash-website/', image: withBase('/portfolio/websites/superstarcarwash.webp'), description: 'Car wash service website' },
];

function albumImages(folder, count) {
  return Array.from({ length: count }, (_, i) => withBase(`/portfolio/flyers/${folder}/${folder}-${i + 1}.webp`));
}

const flyers = [
  { name: 'Island Prestige Barber Shop', images: albumImages('island-prestige-barber-shop', 1), aspectRatio: '742 / 960',
    description: 'Grand opening flyer' },
  { name: 'Tsunami Adventures', images: albumImages('tsunami-adventures', 6), aspectRatio: '742 / 960',
    description: 'Bird watching, croc cruise, snorkeling & more' },
  { name: 'Edmund Kwan · Re-Elect 2026', images: albumImages('edmund-kwan-re-elect-2026', 6), aspectRatio: '747 / 960',
    description: '2026 re-election campaign flyers' },
];

const businessCards = [
  { name: 'CR Construction',
    images: [withBase('/portfolio/business-cards/cr-construction/cr-construction-1.webp'), withBase('/portfolio/business-cards/cr-construction/cr-construction-2.webp')],
    aspectRatio: '960 / 549' },
  { name: 'United Technical Service',
    images: [withBase('/portfolio/business-cards/unitedtechnicalservice/unitedtechnicalservice-1.webp'), withBase('/portfolio/business-cards/unitedtechnicalservice/unitedtechnicalservice-2.webp')],
    aspectRatio: '960 / 549' },
];

const concepts = [
  { name: 'Boracho Bling', image: withBase('/portfolio/concepts/borachobling.webp'), description: 'Custom jewelry & accessories brand concept' },
  { name: 'Carib Clouds', image: withBase('/portfolio/concepts/caribclouds.webp'), description: 'Caribbean-inspired vape shop concept' },
  { name: 'Darkwater BJJ', image: withBase('/portfolio/concepts/darkwaterbjj.webp'), description: 'Jiu-jitsu gym concept' },
  { name: 'Dive Shop', image: withBase('/portfolio/concepts/diveshop.webp'), description: 'Scuba dive shop concept' },
  { name: 'Heavy Steel', image: withBase('/portfolio/concepts/heavysteel.webp'), description: 'Metal fabrication & steelwork concept' },
  { name: 'Luxe Glow', image: withBase('/portfolio/concepts/luxeglow.webp'), description: 'Beauty & skincare brand concept' },
  { name: 'Luxury Villa Property Page', image: withBase('/portfolio/concepts/luxuryvillapropertypage.webp'), description: 'Villa rental listing concept' },
  { name: 'TGK Cars', image: withBase('/portfolio/concepts/tgkcars.webp'), description: 'Auto dealership concept' },
];

function WebsiteGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 36 }}>
      {items.map((p) => {
        const card = (
          <Card interactive padding={0} style={{ overflow: 'hidden' }}>
            <MockupFrame domain={p.domain} name={p.name} image={p.image} alt={p.name} />
            <div style={{ padding: '16px 20px 18px' }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{p.name}</div>
              {p.description && (
                <div style={{ marginTop: 4, fontSize: 13, color: 'var(--text-secondary)' }}>{p.description}</div>
              )}
            </div>
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
          <AlbumStack images={p.images} aspectRatio={p.aspectRatio} />
          <div style={{ marginTop: 12, fontSize: 17, fontWeight: 600, textAlign: 'center' }}>{p.name}</div>
          {p.description && (
            <div style={{ marginTop: 4, fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>{p.description}</div>
          )}
        </Card>
      ))}
    </div>
  );
}

function BusinessCardGrid({ items, onOpen }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, marginTop: 36 }}>
      {items.map((p) => (
        <Card key={p.name} interactive padding={20} onClick={() => onOpen(p)}>
          <div style={{ display: 'flex', gap: 10 }}>
            {p.images.map((src, i) => (
              <div key={src} style={{ flex: 1, aspectRatio: p.aspectRatio, borderRadius: 'var(--radius-control)',
                overflow: 'hidden', border: '1px solid var(--space-border)' }}>
                <img src={src} alt={`${p.name} ${i === 0 ? 'front' : 'back'}`} loading="lazy" decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 17, fontWeight: 600, textAlign: 'center' }}>{p.name}</div>
        </Card>
      ))}
    </div>
  );
}

export function Portfolio() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  const [lightboxFlyer, setLightboxFlyer] = React.useState(null);
  const [lightboxCard, setLightboxCard] = React.useState(null);
  const [lightboxConcept, setLightboxConcept] = React.useState(null);
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Portfolio</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Past client work</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          A look at what we've built for businesses across Belize.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <section style={wrap}>
          <SectionTitle title="Websites" lead="Including web apps." />
          <WebsiteGrid items={websites} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Flyers" />
          <FlyerGrid items={flyers} onOpen={setLightboxFlyer} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Business Cards" />
          <BusinessCardGrid items={businessCards} onOpen={setLightboxCard} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Concepts" lead="Speculative work, not shipped yet." />
          {concepts.length > 0 ? (
            <ConceptMarquee items={concepts} onOpen={setLightboxConcept} forcePaused={!!lightboxConcept} />
          ) : (
            <div style={{ marginTop: 24, border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-card)',
              padding: 28, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Design concepts are on their way. Check back soon.
            </div>
          )}
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px var(--space-7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Want to be featured here next?</h2>
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

      <ImageLightbox open={!!lightboxFlyer} images={lightboxFlyer?.images ?? []}
        name={lightboxFlyer?.name} aspectRatio={lightboxFlyer?.aspectRatio} onClose={() => setLightboxFlyer(null)} />

      <ImageLightbox open={!!lightboxCard} images={lightboxCard?.images ?? []}
        name={lightboxCard?.name} aspectRatio={lightboxCard?.aspectRatio} onClose={() => setLightboxCard(null)} />

      <ImageLightbox open={!!lightboxConcept} images={lightboxConcept ? [lightboxConcept.image] : []}
        name={lightboxConcept?.name} aspectRatio="4 / 3" onClose={() => setLightboxConcept(null)} />
    </div>
  );
}
