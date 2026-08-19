import React from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import { Eyebrow } from '../../components/brand/Eyebrow.jsx';
import { ShimmerHeading } from '../../components/brand/ShimmerHeading.jsx';
import { Header } from '../../components/brand/Header.jsx';
import { Footer } from '../../components/brand/Footer.jsx';
import { Input } from '../../components/forms/Input.jsx';
import { Select } from '../../components/forms/Select.jsx';
import { Button } from '../../components/core/Button.jsx';
import { SERVICE_OPTIONS } from '../../lib/services.js';

export function Contact() {
  const wrap = { width: '100%', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box', paddingLeft: 'var(--space-7)', paddingRight: 'var(--space-7)' };

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [service, setService] = React.useState('general');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  // client:only means this element doesn't exist yet when the browser does its
  // one-time scroll-to-hash on load, so #form links (from other pages) need a
  // manual scroll once the real DOM node is up. The ?service= param pre-selects
  // what the visitor already told us they want by clicking a specific service.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('service');
    if (requested && SERVICE_OPTIONS.some((s) => s.slug === requested)) setService(requested);

    if (window.location.hash === '#form') {
      const el = document.getElementById('form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  function validate() {
    const next = {};
    if (!name.trim()) next.name = 'Let us know who this is from.';
    if (!email.trim()) next.email = 'We need an email to reply to.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'That doesn\'t look like a valid email.';
    if (!message.trim()) next.message = 'Tell us a bit about what you need.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const serviceLabel = SERVICE_OPTIONS.find((s) => s.slug === service)?.label || 'General inquiry';
    const subject = encodeURIComponent(`Website inquiry: ${serviceLabel}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nWhat they need: ${serviceLabel}\n\n${message}`
    );
    window.location.href = `mailto:info@ctechintl.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const row = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 };

  return (
    <div style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <Header />

      <main data-screen-label="Intro" style={{ ...wrap, paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-8)',
        display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Eyebrow>Contact</Eyebrow>
        <ShimmerHeading as="h1" size={56}>Let's talk</ShimmerHeading>
        <p style={{ margin: 0, maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Tell us what you need and we'll get back to you within one business day.
        </p>
      </main>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <section id="form" style={{ ...wrap, scrollMarginTop: 88 }}>
          <div style={{ border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-card)',
            background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',
            boxShadow: 'var(--glass-highlight)', padding: 'var(--space-7)', maxWidth: 640, margin: '0 auto' }}>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 600 }}>Your email app should be open</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 420 }}>
                  Send it over and we'll reply within one business day. Didn't open? Reach us directly at{' '}
                  <a href="mailto:info@ctechintl.com" style={{ color: 'var(--nebula-cyan)' }}>info@ctechintl.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={row}>
                  <Input label="Name" placeholder="e.g. Jane Doe" value={name}
                    onChange={(e) => setName(e.target.value)} error={errors.name} />
                  <Input label="Email" type="email" placeholder="e.g. jane@yourbusiness.com" value={email}
                    onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                </div>
                <div style={row}>
                  <Input label="Phone (optional)" placeholder="e.g. +501 600-1234" value={phone}
                    onChange={(e) => setPhone(e.target.value)} />
                  <Select label="What do you need?" value={service} onChange={(e) => setService(e.target.value)}
                    options={SERVICE_OPTIONS.map((s) => ({ value: s.slug, label: s.label }))} />
                </div>
                <Input label="Message" multiline placeholder="Tell us a bit about your business and what you're looking for..."
                  value={message} onChange={(e) => setMessage(e.target.value)} error={errors.message} />

                <div>
                  <Button type="submit" variant="primary" size="lg" style={{ width: '100%' }}>
                    Send Message <Send size={16} strokeWidth={2} />
                  </Button>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 10 }}>
                    This opens your email app with the message ready to send.
                  </div>
                </div>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <a href="tel:+5016008328" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
              fontSize: 15, fontWeight: 600, textDecoration: 'none', color: 'var(--text-primary)',
              border: '1px solid var(--nebula-cyan-50)', borderRadius: 'var(--radius-control)',
              background: 'var(--surface-translucent)', boxShadow: 'var(--glow-cyan)' }}>
              <Phone size={17} strokeWidth={1.75} />
              +501 600-8328
            </a>
            <a href="mailto:info@ctechintl.com" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
              fontSize: 15, fontWeight: 600, textDecoration: 'none', color: 'var(--text-primary)',
              border: '1px solid var(--space-border)', borderRadius: 'var(--radius-control)',
              background: 'var(--space-surface)' }}>
              <Mail size={17} strokeWidth={1.75} />
              info@ctechintl.com
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
