import React from 'react';
import { ArrowLeft, Plus, Minus, Check, Zap, Clock, ShieldCheck, Download, Mail, Loader2 } from 'lucide-react';
import { Button } from '../../components/core/Button.jsx';
import { WhatsappGlyph } from '../../components/brand/WhatsappGlyph.jsx';
import { withBase } from '../../lib/url.js';

const WHATSAPP_URL = 'https://wa.me/5016008328?text=I%20am%20messaging%20from%20the%20Ctech%20International%20website';

const ONE_PAGE_PRICE = 500;
const CUSTOM_BASE = 750;
const PAGE_PRICE = 50;
const MAX_EXTRA_PAGES = 4;
const LOGO_PRICE = 150;
const HOSTING_YEAR = 500;
const CMS_ONE_TIME = 150;
const CMS_YEAR = 100;

const ALL_STEPS = ['siteType', 'pages', 'cms', 'invoice', 'booking', 'logo', 'domain', 'summary'];

function getSteps(siteType) {
  return siteType === 'one-page' ? ALL_STEPS.filter((s) => s !== 'pages') : ALL_STEPS;
}

function customTotal({ siteType, extraPages, cms, logo }) {
  const base = siteType === 'one-page' ? ONE_PAGE_PRICE : CUSTOM_BASE;
  let total = base + extraPages * PAGE_PRICE;
  if (cms) total += CMS_ONE_TIME;
  if (logo) total += LOGO_PRICE;
  return total;
}

function IconBtn({ ariaLabel, onClick, disabled, children }) {
  const [hover, setHover] = React.useState(false);
  const h = hover && !disabled;
  return (
    <button aria-label={ariaLabel} onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--radius-control)', cursor: disabled ? 'not-allowed' : 'pointer',
        border: '1px solid ' + (h ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        background: h ? 'var(--space-surface-hover)' : 'var(--space-surface)',
        color: h ? 'var(--nebula-cyan)' : 'var(--text-primary)', opacity: disabled ? 0.4 : 1,
        transform: h ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background 200ms var(--ease-hud), border-color 200ms var(--ease-hud), color 200ms var(--ease-hud), transform 200ms var(--ease-hud)' }}>
      {children}
    </button>
  );
}

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
        transition: 'border-color 250ms var(--ease-hud), transform 250ms var(--ease-hud)',
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

const SITE_TYPES = [
  { id: 'one-page', name: 'One-Page Website', price: ONE_PAGE_PRICE, body: 'A single, focused page built to convert. A strong first web presence.' },
  { id: 'custom', name: 'Custom Website Build', price: CUSTOM_BASE, body: 'Up to 5 pages, fully custom-designed and built around your business.' },
];

function SiteTypeOption({ option, selected, onSelect }) {
  const [hover, setHover] = React.useState(false);
  const h = hover && !selected;
  return (
    <button onClick={() => onSelect(option.id)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ textAlign: 'left', width: '100%', boxSizing: 'border-box', padding: '16px 18px',
        borderRadius: 'var(--radius-control)', cursor: 'pointer',
        border: '1px solid ' + (selected ? 'var(--nebula-cyan)' : h ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        background: selected ? 'var(--nebula-cyan-10)' : h ? 'var(--space-surface-hover)' : 'var(--space-surface)',
        boxShadow: (selected || h) ? 'var(--glow-cyan-soft)' : 'none',
        transform: h ? 'translateY(-2px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column', gap: 4,
        fontFamily: 'var(--font-sans)',
        transition: 'background 200ms var(--ease-hud), border-color 200ms var(--ease-hud), box-shadow 200ms var(--ease-hud), transform 200ms var(--ease-hud)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{option.name}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--nebula-cyan)', whiteSpace: 'nowrap' }}>{option.price} BZD</span>
      </div>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{option.body}</span>
    </button>
  );
}

function SiteTypeStep({ value, onSelect }) {
  return (
    <StepShell>
      <div style={{ fontSize: 22, fontWeight: 600 }}>What kind of site do you need?</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        {SITE_TYPES.map((o) => (
          <SiteTypeOption key={o.id} option={o} selected={value === o.id} onSelect={onSelect} />
        ))}
      </div>
    </StepShell>
  );
}

