import React from 'react';
import { ArrowLeft, ArrowRight, Plus, Minus, Check, Sparkles, Zap, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { withBase } from '../../lib/url.js';

const CUSTOM_BASE = 700;
const PAGE_PRICE = 75;
const MAX_EXTRA_PAGES = 4;
const BOOKING_PRICE = 350;
const LOGO_PRICE = 150;
const RUSH_PRICE = 200;
const HOSTING_YEAR = 500;

const CUSTOM_STEPS = ['pages', 'booking', 'logo', 'rush', 'domain', 'summary'];
const STARTER_STEPS = ['domain', 'summary'];

function customTotal({ extraPages, booking, logo, rush }) {
  let total = CUSTOM_BASE + extraPages * PAGE_PRICE;
  if (booking) total += BOOKING_PRICE;
  if (logo) total += LOGO_PRICE;
  if (rush) total += RUSH_PRICE;
  return total;
}

const iconBtnStyle = (disabled) => ({
  width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 'var(--radius-control)', cursor: disabled ? 'not-allowed' : 'pointer',
  border: '1px solid var(--space-border)', background: 'var(--space-surface)',
  color: 'var(--text-primary)', opacity: disabled ? 0.4 : 1, transition: 'all 200ms var(--ease-hud)',
});

// flatter than the default Card: no gloss/streak overlay (that's what read as
// "janky" at this panel size), just a tinted surface with a border that
// brightens on hover — same recipe used for the sell cards on Services.jsx.
function FlatCard({ children, onClick, glow, padding = 24, style }) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return (
    <div onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{ display: 'flex', flexDirection: 'column',
        background: 'var(--glass-tint)', backdropFilter: 'blur(2px) saturate(1.3)', WebkitBackdropFilter: 'blur(2px) saturate(1.3)',
        border: '1px solid ' + (hover ? 'var(--nebula-cyan-50)' : (glow ? 'var(--nebula-cyan-30)' : 'var(--space-border)')),
        borderRadius: 'var(--radius-card)', padding,
        boxShadow: glow ? 'var(--glow-cyan-soft)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 250ms var(--ease-hud)',
        fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', ...style }}>
      {children}
    </div>
  );
}

function StepShell({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', textAlign: 'center' }}>
      {children}
    </div>
  );
}

function PagesStep({ value, onChange, onContinue }) {
  return (
    <StepShell>
      <div style={{ fontSize: 22, fontWeight: 600 }}>How many extra pages do you need?</div>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 360 }}>
        The base build includes up to 5 pages. Add up to {MAX_EXTRA_PAGES} more at {PAGE_PRICE} BZD each.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button aria-label="Fewer pages" onClick={() => onChange((v) => Math.max(0, v - 1))} disabled={value === 0}
          style={iconBtnStyle(value === 0)}>
          <Minus size={16} strokeWidth={2} />
        </button>
        <div style={{ fontSize: 32, fontWeight: 700, minWidth: 50 }}>{value}</div>
        <button aria-label="More pages" onClick={() => onChange((v) => Math.min(MAX_EXTRA_PAGES, v + 1))} disabled={value === MAX_EXTRA_PAGES}
          style={iconBtnStyle(value === MAX_EXTRA_PAGES)}>
          <Plus size={16} strokeWidth={2} />
        </button>
      </div>
      <Button variant="primary" size="md" onClick={onContinue}>Continue</Button>
    </StepShell>
  );
}

function YesNoStep({ question, note, value, onAnswer }) {
  return (
    <StepShell>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{question}</div>
      {note && <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{note}</div>}
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant={value === true ? 'primary' : 'secondary'} size="md" onClick={() => onAnswer(true)}>Yes</Button>
        <Button variant={value === false ? 'primary' : 'ghost'} size="md" onClick={() => onAnswer(false)}>No</Button>
      </div>
    </StepShell>
  );
}

function DomainStep({ value, onChange, onContinue }) {
  return (
    <StepShell>
      <div style={{ fontSize: 22, fontWeight: 600 }}>What domain would you like?</div>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 360 }}>
        Optional. Domain pricing depends on availability, we'll confirm the exact cost with you.
      </div>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="yourbusiness.com"
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', padding: '12px 16px', fontSize: 15,
          fontFamily: 'var(--font-sans)', background: 'var(--space-surface)', border: '1px solid var(--space-border)',
          borderRadius: 'var(--radius-input)', color: 'var(--text-primary)' }} />
      <Button variant="primary" size="md" onClick={onContinue}>Continue</Button>
    </StepShell>
  );
}

function TrustBadge({ icon: Icon, children }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: 'var(--text-secondary)' }}>
      <Icon size={15} strokeWidth={2} color="var(--nebula-cyan)" />
      {children}
    </span>
  );
}

