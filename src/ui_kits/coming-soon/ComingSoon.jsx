import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Footer } from '../../components/brand/Footer.jsx';

export function ComingSoon() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString('en-US', { timeZone: 'America/Belize', hour12: false });
  const systems = [
    { name: 'Website Development', status: 'ONLINE' },
    { name: 'Web App Development', status: 'ONLINE' },
    { name: 'Hosting', status: '99.9% UPTIME' },
    { name: 'Custom Domain Email', status: 'ONLINE' },
    { name: 'Design', status: 'ONLINE' },
    { name: 'AI Automation', status: 'IN DEVELOPMENT', dim: true },
  ];
  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <main style={{ flex: 1, width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box',
        padding: '96px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 72, alignItems: 'center' }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28 }}>
          <ShimmerHeading size={72}>Ctech International</ShimmerHeading>
          <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Websites, web apps, and everything around them. Built in Belize, ready for the world.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
            <Button variant="secondary" size="lg">Book a Consultation</Button>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>+501 600-8328 · info@ctechintl.com</div>
        </div>

        <aside style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-card)', padding: 28, display: 'flex', flexDirection: 'column', gap: 18,
          boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nebula-cyan)',
                animation: 'ctech-pulse 2.4s ease-out infinite' }} />
              <span style={{ fontSize: 13, letterSpacing: '0.08em' }}>ALL SYSTEMS OPERATIONAL</span>
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>BELIZE {time}</span>
          </div>
          <div style={{ height: 1, background: 'var(--space-border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {systems.map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12, opacity: s.dim ? 0.55 : 1 }}>
                <span style={{ fontSize: 15 }}>{s.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5,
                  letterSpacing: '0.08em', color: s.dim ? 'var(--text-secondary)' : 'var(--nebula-cyan)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%',
                    background: s.dim ? 'var(--text-secondary)' : 'var(--nebula-cyan)',
                    boxShadow: s.dim ? 'none' : '0 0 8px rgba(0,204,255,0.6)' }} />
                  {s.status}
                </span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'var(--space-border)' }} />
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>We reply within 1 business day.</div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
