import React from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { withBase } from '../../lib/url.js';

export function Homepage() {
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
  const services = [
    { title: 'Websites & Web Apps', body: 'Fast, modern sites and custom web applications, designed and engineered from scratch, never from a template.' },
    { title: 'Hosting, Email & Presence', body: 'Managed hosting with 99.9% uptime, email on your own domain, and Google Business Profiles that put you on the map.' },
    { title: 'Design', body: 'Business cards, flyers, banners, billboards, t-shirts. The same brand, on and off the screen.' },
  ];
  const reasons = [
    { title: 'Everything under one roof', body: 'Site, hosting, email, and design from a single studio. One call fixes anything.' },
    { title: '99.9% uptime', body: 'Your site stays up. We watch the infrastructure so you never have to.' },
    { title: 'Custom, never templated', body: 'Every build is designed around your business, not squeezed into a theme.' },
    { title: 'Fast, local support', body: 'Based in Belize City. Real replies within one business day.' },
  ];
  const clients = ['YEC Belize', 'Healing Touch Day Spa', 'Into the Blue Excursions', 'CareBelize', 'Superstar Car Wash'];
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>

      <Header />

      <main data-screen-label="Hero" className="ctech-hero-grid"
        style={{ ...wrap, minHeight: 'calc(100vh - 68px)', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-9)',
        display: 'grid', gap: 72, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28 }}>
          <ShimmerHeading size={72}>Ctech International</ShimmerHeading>
          <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Websites, web apps, and everything around them. Built in Belize, ready for the world.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
            <a href={withBase('/build')} style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="lg">Book a Consultation</Button>
            </a>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)', paddingBottom: 'var(--space-10)' }}>

        <section data-screen-label="Value prop" style={wrap}>
          <SectionTitle title="One studio for your whole online presence"
            lead="We design, build, host, and maintain for shops, tour operators, clinics, and every business in Belize ready to look world-class online." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 44 }}>
            {services.map((s) => (
              <Card key={s.title} interactive padding={26}>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{s.title}</div>
                <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section data-screen-label="Why choose us" style={wrap}>
          <SectionTitle title="Why businesses choose Ctech" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 28, marginTop: 44 }}>
            {reasons.map((r) => (
              <div key={r.title} style={{ borderTop: '1px solid var(--space-border)', paddingTop: 18 }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{r.title}</div>
                <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{r.body}</p>
              </div>
            ))}
          </div>
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
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>or call +501 600-8328</div>
          </div>
        </section>

        <section data-screen-label="Pricing teaser" style={wrap}>
          <SectionTitle title="Two ways to get your site"
            lead="From 99 BZD/month, or 700 BZD one-time. See the full breakdown." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 44 }}>
            <Card padding={28}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 19, fontWeight: 600 }}>Starter</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 28, fontWeight: 700 }}>99 BZD</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>/month</span>
                </div>
              </div>
              <Badge variant="cyan" style={{ marginTop: 12 }}>85% off Custom Build</Badge>
            </Card>
            <Card padding={28} glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 19, fontWeight: 600 }}>Custom Build</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>From</span>
                  <span style={{ fontSize: 28, fontWeight: 700 }}>700 BZD</span>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
            <Button variant="primary" size="md" onClick={() => { window.location.href = withBase('/build'); }}>See Full Pricing</Button>
            <a href={withBase('/products')} style={{ fontSize: 14.5, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Also: Tapt and Tesseract, our own products →
            </a>
          </div>
        </section>

        <section data-screen-label="Trust" style={{ ...wrap, textAlign: 'center' }}>
          <div style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Trusted by businesses across Belize</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 48px', marginTop: 28 }}>
            {clients.map((c) => (
              <span key={c} style={{ fontSize: 19, fontWeight: 600, color: 'var(--text-secondary)', opacity: 0.85 }}>{c}</span>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