function PagesStep({ value, onChange, onContinue }) {
  return (
    <StepShell>
      <div style={{ fontSize: 22, fontWeight: 600 }}>How many extra pages do you need?</div>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 360 }}>
        The base build includes up to 5 pages. Add up to {MAX_EXTRA_PAGES} more at {PAGE_PRICE} BZD each.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <IconBtn ariaLabel="Fewer pages" onClick={() => onChange((v) => Math.max(0, v - 1))} disabled={value === 0}>
          <Minus size={16} strokeWidth={2} />
        </IconBtn>
        <div style={{ fontSize: 32, fontWeight: 700, minWidth: 50 }}>{value}</div>
        <IconBtn ariaLabel="More pages" onClick={() => onChange((v) => Math.min(MAX_EXTRA_PAGES, v + 1))} disabled={value === MAX_EXTRA_PAGES}>
          <Plus size={16} strokeWidth={2} />
        </IconBtn>
      </div>
      <Button variant="primary" size="md" onClick={onContinue}>Confirm Pages</Button>
    </StepShell>
  );
}

function YesNoStep({ question, description, note, value, onAnswer }) {
  return (
    <StepShell>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{question}</div>
      {description && <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 400 }}>{description}</div>}
      {note && <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{note}</div>}
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant={value === true ? 'primary' : 'secondary'} size="md" onClick={() => onAnswer(true)}>Yes</Button>
        <Button variant={value === false ? 'primary' : 'ghost'} size="md" onClick={() => onAnswer(false)}>No</Button>
      </div>
    </StepShell>
  );
}

function DomainStep({ value, onChange, onContinue }) {
  const isDotCom = value.trim().toLowerCase().endsWith('.com');
  return (
    <StepShell>
      <label htmlFor="build-domain" style={{ fontSize: 22, fontWeight: 600 }}>What domain would you like?</label>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 360 }}>
        <strong style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Optional.</strong> Domain pricing depends on availability, we’ll confirm the exact cost with you.
      </div>
      <input id="build-domain" name="domain" value={value} onChange={(e) => onChange(e.target.value)} placeholder="e.g. yourbusiness.com"
        type="text" inputMode="url" autoComplete="off" spellCheck={false}
        style={{ width: '100%', maxWidth: 320, boxSizing: 'border-box', padding: '12px 16px', fontSize: 15,
          fontFamily: 'var(--font-sans)', background: 'var(--space-surface)', border: '1px solid var(--space-border)',
          borderRadius: 'var(--radius-input)', color: 'var(--text-primary)' }} />
      {isDotCom && (
        <div style={{ fontSize: 13, color: 'var(--nebula-cyan)', maxWidth: 360 }}>
          .com domains might qualify for a free first year on us, we’ll confirm when we follow up.
        </div>
      )}
      <Button variant="primary" size="md" onClick={onContinue}>Confirm Domain</Button>
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

function IncludedItem({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Check size={15} strokeWidth={2.5} color="var(--nebula-cyan)" style={{ marginTop: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

// visual cue that this is a live quote builder, sitting above the always-open
// step flow — no "start" button, since the builder itself is never gated behind a click
function BuilderIntro() {
  return (
    <div style={{ textAlign: 'center', padding: '40px var(--space-7)', boxSizing: 'border-box',
      borderRadius: 'var(--radius-card)', border: '1px solid var(--space-border)',
      background: 'var(--glass-tint)', backdropFilter: 'blur(2px) saturate(1.3)', WebkitBackdropFilter: 'blur(2px) saturate(1.3)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15, maxWidth: 580 }}>
        Get your price. Right now.
      </div>
      <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 460 }}>
        Answer a few quick questions below and see a real, live price. No calls, no waiting on a reply.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
        <TrustBadge icon={Zap}>Live pricing</TrustBadge>
        <TrustBadge icon={Clock}>Under a minute</TrustBadge>
        <TrustBadge icon={ShieldCheck}>No commitment</TrustBadge>
      </div>
      <div style={{ height: 1, background: 'var(--space-border)', width: '100%', maxWidth: 420, margin: '4px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', maxWidth: 420, width: '100%' }}>
        <IncludedItem>Designed and engineered professionally</IncludedItem>
        <IncludedItem>You own the site outright</IncludedItem>
        <IncludedItem>One-page or up to 5-page custom builds, add more pages anytime</IncludedItem>
        <IncludedItem>Contact form included, so visitors can request appointments or services directly</IncludedItem>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 15 }}>
      <span style={{ color: 'var(--text-secondary)', minWidth: 0 }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: 'right', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{value}</span>
    </div>
  );
}

// draws the site's white logo mark onto an offscreen canvas (same brightness(0)
// invert(1) trick used in Header.jsx) so it can be embedded in the PDF as a real image
function loadWhiteLogoDataUrl(logoUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.filter = 'brightness(0) invert(1)';
      ctx.drawImage(img, 0, 0);
      resolve({ dataUrl: canvas.toDataURL('image/png'), aspect: img.naturalWidth / img.naturalHeight });
    };
    img.onerror = reject;
    img.src = logoUrl;
  });
}

