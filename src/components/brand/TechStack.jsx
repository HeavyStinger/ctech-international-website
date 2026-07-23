import React from 'react';
import { siAstro, siHtml5, siJavascript, siPhp, siLaravel, siReact, siMysql, siPostgresql, siGit } from 'simple-icons/icons';
import css3Raw from 'devicon/icons/css3/css3-original.svg?raw';

// devicon's badge has no explicit size, so it renders at the SVG default (300x150) unless told to fill its box
const css3Svg = css3Raw.replace('<svg ', '<svg width="100%" height="100%" ');
const CSS3_HEX = '1572B6'; // official W3C CSS3 badge blue, used for the hover accent to match

function hexToRgb(hex) {
  return `${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}`;
}

function TechIcon({ icon, size = 30, color }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color || `#${icon.hex}`} xmlns="http://www.w3.org/2000/svg">
      <path d={icon.path} />
    </svg>
  );
}

/* Native <dialog> + its own showModal()/close() API, styled to match the
   design system. Escape and backdrop-click both close it via the dialog's
   built-in behavior; we just mirror the open/closed state into React. */
function TechDialog({ item, onClose }) {
  const ref = React.useRef(null);
  const [entered, setEntered] = React.useState(false);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item) {
      if (!dialog.open) dialog.showModal();
      setEntered(false);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => setEntered(true));
      });
      return () => cancelAnimationFrame(rafRef.current);
    }
    if (dialog.open) dialog.close();
  }, [item]);

  const accent = item ? (item.hex ? `#${item.hex}` : 'var(--nebula-cyan)') : null;

  return (
    <dialog ref={ref} className="ctech-dialog" onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      {item && (
        <div style={{ width: 320, maxWidth: '85vw', background: 'var(--space-surface)',
          border: '1px solid var(--space-border)', borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glass-highlight)', padding: 24,
          opacity: entered ? 1 : 0, transform: entered ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 220ms var(--ease-hud), transform 220ms var(--ease-hud)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text-secondary)' }}>{item.category}</span>
            <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
          </div>
          <div style={{ marginTop: 8, fontSize: 20, fontWeight: 600, color: accent }}>{item.name}</div>
          <p style={{ marginTop: 10, marginBottom: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {item.description}
          </p>
        </div>
      )}
    </dialog>
  );
}

const cardStyle = {
  position: 'relative', background: 'var(--space-surface)', cursor: 'pointer',
  borderRadius: 'var(--radius-card)', paddingTop: 40, paddingBottom: 22, paddingLeft: 16, paddingRight: 16,
  minHeight: 134, boxSizing: 'border-box',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, textAlign: 'center',
};

function StackCard({ icon, customSvg, hex, name, spin, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const rgb = hexToRgb(hex);
  const accent = `#${hex}`;
  return (
    <div style={{ ...cardStyle, border: '1px solid ' + (hover ? `rgba(${rgb}, 0.6)` : 'var(--space-border)'),
      transition: 'border-color 200ms var(--ease-hud)' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onOpen}>
      <div style={spin ? { width: 30, height: 30, animation: 'ctech-spin 4.375s linear infinite' } : { width: 30, height: 30 }}>
        {customSvg ? <div style={{ width: 30, height: 30 }} dangerouslySetInnerHTML={{ __html: customSvg }} /> : <TechIcon icon={icon} />}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600,
        color: hover ? accent : 'var(--text-secondary)',
        textShadow: hover ? `0 0 14px rgba(${rgb}, 0.5)` : 'none',
        transition: 'all 200ms var(--ease-hud)' }}>{name}</div>
    </div>
  );
}

/* Astro gets the signature treatment: a flickering thruster flame under the
   logomark, and the whole icon carries a small, contained idle-engine shake —
   this is the framework the site itself is built with. */
function AstroStackCard({ onOpen }) {
  return (
    <div style={{ ...cardStyle, border: '1px solid var(--nebula-cyan-30)', boxShadow: 'var(--glow-cyan-soft)' }} onClick={onOpen}>
      <div style={{ position: 'absolute', top: 8, right: 10, fontSize: 9.5, fontWeight: 600, letterSpacing: '0.03em',
        color: 'var(--nebula-cyan)', textAlign: 'center', lineHeight: 1.2,
        background: 'var(--nebula-cyan-10)', border: '1px solid var(--nebula-cyan-30)',
        borderRadius: 'var(--radius-control)', padding: '3px 8px' }}>
        This website
      </div>
      <div style={{ position: 'relative', width: 30, height: 42, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', bottom: -2, left: '50%', width: 10, height: 16, marginLeft: -5,
          borderRadius: '50% 50% 60% 60%',
          background: 'radial-gradient(circle at 50% 15%, #FFF3C4 0%, #FFB454 35%, #FF6A1A 65%, rgba(255,90,20,0) 80%)',
          filter: 'blur(1.5px)', transformOrigin: 'top center',
          animation: 'ctech-astro-flame 420ms ease-in-out infinite' }} />
        <div style={{ position: 'relative', animation: 'ctech-astro-shake 260ms linear infinite' }}>
          <TechIcon icon={siAstro} size={30} color="var(--nebula-cyan)" />
        </div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--nebula-cyan)' }}>Astro</div>
    </div>
  );
}

const astroItem = {
  name: 'Astro', category: 'Framework', hex: null,
  description: "The framework this website is built with. Combines fast, mostly static output with interactivity only where it's needed.",
};

const stack = [
  // frameworks
  { icon: siLaravel, hex: siLaravel.hex, name: 'Laravel', category: 'Framework',
    description: 'A PHP framework for building secure, full-featured backend applications and APIs.' },
  { icon: siReact, hex: siReact.hex, name: 'React', category: 'Framework', spin: true,
    description: 'A JavaScript library for building fast, interactive user interfaces out of reusable components.' },
  // languages
  { icon: siPhp, hex: siPhp.hex, name: 'PHP', category: 'Language',
    description: 'A server-side scripting language for building dynamic websites and web applications.' },
  { icon: siHtml5, hex: siHtml5.hex, name: 'HTML', category: 'Language',
    description: 'The markup language that structures every page on the web.' },
  { customSvg: css3Svg, hex: CSS3_HEX, name: 'CSS', category: 'Language',
    description: 'The styling language that controls layout, color, and visual design.' },
  { icon: siJavascript, hex: siJavascript.hex, name: 'JavaScript', category: 'Language',
    description: 'The programming language that powers interactivity in the browser.' },
  // databases
  { icon: siMysql, hex: siMysql.hex, name: 'MySQL', category: 'Database',
    description: 'A relational database used to store and organize structured data.' },
  { icon: siPostgresql, hex: siPostgresql.hex, name: 'PostgreSQL', category: 'Database',
    description: 'A relational database known for reliability and advanced features.' },
  // tools
  { icon: siGit, hex: siGit.hex, name: 'Git', category: 'Tool',
    description: 'A version control system for tracking changes and collaborating on code.' },
];

export function TechStack() {
  const [selected, setSelected] = React.useState(null);
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
        <AstroStackCard onOpen={() => setSelected(astroItem)} />
        {stack.map((t) => (
          <StackCard key={t.name} icon={t.icon} customSvg={t.customSvg} hex={t.hex} name={t.name} spin={t.spin}
            onOpen={() => setSelected(t)} />
        ))}
      </div>
      <TechDialog item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
