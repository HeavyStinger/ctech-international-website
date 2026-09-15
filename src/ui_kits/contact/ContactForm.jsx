import React from 'react';
import { Send, Loader2, ArrowLeft, ArrowRight, Pencil } from 'lucide-react';
import { Input } from '../../components/forms/Input.jsx';
import { Select } from '../../components/forms/Select.jsx';
import { Button } from '../../components/core/Button.jsx';
import { SERVICE_OPTIONS } from '../../lib/services.js';
import { COUNTRY_CODES } from '../../lib/countryCodes.js';

const COUNTRY_OPTIONS = COUNTRY_CODES.map((c) => ({ value: c.abbr, label: `${c.code} ${c.abbr}` }));

// Web3Forms (https://web3forms.com) delivers the message directly, no email app
// needed. Add your access key here to switch it on — until then, submissions fall
// back to the working mailto: link below, so the form stays functional either way.
const WEB3FORMS_ACCESS_KEY = '1555395f-57c9-4e70-9daf-f80adaa4d225';

// Web3Forms' hCaptcha integration is normally auto-wired by their client script,
// but that script only scans the page once at load time for a .h-captcha div —
// since ours only exists once the visitor reaches the preview step, that one-time
// scan misses it. Rendering the widget ourselves via hCaptcha's explicit API sidesteps
// that entirely. This sitekey is Web3Forms' own shared default (the fallback their
// client script assigns when a .h-captcha div has no data-sitekey of its own) —
// it's public in their script, not a secret tied to this account.
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

const STEPS = ['service', 'contact', 'message', 'preview'];
const STEP_LABELS = {
  service: 'What do you need?',
  contact: 'Your contact info',
  message: 'Your message',
  preview: 'Review & send',
};

function validateNameField(v) {
  return v.trim() ? null : 'Let us know who this is from.';
}
function validateEmailField(v) {
  if (!v.trim()) return 'We need an email to reply to.';
  if (!/^\S+@\S+\.\S+$/.test(v)) return "That doesn’t look like a valid email.";
  return null;
}
function validateMessageField(v) {
  return v.trim() ? null : 'Tell us a bit about what you need.';
}

function groupedServiceOptions() {
  const groups = new Map();
  for (const opt of SERVICE_OPTIONS) {
    const g = opt.group || 'General';
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(opt);
  }
  return [...groups.entries()];
}

const iconBtnStyle = (disabled) => ({
  width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 'var(--radius-control)', cursor: disabled ? 'not-allowed' : 'pointer',
  border: '1px solid var(--space-border)', background: 'var(--space-surface)',
  color: 'var(--text-primary)', opacity: disabled ? 0.4 : 1,
  transition: 'background 200ms var(--ease-hud), border-color 200ms var(--ease-hud)',
});

