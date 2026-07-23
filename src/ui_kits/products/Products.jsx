import React from 'react';
import { CreditCard, Link2, Share2, Zap, RefreshCw, BarChart3, Check, ArrowDown } from 'lucide-react';
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { ImageLightbox } from '../../components/brand/ImageLightbox.jsx';
import { withBase } from '../../lib/url.js';

const hubItems = ['Save Contact', 'Google Reviews', 'Digital Menu', 'Socials', 'Booking'];

const taptFeatures = [
  'Business cards for an instant digital introduction',
  'Google review cards that turn a tap into a review',
  'Menu cards, built on a menu engine you can edit yourself, no reprint needed',
  'WiFi connection cards for instant guest access',
  'Custom cards available for anything else you need',
  'Point the card anywhere, anytime, no reprogramming needed',
  'Tap analytics included',
];

const tesseractFeatures = [
  'One link for everything you share',
  'One-tap Save Contact button built in',
  'A premium alternative to Linktree, more capable, priced lower',
  'Works standalone, or as the default landing page for a Tapt business card',
];

function FlowChip({ icon: Icon, label, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 26px',
      border: '1px solid var(--space-border)', borderRadius: 'var(--radius-card)',
      background: 'var(--glass-tint)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-control)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        background: 'var(--nebula-cyan-10)', border: '1px solid var(--nebula-cyan-30)' }}>
        <Icon size={22} strokeWidth={1.75} color="var(--nebula-cyan)" />
      </div>
      <div>
        <div style={{ fontSize: 19, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 14.5, color: 'var(--text-secondary)' }}>{sub}</div>}
      </div>
    </div>
  );
}

function ConvergeFlow() {
  return (
    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 20, width: '100%' }}>
        <FlowChip icon={CreditCard} label="Tap the card" sub="Tapt" />
        <span style={{ fontSize: 16, color: 'var(--text-secondary)', fontWeight: 600 }}>or</span>
        <FlowChip icon={Share2} label="Share the link" sub="Tesseract" />
      </div>

      <ArrowDown size={22} strokeWidth={1.75} color="var(--text-secondary)" style={{ margin: '6px 0' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
        padding: '32px 44px', borderRadius: 'var(--radius-card)',
        border: '1px solid var(--nebula-cyan-30)', boxShadow: 'var(--glow-cyan-soft)',
        background: 'var(--glass-bg)', maxWidth: 640, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Zap size={24} strokeWidth={1.75} color="var(--nebula-cyan)" />
          <span style={{ fontSize: 21, fontWeight: 600 }}>Your hub</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {hubItems.map((item) => (
            <Badge key={item} variant="neutral" style={{ fontSize: 14, padding: '6px 14px' }}>{item}</Badge>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, maxWidth: 820 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 400 }}>
          <RefreshCw size={20} strokeWidth={1.75} color="var(--nebula-cyan)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Point the card anywhere, anytime. Change its destination from the Tapt dashboard, no new hardware needed.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 340 }}>
          <BarChart3 size={20} strokeWidth={1.75} color="var(--nebula-cyan)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Every tap is tracked, so you can see how it's actually being used.
          </span>
        </div>
      </div>
    </div>
  );
}

function PhotoPanel({ images, aspectRatio, name, onOpen }) {
  if (images.length === 0) {
    return (
      <div style={{ aspectRatio, borderRadius: 'var(--radius-card)', border: '1px dashed var(--space-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text-secondary)' }}>
        Awaiting artwork
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: images.length > 1 ? '1fr 1fr' : '1fr', gap: 10 }}>
      {images.map((src, i) => (
        <div key={src} onClick={() => onOpen(i)} style={{ aspectRatio, borderRadius: 'var(--radius-card)',
          overflow: 'hidden', border: '1px solid var(--space-border)', cursor: 'pointer' }}>
          <img src={src} alt={`${name} ${i + 1}`} loading="lazy" decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  );
}

function ProductSection({ icon: Icon, eyebrow, name, tagline, features, photos, photoAspectRatio, onOpenPhoto, media }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginTop: 36 }}>
      <Card padding={32}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-control)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: 'var(--nebula-cyan-10)', border: '1px solid var(--nebula-cyan-30)' }}>
            <Icon size={22} strokeWidth={1.75} color="var(--nebula-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>{eyebrow}</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{name}</div>
          </div>
        </div>
        <p style={{ margin: '16px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{tagline}</p>
        <div style={{ height: 1, background: 'var(--space-border)', margin: '22px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {features.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{f}</span>
            </div>
          ))}
        </div>
      </Card>

      {media || <PhotoPanel images={photos} aspectRatio={photoAspectRatio} name={name} onOpen={onOpenPhoto} />}
    </div>
  );
}

