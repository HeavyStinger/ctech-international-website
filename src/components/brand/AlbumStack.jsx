import React from 'react';
import { Badge } from '../core/Badge.jsx';

/* Fanned photo-pile look for multi-image flyer projects. Renders up to 3 layers;
   with no images yet, still fans 3 placeholder panels so the "album" shape reads
   immediately, with the "awaiting artwork" label only on the front panel.
   Sized off its own aspect-ratio (not a fixed px height) so it can never grow
   taller than its box, however wide the grid track ends up being. */
export function AlbumStack({ images = [] }) {
  const shown = Math.min(images.length > 0 ? images.length : 3, 3);
  const extra = images.length > 3 ? images.length - 3 : 0;
  const layers = Array.from({ length: shown }, (_, i) => images[i] || null);
  const mid = (shown - 1) / 2;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 220, margin: '0 auto', aspectRatio: '3 / 4' }}>
      {layers.map((img, i) => {
        const rotate = (i - mid) * 7;
        const dx = (i - mid) * 10;
        const isFront = i === shown - 1;
        return (
          <div key={i} style={{ position: 'absolute', top: '8%', left: '8%', right: '8%', bottom: '8%',
            transform: `translateX(${dx}%) rotate(${rotate}deg)`,
            zIndex: i, borderRadius: 'var(--radius-card)',
            border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-highlight)',
            background: 'var(--space-surface)',
            backgroundImage: img ? `url(${img})` : undefined,
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!img && isFront && (
              <span style={{ fontSize: 12.5, textAlign: 'center', color: 'var(--text-secondary)',
                border: '1px dashed var(--space-border)', borderRadius: 'var(--radius-input)',
                padding: '5px 10px' }}>Awaiting artwork</span>
            )}
          </div>
        );
      })}
      {extra > 0 && (
        <Badge variant="neutral" style={{ position: 'absolute', bottom: '4%', right: '4%', zIndex: shown + 1 }}>+{extra}</Badge>
      )}
    </div>
  );
}