// prominent, grouped picker (buttons, not a <select>) so "what do you need"
// reads as the first real decision in the flow, not a buried form field.
// Selecting a service advances immediately, same "pick and go" feel as the
// yes/no steps on the Build page.
function ServiceOptionButton({ option, selected, onSelect }) {
  const [hover, setHover] = React.useState(false);
  const h = hover && !selected;
  return (
    <button type="button" onClick={() => onSelect(option.slug)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ padding: '7px 13px', borderRadius: 'var(--radius-control)', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
        border: '1px solid ' + (selected ? 'var(--nebula-cyan)' : h ? 'var(--nebula-cyan-50)' : 'var(--space-border)'),
        background: selected ? 'var(--nebula-cyan-10)' : h ? 'var(--space-surface-hover)' : 'var(--space-surface)',
        color: selected || h ? 'var(--text-primary)' : 'var(--text-secondary)',
        boxShadow: selected || h ? 'var(--glow-cyan-soft)' : 'none',
        transform: h ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background 200ms var(--ease-hud), border-color 200ms var(--ease-hud), box-shadow 200ms var(--ease-hud), transform 200ms var(--ease-hud), color 200ms var(--ease-hud)' }}>
      {option.label}
    </button>
  );
}

function ServicePicker({ value, onSelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px 24px' }}>
      {groupedServiceOptions().map(([group, opts]) => (
        <div key={group}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--text-secondary)', marginBottom: 8 }}>
            {group}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {opts.map((o) => (
              <ServiceOptionButton key={o.slug} option={o} selected={value === o.slug} onSelect={onSelect} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewRow({ label, value, onEdit, multiline }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12,
      alignItems: multiline ? 'flex-start' : 'center', padding: '14px 0', borderBottom: '1px solid var(--space-border)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          {label}
        </div>
        <div style={{ marginTop: 4, fontSize: 15, lineHeight: 1.5, whiteSpace: multiline ? 'pre-wrap' : 'normal', wordBreak: 'break-word' }}>
          {value}
        </div>
      </div>
      <button type="button" onClick={onEdit} aria-label={`Edit ${label}`}
        style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--nebula-cyan)', fontSize: 13, fontWeight: 600, flexShrink: 0, padding: 4 }}>
        <Pencil size={13} strokeWidth={2} /> Edit
      </button>
    </div>
  );
}

export function ContactForm() {
  const [stepIndex, setStepIndex] = React.useState(0);
  // true while the visitor jumped back via an "Edit" link on the preview step —
  // continuing from wherever they land should return them straight to preview
  // with everything else intact, not walk them through the rest of the flow again.
  const [editing, setEditing] = React.useState(false);
  const [service, setService] = React.useState('general');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [countryAbbr, setCountryAbbr] = React.useState('BZ');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [captchaError, setCaptchaError] = React.useState(false);
  const [captchaReady, setCaptchaReady] = React.useState(false);
  const [captchaScriptFailed, setCaptchaScriptFailed] = React.useState(false);
  const captchaContainerRef = React.useRef(null);
  const captchaWidgetIdRef = React.useRef(null);
  const nameInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const messageInputRef = React.useRef(null);

  // load hCaptcha's own library once, in explicit-render mode so we control
  // exactly when the widget renders (rather than its one-time auto-scan,
  // which would run before the preview step — and its .h-captcha div — exists).
  React.useEffect(() => {
    if (!WEB3FORMS_ACCESS_KEY) return;
    if (window.hcaptcha) { setCaptchaReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setCaptchaReady(true);
    script.onerror = () => setCaptchaScriptFailed(true);
    document.body.appendChild(script);
  }, []);

  // warn before an in-progress, unsent message is lost to a page navigation
  // or tab close (this is a real document unload, not an SPA route change,
  // since every page on this site is its own Astro page)
  React.useEffect(() => {
    const hasProgress = !sent && (name.trim() || email.trim() || message.trim() || phone.trim());
    function handleBeforeUnload(e) {
      if (!hasProgress) return;
      e.preventDefault();
      e.returnValue = '';
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sent, name, email, message, phone]);

  // the ?service= param means the visitor already told us what they want by
  // clicking a specific service, so skip straight past the picker to contact
  // info. ?design= comes from the Portfolio page's "Claim a Design" picker —
  // the image only helped them choose, so what actually reaches us is this
  // plain-text note naming the concept, dropped straight into the message.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('service');
    if (requested && SERVICE_OPTIONS.some((s) => s.slug === requested)) {
      setService(requested);
      setStepIndex(1);
    }

    const design = params.get('design');
    if (design) {
      setMessage(`I’d like to claim the “${design}” concept design.`);
    }

    // ?card= comes from the Tapt card buttons on the Products/Tapt pages —
    // names the specific card (Business/Google Review/Menu) so the message
    // arrives pre-filled instead of a generic "tapt-cards" inquiry.
    const card = params.get('card');
    if (card) {
      setMessage(`I’m interested in the ${card}.`);
    }
  }, []);

  const currentStep = STEPS[stepIndex];

  // render the widget into its container the moment both are ready — only once
  // per mount of the preview step's DOM node (widgetIdRef tracks that).
  React.useEffect(() => {
    if (currentStep !== 'preview' || !captchaReady || !captchaContainerRef.current) return;
    if (captchaWidgetIdRef.current !== null) return;
    captchaWidgetIdRef.current = window.hcaptcha.render(captchaContainerRef.current, {
      sitekey: HCAPTCHA_SITEKEY,
      theme: 'dark',
      callback: (token) => { setCaptchaToken(token); setCaptchaError(false); },
      'expired-callback': () => setCaptchaToken(''),
    });
  }, [currentStep, captchaReady]);

  // leaving preview unmounts the widget's own DOM node (see the conditional
  // render below), so its state is gone either way — this just keeps our copy
  // of the token in sync and forces a fresh render + solve next time we're back.
  React.useEffect(() => {
    if (currentStep !== 'preview') {
      captchaWidgetIdRef.current = null;
      setCaptchaToken('');
    }
  }, [currentStep]);

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function goToStep(i) {
    setEditing(true);
    setStepIndex(i);
  }

  function continueFromContact() {
    const nameErr = validateNameField(name);
    const emailErr = validateEmailField(email);
    if (nameErr || emailErr) {
      setErrors((er) => ({ ...er, name: nameErr, email: emailErr }));
      (nameErr ? nameInputRef : emailInputRef).current?.focus();
      return;
    }
    if (editing) {
      setEditing(false);
      setStepIndex(3);
    } else {
      setStepIndex(2);
    }
  }

  function continueFromMessage() {
    const messageErr = validateMessageField(message);
    if (messageErr) {
      setErrors((er) => ({ ...er, message: messageErr }));
      messageInputRef.current?.focus();
      return;
    }
    setEditing(false);
    setStepIndex(3);
  }

  async function handleSend() {
    if (submitting) return;
    setSubmitError(false);

    // the callback passed to hcaptcha.render() should have already set this,
    // but the widget's own getResponse() is the source of truth — ask it
    // directly too in case the token arrived without the callback firing.
    const liveToken = window.hcaptcha && captchaWidgetIdRef.current !== null
      ? window.hcaptcha.getResponse(captchaWidgetIdRef.current) : '';
    const token = captchaToken || liveToken;
    if (WEB3FORMS_ACCESS_KEY && !token) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setSubmitting(true);
    const serviceLabel = SERVICE_OPTIONS.find((s) => s.slug === service)?.label || 'General inquiry';
    // the mailto fallback is instant with no network round-trip, so pair every submit
    // with a short minimum wait, otherwise the loading state would be invisible until
    // a real Web3Forms key makes this a genuine fetch
    const minWait = new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (WEB3FORMS_ACCESS_KEY) {
        const [res] = await Promise.all([
          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              subject: `Website inquiry: ${serviceLabel}`,
              name, email, phone: fullPhone || 'Not provided', service: serviceLabel, message,
              'h-captcha-response': token,
            }),
          }),
          minWait,
        ]);
        const result = await res.json();
        if (!result.success) throw new Error(result.message || 'Submission failed');
      } else {
        const subject = encodeURIComponent(`Website inquiry: ${serviceLabel}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nPhone: ${fullPhone || 'Not provided'}\nWhat they need: ${serviceLabel}\n\n${message}`
        );
        await minWait;
        window.location.href = `mailto:info@ctechintl.com?subject=${subject}&body=${body}`;
      }
      setSent(true);
    } catch {
      setSubmitError(true);
      // captcha tokens are single-use — force a fresh solve on retry
      if (WEB3FORMS_ACCESS_KEY && window.hcaptcha && captchaWidgetIdRef.current !== null) {
        window.hcaptcha.reset(captchaWidgetIdRef.current);
        setCaptchaToken('');
      }
    } finally {
      setSubmitting(false);
    }
  }

  const row = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 };
  const serviceLabel = SERVICE_OPTIONS.find((s) => s.slug === service)?.label || 'General inquiry';
  const countryDialCode = COUNTRY_CODES.find((c) => c.abbr === countryAbbr)?.code || '';
  const fullPhone = phone.trim() ? `${countryDialCode} ${phone.trim()}` : '';

  return sent ? (
    // only reachable after a confirmed successful send (see handleSend — this
    // is set exactly once, right after a Web3Forms success or a triggered mailto,
    // never on error or while still in flight)
    <div role="status" aria-live="polite" style={{ flex: 1, textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: 10, alignItems: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 600 }}>
        {WEB3FORMS_ACCESS_KEY ? 'Message sent' : 'Your email app should be open'}
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 420 }}>
        {WEB3FORMS_ACCESS_KEY
          ? 'We’ll reply within one business day.'
          : 'Send it over and we’ll reply within one business day.'}{' '}
        Didn’t work? Reach us directly at{' '}
        <a href="mailto:info@ctechintl.com" style={{ color: 'var(--nebula-cyan)' }}>info@ctechintl.com</a>.
      </p>
    </div>
  ) : submitting ? (
    <div role="status" aria-live="polite" style={{ flex: 1, textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: 14, alignItems: 'center' }}>
      <Loader2 size={30} strokeWidth={2} color="var(--nebula-cyan)" aria-hidden="true" style={{ animation: 'ctech-spin-fast 0.8s linear infinite' }} />
      <div style={{ fontSize: 20, fontWeight: 600 }}>Sending your message…</div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 380 }}>
        Just a moment, this won’t take long.
      </p>
    </div>
  ) : (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <button aria-label="Back" onClick={goBack} disabled={stepIndex === 0} style={iconBtnStyle(stepIndex === 0)}>
          <ArrowLeft size={16} strokeWidth={2} />
        </button>
        <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-secondary)', textAlign: 'center' }}>
          STEP {stepIndex + 1} OF {STEPS.length}
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 'normal', color: 'var(--text-primary)', marginTop: 2 }}>
            {STEP_LABELS[currentStep]}
          </div>
        </div>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {currentStep === 'service' && (
        <ServicePicker value={service} onSelect={(slug) => {
          setService(slug);
          if (editing) { setEditing(false); setStepIndex(3); } else { setStepIndex(1); }
        }} />
      )}

      {currentStep === 'contact' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={row}>
            <Input ref={nameInputRef} label="Name" required placeholder="e.g. Jane Doe" value={name}
              name="name" autoComplete="name"
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((er) => ({ ...er, name: undefined })); }}
              onBlur={() => setErrors((er) => ({ ...er, name: validateNameField(name) || undefined }))}
              error={errors.name} />
            <Input ref={emailInputRef} label="Email" required type="email" placeholder="e.g. jane@yourbusiness.com" value={email}
              name="email" autoComplete="email" spellCheck={false}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((er) => ({ ...er, email: undefined })); }}
              onBlur={() => setErrors((er) => ({ ...er, email: validateEmailField(email) || undefined }))}
              error={errors.email} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="contact-phone" id="phone-group-label" style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>Phone (optional)</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <Select value={countryAbbr} onChange={(e) => setCountryAbbr(e.target.value)}
                name="countryCode" autoComplete="tel-country-code"
                aria-label="Country code" options={COUNTRY_OPTIONS} style={{ flex: '0 0 118px' }} />
              <Input id="contact-phone" name="phone" placeholder="600-1234" value={phone} type="tel" inputMode="tel" autoComplete="tel-national"
                onChange={(e) => setPhone(e.target.value)} style={{ flex: 1 }} />
            </div>
          </div>
          <Button variant="primary" size="md" onClick={continueFromContact} style={{ width: '100%' }}>
            Continue to Message <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
      )}

      {currentStep === 'message' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input ref={messageInputRef} label="Message" required multiline placeholder="Tell us a bit about your business and what you’re looking for…"
            name="message" value={message}
            onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((er) => ({ ...er, message: undefined })); }}
            onBlur={() => setErrors((er) => ({ ...er, message: validateMessageField(message) || undefined }))}
            error={errors.message} />
          <Button variant="primary" size="md" onClick={continueFromMessage} style={{ width: '100%' }}>
            Continue to Review <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
      )}

      {currentStep === 'preview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <PreviewRow label="What you need" value={serviceLabel} onEdit={() => goToStep(0)} />
          <PreviewRow label="Name" value={name} onEdit={() => goToStep(1)} />
          <PreviewRow label="Email" value={email} onEdit={() => goToStep(1)} />
          {fullPhone && <PreviewRow label="Phone" value={fullPhone} onEdit={() => goToStep(1)} />}
          <PreviewRow label="Message" value={message} multiline onEdit={() => goToStep(2)} />

          {WEB3FORMS_ACCESS_KEY && (
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <div ref={captchaContainerRef} />
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <Button type="button" variant="primary" size="lg"
              disabled={!!WEB3FORMS_ACCESS_KEY && !captchaToken} style={{ width: '100%' }} onClick={handleSend}>
              Send Message <Send size={16} strokeWidth={2} />
            </Button>
            {captchaScriptFailed && (
              <div role="alert" style={{ fontSize: 12.5, color: '#F87171', textAlign: 'center', marginTop: 10 }}>
                The captcha couldn’t load, check your connection or ad blocker and refresh the page.
                You can also reach us directly using the links below.
              </div>
            )}
            {captchaError && (
              <div style={{ fontSize: 12.5, color: '#F87171', textAlign: 'center', marginTop: 10 }}>
                Please complete the captcha above before sending.
              </div>
            )}
            {submitError && (
              <div style={{ fontSize: 12.5, color: '#F87171', textAlign: 'center', marginTop: 10 }}>
                Something went wrong sending that. Try again, or reach us directly at info@ctechintl.com.
              </div>
            )}
            {!WEB3FORMS_ACCESS_KEY && !submitError && (
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 10 }}>
                This opens your email app with the message ready to send.
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