export function Products() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  const [lightboxProduct, setLightboxProduct] = React.useState(null);

  function openTaptPhoto() {
    setLightboxProduct({ name: 'Tapt', aspectRatio: '1485 / 704' });
  }

  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Products</Eyebrow>
        <ShimmerHeading as="h1" size={56}>One tap. One link. Everything.</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Two products we built and run ourselves, designed to work as one system. Tapt gets you
          found in person. Tesseract gets you found online. Both lead to the same place.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <section style={wrap}>
          <SectionTitle title="How they work together" lead="One system, two ways in." />
          <ConvergeFlow />
        </section>

        <section style={wrap}>
          <SectionTitle title="Tapt" lead="Your presence in person. Tap the card, and everything's right there." />
          <ProductSection icon={CreditCard} eyebrow="SMART CARDS" name="Tapt"
            tagline="No more paper cards that get lost or thrown out. Tap a phone against the card and your whole presence shows up instantly, contact included."
            features={taptFeatures}
            media={(
              <iframe
                src="https://www.youtube.com/embed/4UGk1fJPvDA"
                title="Tesseract demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', aspectRatio: '9 / 16', border: '1px solid var(--space-border)',
                  borderRadius: 'var(--radius-card)', display: 'block' }}
              />
            )} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Tesseract" lead="Your presence online. One link, everything behind it." />
          <ProductSection icon={Link2} eyebrow="LINK IN BIO" name="Tesseract"
            tagline="Instead of a cluttered link-in-bio page, one clean link holds your contact, reviews, menu, socials, and booking, all in one place."
            features={tesseractFeatures}
            media={(
              <iframe
                src="https://www.youtube.com/embed/tRzfYxVaCxs"
                title="Tesseract demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', aspectRatio: '9 / 16', border: '1px solid var(--space-border)',
                  borderRadius: 'var(--radius-card)', display: 'block' }}
              />
            )} />
        </section>

        <section style={wrap}>
          <SectionTitle title="Pricing" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginTop: 36 }}>
            <Card padding={32} glow>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>Tapt</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--nebula-cyan)' }}>SMART CARDS</div>
              </div>
              <div style={{ marginTop: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 13, lineHeight: 1, color: 'var(--text-secondary)' }}>From</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>150 BZD</span>
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>/year</span>
                </div>
              </div>
              <Badge variant="cyan" style={{ marginTop: 12 }}>Includes your hub</Badge>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 10 }}>Business card tier, no setup fee</div>
              <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} style={{ marginTop: 3, flexShrink: 0 }} color="var(--nebula-cyan)" /><span>Every card includes your hub, to manage its details and metrics</span></div>
                <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} style={{ marginTop: 3, flexShrink: 0 }} color="var(--nebula-cyan)" /><span>Business, review, menu, and WiFi cards</span></div>
                <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} style={{ marginTop: 3, flexShrink: 0 }} color="var(--nebula-cyan)" /><span>Menu cards come with a menu engine you can edit yourself</span></div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 20, lineHeight: 1.5 }}>
                Pricing varies by use case. Ask us for a quote on anything beyond the business card tier.
              </p>
              <a href={withBase('/build')} style={{ textDecoration: 'none' }}>
                <div style={{ marginTop: 8 }}><Button variant="primary" size="sm">Ask for a Quote</Button></div>
              </a>
            </Card>

            <Card padding={32}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>Tesseract</div>
                <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>LINK IN BIO</div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>100 BZD</span>
                <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>/year</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>Just the link, no physical card</div>
              <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} style={{ marginTop: 3, flexShrink: 0 }} color="var(--nebula-cyan)" /><span>One link for everything you share</span></div>
                <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} style={{ marginTop: 3, flexShrink: 0 }} color="var(--nebula-cyan)" /><span>A premium alternative to Linktree, priced lower</span></div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 20, lineHeight: 1.5 }}>
                Already getting a Tapt business card? This is included, no need to buy it separately.
              </p>
              <a href={`${withBase('/contact')}#form`} style={{ textDecoration: 'none' }}>
                <div style={{ marginTop: 8 }}><Button variant="secondary" size="sm">Get Tesseract</Button></div>
              </a>
            </Card>
          </div>
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px var(--space-7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Have questions about Tapt or Tesseract?</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes.</p>
            <div style={{ marginTop: 10 }}>
              <a href={withBase('/build')} style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">Book a Consultation</Button>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <ImageLightbox open={!!lightboxProduct} images={lightboxProduct?.images ?? []}
        name={lightboxProduct?.name} aspectRatio={lightboxProduct?.aspectRatio} onClose={() => setLightboxProduct(null)} />
    </div>
  );
}