async function generateQuotePdf({ siteType, extraPages, cms, invoice, booking, logo, domain, total }) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // dark starry background, same deep-space palette as the site
  doc.setFillColor(5, 8, 15);
  doc.rect(0, 0, pageW, pageH, 'F');
  let seed = 42;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 110; i++) {
    const g = Math.round(170 + rnd() * 85);
    doc.setFillColor(g, g, g);
    doc.circle(rnd() * pageW, rnd() * pageH, 0.25 + rnd() * 0.45, 'F');
  }

  let y = 22;
  try {
    const { dataUrl, aspect } = await loadWhiteLogoDataUrl(withBase('/logo.png'));
    const logoW = 46, logoH = logoW / aspect;
    doc.addImage(dataUrl, 'PNG', (pageW - logoW) / 2, y, logoW, logoH);
    y += logoH + 14;
  } catch {
    y += 6;
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('Website Quote', pageW / 2, y, { align: 'center' });
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(0, 204, 255);
  doc.text('Ctech International', pageW / 2, y, { align: 'center' });
  y += 16;

  const marginX = 24;
  function line(label, value, big) {
    doc.setFontSize(big ? 13 : 11);
    doc.setTextColor(255, 255, 255);
    doc.text(label, marginX, y);
    doc.text(value, pageW - marginX, y, { align: 'right' });
    y += big ? 9 : 8;
  }
  function divider() {
    doc.setDrawColor(40, 50, 70);
    doc.line(marginX, y - 4, pageW - marginX, y - 4);
    y += 3;
  }

  line(siteType === 'one-page' ? 'One-page website build' : 'Custom website build base (up to 5 pages)',
    `${siteType === 'one-page' ? ONE_PAGE_PRICE : CUSTOM_BASE} BZD`);
  if (extraPages > 0) line(`${extraPages} extra page${extraPages > 1 ? 's' : ''}`, `${extraPages * PAGE_PRICE} BZD`);
  if (cms) line('CMS (one-time setup fee)', `${CMS_ONE_TIME} BZD`);
  if (logo) line('Logo design', `${LOGO_PRICE} BZD`);
  divider();
  line('One-time total', `${total} BZD`, true);
  line('Hosting', `${HOSTING_YEAR} BZD/year`);
  if (cms) line('CMS', `${CMS_YEAR} BZD/year`);
  if (invoice) line('Invoice / quotation generator', 'Custom quote');
  if (booking) line('Online booking / scheduling', 'Custom quote');
  line('Domain', domain || 'Not specified');

  const isDotCom = domain.trim().toLowerCase().endsWith('.com');
  if (isDotCom) {
    y += 3;
    doc.setFontSize(9);
    doc.setTextColor(0, 204, 255);
    doc.text('.com domains might qualify for a free first year, to be confirmed.', pageW / 2, y, { align: 'center' });
  }

  doc.setFontSize(11);
  doc.setTextColor(0, 204, 255);
  doc.text('info@ctechintl.com', pageW / 2, pageH - 20, { align: 'center' });
  doc.text('+501 600-8328', pageW / 2, pageH - 13, { align: 'center' });

  doc.save('Ctech-Website-Quote.pdf');
}

function PillLink({ href, external, accent, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', fontSize: 14, fontWeight: 600, textDecoration: 'none',
        color: hover ? 'var(--nebula-cyan)' : 'var(--text-primary)',
        border: '1px solid ' + (accent ? (hover ? 'var(--nebula-cyan)' : 'var(--nebula-cyan-50)') : (hover ? 'var(--nebula-cyan-50)' : 'var(--space-border)')),
        borderRadius: 'var(--radius-control)',
        background: accent ? 'var(--surface-translucent)' : (hover ? 'var(--space-surface-hover)' : 'var(--space-surface)'),
        boxShadow: hover ? 'var(--glow-cyan-soft)' : 'none',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background 200ms var(--ease-hud), border-color 200ms var(--ease-hud), color 200ms var(--ease-hud), box-shadow 200ms var(--ease-hud), transform 200ms var(--ease-hud)' }}>
      {children}
    </a>
  );
}