function QuoteBuilderBanner({ onStart }) {
  return (
    <div style={{ position: 'relative', textAlign: 'center', padding: '64px var(--space-7)',
      borderRadius: 'var(--radius-card)', border: '1px solid var(--nebula-cyan-30)',
      background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
      boxShadow: 'var(--glow-cyan), var(--glass-highlight)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--nebula-cyan-10)', border: '1px solid var(--nebula-cyan-30)' }}>
        <Sparkles size={30} strokeWidth={1.75} color="var(--nebula-cyan)" />
      </div>
      <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, maxWidth: 580 }}>
        Get your price. Right now.
      </div>
      <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 460 }}>
        Answer a few quick questions and see a real, live price. No calls, no waiting on a reply.
      </p>
      <Button variant="primary" size="lg" onClick={onStart} style={{ marginTop: 4 }}>
        Start the Quote Builder <ArrowRight size={18} strokeWidth={2.5} />
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 4 }}>
        <TrustBadge icon={Zap}>Live pricing</TrustBadge>
        <TrustBadge icon={Clock}>Under a minute</TrustBadge>
        <TrustBadge icon={ShieldCheck}>No commitment</TrustBadge>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 15 }}>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function SummaryStep({ path, extraPages, booking, logo, rush, domain, total }) {
  const ctaHref = `${withBase('/contact')}#form`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Your estimate</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {path === 'starter' && <SummaryLine label="Starter plan" value="99 BZD/month" />}
        {path === 'custom' && (
          <>
            <SummaryLine label="Custom Build base (up to 5 pages)" value={`${CUSTOM_BASE} BZD`} />
            {extraPages > 0 && (
              <SummaryLine label={`${extraPages} extra page${extraPages > 1 ? 's' : ''}`} value={`${extraPages * PAGE_PRICE} BZD`} />
            )}
            {booking && <SummaryLine label="Online booking / scheduling" value={`${BOOKING_PRICE} BZD`} />}
            {logo && <SummaryLine label="Logo design" value={`${LOGO_PRICE} BZD`} />}
            {rush && <SummaryLine label="Rush delivery (1 week)" value={`${RUSH_PRICE} BZD`} />}
            <div style={{ height: 1, background: 'var(--space-border)', margin: '4px 0' }} />
            <SummaryLine label="One-time total" value={`${total} BZD`} />
            <SummaryLine label="Hosting" value={`${HOSTING_YEAR} BZD/year`} />
          </>
        )}
        <SummaryLine label={domain ? `Domain (${domain})` : 'Domain'} value="To be determined" />
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textAlign: 'center' }}>
        Domain pricing depends on availability and will be confirmed with you.
      </div>
      <a href={ctaHref} style={{ textDecoration: 'none', marginTop: 8, display: 'block' }}>
        <Button variant="primary" size="lg" style={{ width: '100%' }}>Get This Quote</Button>
      </a>
    </div>
  );
}

