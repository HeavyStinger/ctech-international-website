import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { AlbumStack } from '../../components/brand/AlbumStack.jsx';
import { ConceptMarquee } from '../../components/brand/ConceptMarquee.jsx';
import { ImageLightbox } from '../../components/brand/ImageLightbox.jsx';
import { Dialog } from '../../components/feedback/Dialog.jsx';
import { withBase } from '../../lib/url.js';

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

const CONCEPT_TECH = ['html', 'css'];

const concepts = [
  { name: 'Boracho Bling', image: withBase('/portfolio/concepts/borachobling.webp'), description: 'Custom jewelry & accessories brand concept', tech: CONCEPT_TECH },
  { name: 'Carib Clouds', image: withBase('/portfolio/concepts/caribclouds.webp'), description: 'Caribbean-inspired vape shop concept', tech: CONCEPT_TECH },
  { name: 'Darkwater BJJ', image: withBase('/portfolio/concepts/darkwaterbjj.webp'), description: 'Jiu-jitsu gym concept', tech: CONCEPT_TECH },
  { name: 'Dive Shop', image: withBase('/portfolio/concepts/diveshop.webp'), description: 'Scuba dive shop concept', tech: CONCEPT_TECH },
  { name: 'Heavy Steel', image: withBase('/portfolio/concepts/heavysteel.webp'), description: 'Metal fabrication & steelwork concept', tech: CONCEPT_TECH },
  { name: 'Luxe Glow', image: withBase('/portfolio/concepts/luxeglow.webp'), description: 'Beauty & skincare brand concept', tech: CONCEPT_TECH },
  { name: 'Luxury Villa Property Page', image: withBase('/portfolio/concepts/luxuryvillapropertypage.webp'), description: 'Villa rental listing concept', tech: CONCEPT_TECH },
  { name: 'TGK Cars', image: withBase('/portfolio/concepts/tgkcars.webp'), description: 'Auto dealership concept', tech: CONCEPT_TECH },
];

const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };

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

// Picking a concept only needs the image to help them choose — the image
// itself never leaves the browser. Selecting one just carries the concept's
// name as plain text into the contact form's message, which is what actually
// reaches us.
function ClaimDesignPicker({ open, onClose, concepts, onSelect }) {
  return (
    <Dialog open={open} onClose={onClose} title="Choose a design to claim" width={640}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
        {concepts.map((c) => (
          <button key={c.name} type="button" onClick={() => onSelect(c)}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 10, cursor: 'pointer',
              background: 'var(--space-surface)', border: '1px solid var(--space-border)',
              borderRadius: 'var(--radius-card)', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
            <div style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-input)', overflow: 'hidden',
              background: 'var(--space-surface-hover)' }}>
              <img src={c.image} alt="" loading="lazy" decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}

export function PortfolioInteractive() {
  const [lightboxFlyer, setLightboxFlyer] = React.useState(null);
  const [lightboxCard, setLightboxCard] = React.useState(null);
  const [lightboxConcept, setLightboxConcept] = React.useState(null);
  const [claimPickerOpen, setClaimPickerOpen] = React.useState(false);

  function claimDesign(concept) {
    window.location.href = `${withBase('/contact')}?service=design-concept&design=${encodeURIComponent(concept.name)}#form`;
  }

  // This section (and its id="concepts" anchor target) only exists once this
  // island mounts, so a visitor arriving via /portfolio#concepts (e.g. the
  // homepage's Luxe Glow bento tile) needs a manual scroll once it's up —
  // native browser scroll-to-hash can't reach an element that isn't there
  // yet at initial paint. The Concepts section also sits below three
  // image-heavy grids with no reserved image dimensions, so its position
  // keeps shifting as those images load in; a ResizeObserver re-runs the
  // scroll for a few seconds so it settles wherever the content ends up.
  React.useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);

    function scrollToTarget() {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    scrollToTarget();
    const ro = new ResizeObserver(scrollToTarget);
    ro.observe(document.body);
    const stopTimer = setTimeout(() => ro.disconnect(), 2500);

    return () => { ro.disconnect(); clearTimeout(stopTimer); };
  }, []);

  return (
    <>
      <section style={wrap}>
        <SectionTitle title="Flyers" />
        <FlyerGrid items={flyers} onOpen={setLightboxFlyer} />
      </section>

      <section style={wrap}>
        <SectionTitle title="Business Cards" />
        <BusinessCardGrid items={businessCards} onOpen={setLightboxCard} />
      </section>

      <section id="concepts" style={{ ...wrap, scrollMarginTop: 88 }}>
        <SectionTitle title="Concepts" lead="Speculative work, not shipped yet." />
        {concepts.length > 0 ? (
          <>
            <ConceptMarquee items={concepts} onOpen={setLightboxConcept} forcePaused={!!lightboxConcept} />
            <div style={{ marginTop: 28, textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 15.5, color: 'var(--text-secondary)' }}>
                Like one of these designs? Claim or modify and make it yours today!
              </p>
              <div style={{ marginTop: 14, display: 'inline-block' }}>
                <Button variant="secondary" size="sm" onClick={() => setClaimPickerOpen(true)}>Claim a Design</Button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 24, border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-card)',
            padding: 28, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Design concepts are on their way. Check back soon.
          </div>
        )}
      </section>

      <ImageLightbox open={!!lightboxFlyer} images={lightboxFlyer?.images ?? []}
        name={lightboxFlyer?.name} aspectRatio={lightboxFlyer?.aspectRatio} onClose={() => setLightboxFlyer(null)} />

      <ImageLightbox open={!!lightboxCard} images={lightboxCard?.images ?? []}
        name={lightboxCard?.name} aspectRatio={lightboxCard?.aspectRatio} onClose={() => setLightboxCard(null)} />

      <ImageLightbox open={!!lightboxConcept} images={lightboxConcept ? [lightboxConcept.image] : []}
        name={lightboxConcept?.name} aspectRatio="4 / 3" onClose={() => setLightboxConcept(null)} />

      <ClaimDesignPicker open={claimPickerOpen} onClose={() => setClaimPickerOpen(false)}
        concepts={concepts} onSelect={claimDesign} />
    </>
  );
}
