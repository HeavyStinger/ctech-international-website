import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/* Plain, non-glass control button (no backdrop-blur) — used only for the
   lightbox's close/prev/next controls, per brand direction: not everything
   needs the glass treatment, just the main surfaces. */
function ControlButton({ label, onClick, style, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button aria-label={label} title={label} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-control)', cursor: 'pointer',
        border: '1px solid ' + (hover ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        background: hover ? 'var(--space-surface-hover)' : 'var(--space-surface)',
        color: 'var(--text-primary)', transition: 'all 200ms var(--ease-hud)', ...style }}>
      {children}
    </button>
  );
}

/* Full-screen image viewer, used for both flyer albums (multiple images,
   manual carousel — arrow buttons, dots, swipe/drag, or left/right keys, no
   auto-advance) and single-image concepts (nav controls simply don't render
   when there's only one image, so this is just an expand-to-view lightbox).
   On open, a few preview panels fan out from the stacked "album" look (or, for
   a single image, just scale up) and settle into place, instead of the dialog
   just popping in static. */
export function ImageLightbox({ open, images = [], name, aspectRatio = '3 / 4', onClose }) {
  const [index, setIndex] = React.useState(0);
  const [entered, setEntered] = React.useState(false);
  const dragStartX = React.useRef(null);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    setIndex(0);
    setEntered(false);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [open, images]);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (!open) return null;

  const count = images.length;
  const multi = count > 1;
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  function handleDragStart(x) {
    dragStartX.current = x;
  }
  function handleDragEnd(x) {
    if (!multi || typeof dragStartX.current !== 'number') return;
    const delta = x - dragStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    dragStartX.current = null;
  }

  const fanCount = Math.min(count, 3);
  const fanMid = (fanCount - 1) / 2;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200,
      background: 'var(--scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      opacity: entered ? 1 : 0, transition: 'opacity 300ms var(--ease-hud)' }}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 720, display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: 16 }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{name}</div>
          <ControlButton label="Close" onClick={onClose}>
            <X size={18} strokeWidth={1.75} />
          </ControlButton>
        </div>

        <div
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            userSelect: 'none', touchAction: 'pan-y' }}>

          {/* fan-out intro: mirrors AlbumStack's stacked look, then spreads and fades as the viewer settles in */}
          {Array.from({ length: fanCount }).map((_, i) => {
            const stackedRotate = (i - fanMid) * 7;
            const stackedX = (i - fanMid) * 10;
            const spreadRotate = (i - fanMid) * 22;
            const spreadX = (i - fanMid) * 90;
            return (
              <div key={i} aria-hidden="true" style={{ position: 'absolute', width: '55%', maxWidth: 320, aspectRatio,
                backgroundImage: `url(${images[i]})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', background: entered ? undefined : 'var(--space-surface)',
                borderRadius: 'var(--radius-card)', border: '1px solid var(--space-border)',
                zIndex: 2, pointerEvents: 'none',
                opacity: entered ? 0 : 1,
                transform: entered
                  ? `translateX(${spreadX}px) rotate(${spreadRotate}deg) scale(1.05)`
                  : `translateX(${stackedX}px) rotate(${stackedRotate}deg) scale(1)`,
                transition: `transform 420ms var(--ease-hud) ${i * 30}ms, opacity 420ms var(--ease-hud) ${i * 30}ms` }} />
            );
          })}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
            opacity: entered ? 1 : 0, transform: entered ? 'scale(1)' : 'scale(0.94)',
            transition: 'opacity 350ms var(--ease-hud) 150ms, transform 350ms var(--ease-hud) 150ms' }}>
            {multi && (
              <ControlButton label="Previous" onClick={prev} style={{ position: 'absolute', left: 8, zIndex: 1 }}>
                <ChevronLeft size={20} strokeWidth={1.75} />
              </ControlButton>
            )}

            <img src={images[index]} alt={multi ? `${name} ${index + 1} of ${count}` : name} draggable={false}
              style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: 'var(--radius-card)',
                border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-highlight)', display: 'block' }} />

            {multi && (
              <ControlButton label="Next" onClick={next} style={{ position: 'absolute', right: 8, zIndex: 1 }}>
                <ChevronRight size={20} strokeWidth={1.75} />
              </ControlButton>
            )}
          </div>
        </div>

        {multi && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {images.map((_, i) => (
              <button key={i} aria-label={`Go to image ${i + 1}`} onClick={() => setIndex(i)}
                style={{ width: 7, height: 7, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                  background: i === index ? 'var(--nebula-cyan)' : 'var(--space-border)',
                  boxShadow: i === index ? '0 0 8px rgba(0,204,255,0.6)' : 'none',
                  transition: 'all 200ms var(--ease-hud)' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
