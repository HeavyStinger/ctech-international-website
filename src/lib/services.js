// Canonical list of "what do you need?" options for the contact form's service
// picker. Slugs are also used as the ?service= query param value linked from
// Services.jsx. `group` clusters them in the picker, mirroring Services.jsx's
// own section titles so the two stay conceptually in sync.
export const SERVICE_OPTIONS = [
  { slug: 'general', label: 'General inquiry', group: 'General' },
  { slug: 'website-development', label: 'Website Development', group: 'Development' },
  { slug: 'website-redesign', label: 'Website Redesign', group: 'Development' },
  { slug: 'web-app-development', label: 'Web App Development', group: 'Development' },
  { slug: 'custom-services', label: 'Custom Services', group: 'Development' },
  { slug: 'custom-domain-email', label: 'Custom Domain Email', group: 'Development' },
  { slug: 'google-business-profiles', label: 'Google Business Profiles', group: 'Local Presence' },
  { slug: 'business-cards', label: 'Business Cards', group: 'Design' },
  { slug: 'flyers', label: 'Flyers', group: 'Design' },
  { slug: 'posters', label: 'Posters', group: 'Design' },
  { slug: 'banners', label: 'Banners', group: 'Design' },
  { slug: 'billboards', label: 'Billboards', group: 'Design' },
  { slug: 't-shirts', label: 'T-Shirts', group: 'Design' },
  { slug: 'logo-design', label: 'Logo Design', group: 'Design' },
  { slug: 'design-concept', label: 'Claim a Design Concept', group: 'Design' },
  { slug: 'tapt-cards', label: 'Tapt Cards', group: 'Products' },
  { slug: 'tesseract', label: 'Tesseract', group: 'Products' },
];
