import React from 'react';

/* Small HUD viewfinder brackets at each corner — the "not real, still a
   concept" signal, distinct from the browser-chrome (Websites) and photo-pile
   (Flyers) treatments. */
function ReticleCorners() {
  const size = 14;
  const base = { position: 'absolute', width: size, height: size, pointerEvents: 'none' };
  const edge = '2px solid var(--nebula-cyan)';
  return (
    <>
      <div style={{ ...base, top: 6, left: 6, borderTop: edge, borderLeft: edge }} />
      <div style={{ ...base, top: 6, right: 6, borderTop: edge, borderRight: edge }} />
      <div style={{ ...base, bottom: 6, left: 6, borderBottom: edge, borderLeft: edge }} />
      <div style={{ ...base, bottom: 6, right: 6, borderBottom: edge, borderRight: edge }} />
    </>
  );
}

function ConceptCard({ concept, onOpen }) {
  return (
    <div onClick={() => onOpen(concept)} style={{ position: 'relative', width: 240, flexShrink: 0, cursor: 'pointer' }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3', background: 'var(--space-surface)',
        borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--space-border)' }}>
        {concept.image ? (
          <img src={concept.image} alt={concept.name} loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-input)',
            fontSize: 13, color: 'var(--text-secondary)' }}>
            Awaiting artwork
          </div>
        )}
        <ReticleCorners />
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 600 }}>{concept.name}</div>
      {concept.description && (
        <div style={{ marginTop: 2, fontSize: 12.5, color: 'var(--text-secondary)' }}>{concept.description}</div>
      )}
    </div>
  );
}

/* Endless drifting strip of concept cards — pauses on hover and while the
   lightbox (opened via onOpen) is up, per the "read it, don't chase it" rule
   for anything that auto-moves. The track is rendered twice back-to-back so
   translateX(-50%) is a seamless loop. */
export function ConceptMarquee({ items, onOpen, forcePaused = false }) {
  const [hovered, setHovered] = React.useState(false);
  const paused = hovered || forcePaused;
  const track = [...items, ...items];

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ overflow: 'hidden', marginTop: 24,
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <div style={{ display: 'flex', gap: 24, width: 'max-content',
        animation: 'ctech-marquee 34s linear infinite',
        animationPlayState: paused ? 'paused' : 'running' }}>
        {track.map((c, i) => <ConceptCard key={`${c.name}-${i}`} concept={c} onOpen={onOpen} />)}
      </div>
    </div>
  );
}