function SummaryStep({ siteType, extraPages, cms, invoice, booking, logo, domain, total }) {
  const [downloaded, setDownloaded] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);
  const isDotCom = domain.trim().toLowerCase().endsWith('.com');

  async function handleDownload() {
    if (generating) return;
    setGenerating(true);
    // the PDF (small, local image processing) can finish in well under a frame,
    // so pair it with a short minimum wait or the spinner would be invisible
    const minWait = new Promise((resolve) => setTimeout(resolve, 500));
    try {
      await Promise.all([generateQuotePdf({ siteType, extraPages, cms, invoice, booking, logo, domain, total }), minWait]);
      setDownloaded(true);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Your estimate</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SummaryLine label={siteType === 'one-page' ? 'One-page website build' : 'Custom website build base (up to 5 pages)'}
          value={`${siteType === 'one-page' ? ONE_PAGE_PRICE : CUSTOM_BASE} BZD`} />
        {extraPages > 0 && (
          <SummaryLine label={`${extraPages} extra page${extraPages > 1 ? 's' : ''}`} value={`${extraPages * PAGE_PRICE} BZD`} />
        )}
        {cms && <SummaryLine label="CMS (one-time setup fee)" value={`${CMS_ONE_TIME} BZD`} />}
        {logo && <SummaryLine label="Logo design" value={`${LOGO_PRICE} BZD`} />}
        <div style={{ height: 1, background: 'var(--space-border)', margin: '4px 0' }} />
        <SummaryLine label="One-time total" value={`${total} BZD`} />
        <SummaryLine label="Hosting" value={`${HOSTING_YEAR} BZD/year`} />
        {cms && <SummaryLine label="CMS" value={`${CMS_YEAR} BZD/year`} />}
        {invoice && <SummaryLine label="Invoice / quotation generator" value="Custom quote" />}
        {booking && <SummaryLine label="Online booking / scheduling" value="Custom quote" />}
        <SummaryLine label={domain ? `Domain (${domain})` : 'Domain'} value="To be determined" />
      </div>
      {isDotCom && (
        <div style={{ fontSize: 12.5, color: 'var(--nebula-cyan)', textAlign: 'center' }}>
          .com domains might qualify for a free first year, we’ll confirm when we follow up.
        </div>
      )}
      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textAlign: 'center' }}>
        Domain pricing depends on availability and will be confirmed with you.
      </div>

      <Button variant="primary" size="lg" disabled={generating} style={{ width: '100%', marginTop: 8 }} onClick={handleDownload}>
        {generating
          ? <><Loader2 size={16} strokeWidth={2} aria-hidden="true" style={{ animation: 'ctech-spin-fast 0.8s linear infinite' }} /> Generating…</>
          : <><Download size={16} strokeWidth={2} aria-hidden="true" /> Download Your Quote</>}
      </Button>

      {downloaded && (
        <div role="status" aria-live="polite" style={{ border: '1px solid var(--nebula-cyan-30)', borderRadius: 'var(--radius-control)',
          background: 'var(--nebula-cyan-10)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Now send it our way</div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Attach the file you just downloaded and send it to us, we’ll follow up with next steps.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PillLink href={WHATSAPP_URL} external accent>
              <WhatsappGlyph size={16} /> WhatsApp
            </PillLink>
            <PillLink href="mailto:info@ctechintl.com?subject=My%20Website%20Quote">
              <Mail size={16} strokeWidth={1.75} /> Email
            </PillLink>
          </div>
        </div>
      )}
    </div>
  );
}

