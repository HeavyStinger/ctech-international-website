import React from 'react';
import { Globe, AppWindow, Sparkles, Server, Mail, Check, ArrowRight, CreditCard, Megaphone, Image, RectangleHorizontal, SignpostBig, Shirt } from 'lucide-react';
import googleBusinessProfileRaw from '../../assets/brand-icons/google-business-profile.svg?raw';
import googleAdsRaw from '../../assets/brand-icons/google-ads.svg?raw';

const googleBusinessProfileSvg = googleBusinessProfileRaw.replace('<svg ', '<svg width="100%" height="100%" ');
const googleAdsSvg = googleAdsRaw.replace('<svg ', '<svg width="100%" height="100%" ');
import { Button } from '../../components/core/Button.jsx';
import { Card } from '../../components/core/Card.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { SectionTitle } from '../../components/brand/SectionTitle.jsx';
import { withBase } from '../../lib/url.js';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { TechStack } from '../../components/brand/TechStack.jsx';

// less glass than the default Card (no gloss/streak shine, lighter blur), but still translucent
const lightGlass = {
  background: 'var(--glass-tint)',
  backdropFilter: 'blur(2px) saturate(1.3)',
  WebkitBackdropFilter: 'blur(2px) saturate(1.3)',
  boxShadow: 'none',
};

const flowSteps = [
  { n: '01', label: 'Build', body: 'A site or app made for your business' },
  { n: '02', label: 'Host', body: '99.9% uptime, fully managed' },
  { n: '03', label: 'Get found', body: 'Local search and ads that bring leads' },
];

const sellGroups = [
  {
    title: 'Development',
    lead: 'The foundation everything else builds on. Designed and coded around your business, not squeezed into a theme.',
    items: [
      { icon: Globe, name: 'Website Development', slug: 'website-development', tagline: 'A site built to bring in customers, not just look nice.',
        features: [
          'Designed from scratch around your business, never a template',
          'Loads fast and works on every screen',
          'Structured to turn visitors into calls and messages',
        ] },
      { icon: AppWindow, name: 'Web App Development', slug: 'web-app-development', tagline: 'Custom software for workflows off-the-shelf tools can’t handle.',
        features: [
          'Portals, dashboards, booking and tracking systems',
          'Built around how your business actually works',
          'Grows with you as your needs change',
        ] },
      { icon: Sparkles, name: 'Custom Services', slug: 'custom-services', tagline: 'For the projects that don’t fit a checkbox.',
        features: [
          'Voting systems, internal tools, one-off builds',
          'Scoped around your exact problem, not a package',
          'If it’s not on this list, ask anyway',
        ] },
    ],
  },
  {
    title: 'Infrastructure',
    lead: 'What we build has to stay online. We host and manage it ourselves, so there’s one team accountable for the whole thing, not three.',
    items: [
      { icon: Server, name: 'Hosting', slug: 'hosting', tagline: '99.9% uptime, watched around the clock.',
        features: [
          'Your site stays up while we handle the infrastructure',
          'Fast servers, no third-party handoffs',
          'Issues get caught before your customers notice',
        ] },
      { icon: Mail, name: 'Custom Domain Email', slug: 'custom-domain-email', tagline: 'you@yourbusiness.com looks like a real business.',
        features: [
          'Professional email on your own domain',
          'More credible than a free @gmail address',
          'Set up and managed for you',
        ] },
    ],
  },
  {
    title: 'Local Presence',
    lead: 'The best site in the world does nothing if customers can’t find it. This is how they do.',
    items: [
      { customSvg: googleBusinessProfileSvg, name: 'Google Business Profiles', slug: 'google-business-profiles', tagline: 'Show up when people search for what you do, nearby.',
        features: [
          'Setup and optimization from scratch',
          'Hours, photos, and reviews kept current',
          'Free visibility that keeps paying off',
        ] },
      { customSvg: googleAdsSvg, name: 'Google Ads', slug: 'google-ads', tagline: 'Paid campaigns that bring leads in faster.',
        features: [
          'Campaigns built around your goals and budget',
          'Targeted at the customers actually looking for you',
          'Monitored and adjusted, not set and forgotten',
        ] },
    ],
  },
];

