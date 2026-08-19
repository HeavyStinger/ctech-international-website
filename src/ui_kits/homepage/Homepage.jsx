import React from 'react';
import { Globe, Palette, Video, Play } from 'lucide-react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { withBase } from '../../lib/url.js';

const TAG_COLORS = {
  live: { border: 'rgba(34,197,94,0.55)', text: '#4ADE80' },
  concept: { border: 'rgba(251,191,36,0.55)', text: '#FBBF24' },
  tapt: { border: 'var(--nebula-cyan-50)', text: 'var(--nebula-cyan)' },
  tesseract: { border: 'rgba(167,139,250,0.55)', text: '#C4B5FD' },
};

function BentoTile({ style, index, badgeIcon: BadgeIcon, tag, children }) {
  const duration = 4 + (index % 4) * 0.7;
  const delay = -(index * 0.6);
  const tagColor = tag && TAG_COLORS[tag.color];
  return (
    <div style={{ ...style, position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden',
      animation: `ctech-float ${duration}s ease-in-out infinite`, animationDelay: `${delay}s` }}>
      {children}
      {(BadgeIcon || tag) && (
        <div style={{ position: 'absolute', top: 8, right: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          {BadgeIcon && (
            <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BadgeIcon size={14} strokeWidth={2} color="rgba(10,14,20,0.85)" />
            </div>
          )}
          {tag && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 10px 4px 10px',
              borderTopLeftRadius: 'var(--radius-control)', borderBottomLeftRadius: 'var(--radius-control)',
              background: 'rgba(6,9,16,0.8)', backdropFilter: 'blur(6px) saturate(1.3)', WebkitBackdropFilter: 'blur(6px) saturate(1.3)',
              border: `1px solid ${tagColor.border}`, borderRight: 'none',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: tagColor.text }}>
              {tag.pulse && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0,
                  animation: 'ctech-pulse-ring 2s ease-out infinite' }} />
              )}
              {tag.label}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BentoImage({ src, alt }) {
  return (
    <img src={src} alt={alt} loading="lazy" decoding="async"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  );
}

function BentoVideoThumb({ src, alt, videoUrl }) {
  return (
    <a href={videoUrl} target="_blank" rel="noopener noreferrer"
      style={{ position: 'relative', display: 'block', width: '100%', height: '100%' }}>
      <BentoImage src={src} alt={alt} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(5,8,15,0.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid var(--nebula-cyan-50)', boxShadow: 'var(--glow-cyan-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={20} color="white" fill="white" style={{ marginLeft: 2 }} />
        </div>
      </div>
    </a>
  );
}

export function Homepage() {
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
        <aside style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', gap: 8 }}>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <BentoTile index={0} style={{ flex: 1 }} badgeIcon={Globe} tag={{ label: 'Live', color: 'live', pulse: true }}>
              <BentoImage src={withBase('/portfolio/websites/superstarcarwash.webp')} alt="Superstar Car Wash website" />
            </BentoTile>
            <BentoTile index={1} style={{ flex: 1 }} badgeIcon={Palette} tag={{ label: 'Concept', color: 'concept' }}>
              <BentoImage src={withBase('/portfolio/concepts/luxuryvillapropertypage.webp')} alt="Luxury Villa Property Page concept" />
            </BentoTile>
            <BentoTile index={2} style={{ flex: 1 }} badgeIcon={Palette} tag={{ label: 'Concept', color: 'concept' }}>
              <BentoImage src={withBase('/portfolio/concepts/luxeglow.webp')} alt="Luxe Glow brand concept" />
            </BentoTile>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <BentoTile index={3} style={{ flex: 1 }} badgeIcon={Video} tag={{ label: 'Tapt', color: 'tapt' }}>
              <BentoVideoThumb src={withBase('/portfolio/products/tapt/tapt-1.webp')} alt="Tapt demo video"
                videoUrl="https://www.youtube.com/shorts/4UGk1fJPvDA" />
            </BentoTile>
            <BentoTile index={4} style={{ flex: 1 }} badgeIcon={Video} tag={{ label: 'Tesseract', color: 'tesseract' }}>
              <BentoVideoThumb src={withBase('/portfolio/products/tesseract/tesseract-1.webp')} alt="Tesseract demo video"
                videoUrl="https://www.youtube.com/shorts/tRzfYxVaCxs" />
            </BentoTile>
          </div>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 44 }}>
            <a href={withBase('/build?plan=starter')} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flex: '1 1 260px' }}>
              <Card interactive padding={28} style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ fontSize: 19, fontWeight: 600 }}>Starter</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 28, fontWeight: 700 }}>99 BZD</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>/month</span>
                  </div>
                </div>
                <Badge variant="cyan" style={{ marginTop: 12 }}>85% off Custom Build</Badge>
              </Card>
            </a>
            <a href={withBase('/build?plan=custom')} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flex: '1 1 260px' }}>
              <Card interactive glow padding={28} style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ fontSize: 19, fontWeight: 600 }}>Custom Build</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>From</span>
                    <span style={{ fontSize: 28, fontWeight: 700 }}>700 BZD</span>
                  </div>
                </div>
              </Card>
            </a>
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