export function BuildWizard() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [siteType, setSiteType] = React.useState(null);
  const [extraPages, setExtraPages] = React.useState(0);
  const [cms, setCms] = React.useState(null);
  const [invoice, setInvoice] = React.useState(null);
  const [booking, setBooking] = React.useState(null);
  const [logo, setLogo] = React.useState(null);
  const [domain, setDomain] = React.useState('');

  const STEPS = getSteps(siteType);
  const currentStep = STEPS[stepIndex];
  const total = customTotal({ siteType, extraPages, cms, logo });

  // warn before an in-progress estimate is lost to a page navigation or tab
  // close — mirrors the same guard on the Contact form.
  React.useEffect(() => {
    const hasProgress = !!siteType;
    function handleBeforeUnload(e) {
      if (!hasProgress) return;
      e.preventDefault();
      e.returnValue = '';
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [siteType]);

  // going back to a yes/no step un-answers it, so its price (or summary line)
  // drops out of the total immediately instead of silently sticking around
  // until re-confirmed — the step has to be answered again to count again.
  function unanswer(step) {
    if (step === 'cms') setCms(null);
    else if (step === 'invoice') setInvoice(null);
    else if (step === 'booking') setBooking(null);
    else if (step === 'logo') setLogo(null);
    else if (step === 'siteType') {
      setSiteType(null);
      setExtraPages(0);
      setCms(null);
      setInvoice(null);
      setBooking(null);
      setLogo(null);
      setDomain('');
    }
  }

  function goBack() {
    setStepIndex((i) => {
      const target = Math.max(0, i - 1);
      if (target !== i) unanswer(STEPS[target]);
      return target;
    });
  }
  function goNext() {
    setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
  }

  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };

  return (
        <section className="ctech-build-layout" style={{ ...wrap, scrollMarginTop: 88 }}>
          <BuilderIntro />

          <FlatCard padding={40} style={{ width: '100%', maxWidth: 560, margin: '0 auto', minHeight: 460, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <IconBtn ariaLabel="Back" onClick={goBack} disabled={stepIndex === 0}>
                <ArrowLeft size={16} strokeWidth={2} />
              </IconBtn>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>
                STEP {stepIndex + 1} OF {STEPS.length}
              </div>
              <div style={{ width: 36 }} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {currentStep !== 'summary' && currentStep !== 'siteType' && (
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <div style={{ fontSize: 11.5, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>ESTIMATED TOTAL</div>
                  <div style={{ fontSize: 32, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {total} BZD <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>one-time</span>
                  </div>
                </div>
              )}

              {currentStep === 'siteType' && (
                <SiteTypeStep value={siteType} onSelect={(v) => { setSiteType(v); if (v === 'one-page') setExtraPages(0); goNext(); }} />
              )}
              {currentStep === 'pages' && <PagesStep value={extraPages} onChange={setExtraPages} onContinue={goNext} />}
              {currentStep === 'cms' && (
                <YesNoStep question="Do you need a CMS?"
                  description="A content management system lets you add services, products, blog posts, testimonials, and more to your site yourself, no need to contact us. Useful on its own too, for things like news and updates, even without the invoice generator below."
                  note={`Adds ${CMS_ONE_TIME} BZD one-time setup fee + ${CMS_YEAR} BZD/year`}
                  value={cms} onAnswer={(v) => { setCms(v); goNext(); }} />
              )}
              {currentStep === 'invoice' && (
                <YesNoStep question="Do you need an invoice or quotation generator?"
                  description={cms
                    ? 'Products and services will be linked through your CMS for visitors to select, though it doesn’t have to be products, it can be used for anything you need a quote for. Visitors browse what you offer, add items to an order sheet, and generate a quotation to send straight to you, just like the estimate you’re building right now on this site.'
                    : 'This doesn’t have to be for products, it can be used for anything you need a quote for. Visitors browse what you offer, add items to an order sheet, and generate a quotation to send straight to you, just like the estimate you’re building right now on this site.'}
                  note="No fixed price, we’ll follow up with a custom quote"
                  value={invoice} onAnswer={(v) => { setInvoice(v); goNext(); }} />
              )}
              {currentStep === 'booking' && (
                <YesNoStep question="Need online booking or scheduling wired to another platform?"
                  note="No fixed price, we’ll follow up with a custom quote"
                  value={booking} onAnswer={(v) => { setBooking(v); goNext(); }} />
              )}
              {currentStep === 'logo' && (
                <YesNoStep question="Need a logo designed?" note={`Adds ${LOGO_PRICE} BZD`} value={logo}
                  onAnswer={(v) => { setLogo(v); goNext(); }} />
              )}
              {currentStep === 'domain' && <DomainStep value={domain} onChange={setDomain} onContinue={goNext} />}
              {currentStep === 'summary' && (
                <SummaryStep siteType={siteType} extraPages={extraPages} cms={cms} invoice={invoice} booking={booking} logo={logo} domain={domain} total={total} />
              )}
            </div>
          </FlatCard>
        </section>
  );
}