const designGroup = {
  title: 'Design',
  lead: 'The same brand everywhere it shows up. Print and signage designed to match the site, not clash with it.',
  items: [
    { icon: CreditCard, name: 'Business Cards', slug: 'business-cards', tagline: 'The first thing people hold onto after they meet you.',
      features: [
        'Front and back layout designed to match your brand',
        'Print-ready files, no guesswork for the printer',
        'Makes a stronger impression than a generic template',
      ] },
    { icon: Megaphone, name: 'Flyers', slug: 'flyers', tagline: 'Built to grab attention and get the offer read.',
      features: [
        'Promotions, events, and announcements',
        'Clear hierarchy so the message lands fast',
        'Sized for print or sharing online',
      ] },
    { icon: Image, name: 'Posters', slug: 'posters', tagline: 'Made to hold up from across a room.',
      features: [
        'Bold layouts that read at a distance',
        'Sized for standard print formats',
        'Same colors and fonts as your site',
      ] },
    { icon: RectangleHorizontal, name: 'Banners', slug: 'banners', tagline: 'Storefronts and events, branded the moment people walk up.',
      features: [
        'Designed for indoor or outdoor display',
        'Built to be readable at a glance',
        'Matches the rest of your brand materials',
      ] },
    { icon: SignpostBig, name: 'Billboards', slug: 'billboards', tagline: 'Wide reach, built for a few seconds of attention.',
      features: [
        'Simple, bold layouts that work at highway speed',
        'Sized to spec for your chosen location',
        'Consistent with your site and other print',
      ] },
    { icon: Shirt, name: 'T-Shirts', slug: 't-shirts', tagline: 'The same brand, on and off the screen.',
      features: [
        'Apparel for staff, events, or merch',
        'Print-ready artwork for your chosen shop',
        'Logo and colors kept consistent everywhere',
      ] },
  ],
};

function ServiceFlowStrip() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 8 }}>
      {flowSteps.map((s, i) => (
        <React.Fragment key={s.n}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
            border: '1px solid var(--space-border)', borderRadius: 'var(--radius-control)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--nebula-cyan)' }}>{s.n}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.body}</div>
            </div>
          </div>
          {i < flowSteps.length - 1 && <ArrowRight size={16} strokeWidth={1.75} color="var(--text-secondary)" style={{ flexShrink: 0 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ServiceCard({ icon: Icon, customSvg, name, tagline, features, href }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit',
        background: 'var(--glass-tint)', backdropFilter: 'blur(2px) saturate(1.3)', WebkitBackdropFilter: 'blur(2px) saturate(1.3)',
        border: '1px solid ' + (hover ? 'var(--nebula-cyan-30)' : 'var(--space-border)'),
        borderRadius: 'var(--radius-card)', padding: 28,
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 250ms var(--ease-hud)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-control)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          background: customSvg ? 'var(--space-surface-hover)' : (hover ? 'var(--nebula-cyan-20)' : 'var(--nebula-cyan-10)'),
          border: '1px solid ' + (customSvg ? 'var(--space-border)' : 'var(--nebula-cyan-30)'),
          transition: 'background 250ms var(--ease-hud)' }}>
          {customSvg
            ? <div style={{ width: 24, height: 24 }} dangerouslySetInnerHTML={{ __html: customSvg }} />
            : <Icon size={22} strokeWidth={1.75} color="var(--nebula-cyan)" />}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>{name}</div>
      </div>
      <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{tagline}</p>
      <div style={{ height: 1, background: 'var(--space-border)', margin: '18px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f) => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{f}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: 13.5, fontWeight: 600,
        color: hover ? 'var(--nebula-cyan)' : 'var(--text-secondary)', transition: 'color 250ms var(--ease-hud)' }}>
        Ask about this <ArrowRight size={14} strokeWidth={2.25} style={{ transform: hover ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 250ms var(--ease-hud)' }} />
      </div>
    </a>
  );
}

export function Services() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Services &amp; Tech</Eyebrow>
        <ShimmerHeading as="h1" size={56}>What we build</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Everything a business needs to look and run world-class online, from one studio in Belize City.
        </p>
        <ServiceFlowStrip />
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        {sellGroups.map((g) => (
          <section key={g.title} style={wrap}>
            <SectionTitle title={g.title} lead={g.lead} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 36 }}>
              {g.items.map((item) => (
                <ServiceCard key={item.name} icon={item.icon} customSvg={item.customSvg} name={item.name} tagline={item.tagline} features={item.features}
                  href={withBase(`/contact?service=${item.slug}`)} />
              ))}
            </div>
          </section>
        ))}

        <section style={wrap}>
          <SectionTitle title={designGroup.title} lead={designGroup.lead} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 36 }}>
            {designGroup.items.map((item) => (
              <ServiceCard key={item.name} icon={item.icon} customSvg={item.customSvg} name={item.name} tagline={item.tagline} features={item.features}
                href={withBase(`/contact?service=${item.slug}`)} />
            ))}
          </div>
        </section>

        <section style={wrap}>
          <SectionTitle title="Emerging" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 36 }}>
            <Card padding={24} style={{ ...lightGlass, opacity: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>AI Automation</div>
                <span style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>COMING SOON</span>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>Not launched yet.</p>
            </Card>
          </div>
        </section>

        <section style={wrap}>
          <SectionTitle title="Frameworks & Stack" lead="This site is built with Astro. Here's the rest of the toolkit we build with." />
          <div style={{ marginTop: 36 }}>
            <TechStack />
          </div>
        </section>

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px var(--space-7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Not sure what you need? Let's talk it through.</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes to scope your project.</p>
            <div style={{ marginTop: 10 }}>
              <a href={withBase('/build')} style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">Book a Consultation</Button>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
