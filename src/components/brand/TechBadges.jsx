import React from 'react';
import { siHtml5, siJavascript, siPhp, siLaravel, siWordpress } from 'simple-icons/icons';
import css3Raw from 'devicon/icons/css3/css3-original.svg?raw';

const css3Svg = css3Raw.replace('<svg ', '<svg width="100%" height="100%" ');

// small stack-technology badges overlaid on portfolio images — reuses the same
// simple-icons/devicon source as TechStack.jsx so the marks stay consistent site-wide
export const TECH = {
  html: { icon: siHtml5, hex: siHtml5.hex, label: 'HTML' },
  css: { customSvg: css3Svg, hex: '1572B6', label: 'CSS' },
  js: { icon: siJavascript, hex: siJavascript.hex, label: 'JavaScript' },
  php: { icon: siPhp, hex: siPhp.hex, label: 'PHP' },
  laravel: { icon: siLaravel, hex: siLaravel.hex, label: 'Laravel' },
  wordpress: { icon: siWordpress, hex: siWordpress.hex, label: 'WordPress' },
};

function TechBadge({ tech }) {
  const t = TECH[tech];
  if (!t) return null;
  return (
    <div title={t.label} role="img" aria-label={t.label} style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(255,255,255,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {t.customSvg
        ? <div aria-hidden="true" style={{ width: 14, height: 14 }} dangerouslySetInnerHTML={{ __html: t.customSvg }} />
        : <svg aria-hidden="true" viewBox="0 0 24 24" width={14} height={14} fill={`#${t.hex}`} xmlns="http://www.w3.org/2000/svg"><path d={t.icon.path} /></svg>}
    </div>
  );
}

/* Parent must be position:relative. Sits over the top-left corner of a portfolio
   image, e.g. inside MockupFrame's screenshot area or a ConceptCard's image.
   `offset` moves it inward, e.g. to clear ConceptCard's reticle-corner bracket. */
export function TechBadgeRow({ techs, offset = 8 }) {
  if (!techs || techs.length === 0) return null;
  return (
    <div style={{ position: 'absolute', top: offset, left: offset, zIndex: 2, display: 'flex', gap: 6 }}>
      {techs.map((t) => <TechBadge key={t} tech={t} />)}
    </div>
  );
}