export function Build() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };
  const cardsRef = React.useRef(null);
  const [started, setStarted] = React.useState(false);
  const [path, setPath] = React.useState(null);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [extraPages, setExtraPages] = React.useState(0);
  const [booking, setBooking] = React.useState(null);
  const [logo, setLogo] = React.useState(null);
  const [rush, setRush] = React.useState(null);
  const [domain, setDomain] = React.useState('');

  const steps = path === 'custom' ? CUSTOM_STEPS : path === 'starter' ? STARTER_STEPS : [];
  const currentStep = steps[stepIndex];
  const total = path === 'custom' ? customTotal({ extraPages, booking, logo, rush }) : null;

  React.useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get('plan');
    if (plan === 'starter' || plan === 'custom') {
      setPath(plan);
      setStarted(true);
    }
  }, []);

  React.useEffect(() => {
    if (started) cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [started]);

  // re-anchor instantly (no animated scroll) on every path pick / step change, so
  // the card never jumps around as its content height changes underneath the user
  React.useEffect(() => {
    if (started && path) cardsRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [path, stepIndex]);

  function choosePath(p) {
    setPath(p);
    setStepIndex(0);
  }
  function goBack() {
    if (stepIndex === 0) setPath(null);
    else setStepIndex((i) => i - 1);
  }
  function goNext() {
    setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  }

  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Build Your Site</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Two ways to get your site</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Answer a few quick questions and get a live estimate, no back and forth needed.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <section style={wrap}>
          <QuoteBuilderBanner onStart={() => setStarted(true)} />
        </section>

        {started && (
        <section ref={cardsRef} style={{ ...wrap, scrollMarginTop: 88 }}>
          {!path ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                  Step 1: Choose your path
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
              <FlatCard padding={32} onClick={() => choosePath('starter')}>
                <div style={{ display: 'inline-flex', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.04em',
                  color: 'var(--nebula-cyan)', background: 'var(--nebula-cyan-10)', border: '1px solid var(--nebula-cyan-30)',
                  borderRadius: 'var(--radius-control)', padding: '4px 9px', marginBottom: 14 }}>
                  LIVE QUOTE
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ fontSize: 22, fontWeight: 600 }}>Starter</div>
                  <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>SUBSCRIPTION</div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>99 BZD</span>
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>/month</span>
                </div>
                <Badge variant="cyan" style={{ marginTop: 10 }}>85% off Custom Build</Badge>
                <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Professionally built and maintained for you</span></div>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Hosting and updates handled by Ctech</span></div>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Up to 5 pages, home to contact</span></div>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Month-to-month, no long-term contract</span></div>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                  <Button variant="primary" size="sm" style={{ width: '100%' }}>
                    Start My Quote <ArrowRight size={15} strokeWidth={2.5} />
                  </Button>
                </div>
              </FlatCard>

              <FlatCard glow padding={32} onClick={() => choosePath('custom')}>
                <div style={{ display: 'inline-flex', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.04em',
                  color: 'var(--nebula-cyan)', background: 'var(--nebula-cyan-10)', border: '1px solid var(--nebula-cyan-30)',
                  borderRadius: 'var(--radius-control)', padding: '4px 9px', marginBottom: 14 }}>
                  LIVE QUOTE
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                  <div style={{ fontSize: 22, fontWeight: 600 }}>Custom Build</div>
                  <div style={{ fontSize: 13, letterSpacing: '0.06em', color: 'var(--nebula-cyan)' }}>FULL OWNERSHIP</div>
                </div>
                <div style={{ marginTop: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 13, lineHeight: 1, color: 'var(--text-secondary)' }}>From</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1 }}>{CUSTOM_BASE} BZD</span>
                    <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>one-time</span>
                  </div>
                </div>
                <div style={{ height: 1, background: 'var(--space-border)', margin: '24px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Designed and engineered from scratch</span></div>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>You own the site and the domain outright</span></div>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Up to 5 pages included, add more anytime</span></div>
                  <div style={{ display: 'flex', gap: 10 }}><Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} /><span>Booking, logo, and rush delivery available</span></div>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                  <Button variant="primary" size="sm" style={{ width: '100%' }}>
                    Start My Quote <ArrowRight size={15} strokeWidth={2.5} />
                  </Button>
                </div>
              </FlatCard>
              </div>
            </>
          ) : (
            <FlatCard padding={40} style={{ maxWidth: 560, margin: '0 auto', minHeight: 460 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <button aria-label="Back" onClick={goBack} style={iconBtnStyle(false)}>
                  <ArrowLeft size={16} strokeWidth={2} />
                </button>
                <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
                  STEP {stepIndex + 1} OF {steps.length}
                </div>
                <div style={{ width: 36 }} />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {total !== null && currentStep !== 'summary' && (
                  <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>ESTIMATED TOTAL</div>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>
                      {total} BZD <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>one-time</span>
                    </div>
                  </div>
                )}

                {currentStep === 'pages' && <PagesStep value={extraPages} onChange={setExtraPages} onContinue={goNext} />}
                {currentStep === 'booking' && (
                  <YesNoStep question="Need online booking or scheduling?" note={`Adds ${BOOKING_PRICE} BZD`} value={booking}
                    onAnswer={(v) => { setBooking(v); goNext(); }} />
                )}
                {currentStep === 'logo' && (
                  <YesNoStep question="Need a logo designed?" note={`Adds ${LOGO_PRICE} BZD`} value={logo}
                    onAnswer={(v) => { setLogo(v); goNext(); }} />
                )}
                {currentStep === 'rush' && (
                  <YesNoStep question="Need it delivered in a week?" note={`Adds ${RUSH_PRICE} BZD for rush delivery`} value={rush}
                    onAnswer={(v) => { setRush(v); goNext(); }} />
                )}
                {currentStep === 'domain' && <DomainStep value={domain} onChange={setDomain} onContinue={goNext} />}
                {currentStep === 'summary' && (
                  <SummaryStep path={path} extraPages={extraPages} booking={booking} logo={logo} rush={rush} domain={domain} total={total} />
                )}
              </div>
            </FlatCard>
          )}
        </section>
        )}

        <section data-screen-label="Consultation CTA" style={wrap}>
          <div style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--glow-cyan-soft), var(--glass-highlight)', background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '72px var(--space-7)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>Still not sure? Let's talk it through.</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>A 20-minute call is all it takes.</p>
            <a href={`${withBase('/contact')}#form`} style={{ textDecoration: 'none', marginTop: 10 }}>
              <Button variant="primary" size="lg">Contact Us</Button>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
