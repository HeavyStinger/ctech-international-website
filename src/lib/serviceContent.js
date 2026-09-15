// Shared copy for the Website Development and Web App Development items, used
// by both the combined /services overview and their own dedicated
// /services/website-development and /services/web-app-development pages.
// `icon` is an iconify icon name (resolved via `lucide:${icon}`), not a
// component reference, so this data can be consumed by both static Astro
// components and any remaining React callers.
export const websiteDevItems = [
  { icon: 'globe', name: 'Business Starter Website', slug: 'website-development', price: '500 BZD',
    tagline: 'A focused single page built to get you online and taking leads, fast.',
    primaryLabel: 'Build My Estimate', primaryHref: '/build',
    secondaryLabel: 'Get My Site Today', secondaryHref: '/contact?service=website-development',
    detailsHref: '/services/website-development',
    features: [
      'Designed from scratch around your business, never a template',
      'Loads fast and works on every screen',
      'Contact form included, so visitors can reach you directly',
    ] },
  { icon: 'globe', name: 'Custom Website Build', slug: 'website-development', price: '750 BZD',
    tagline: 'Up to 5 pages, fully custom, built to turn visitors into customers.',
    primaryLabel: 'Build My Estimate', primaryHref: '/build',
    secondaryLabel: 'Get My Site Today', secondaryHref: '/contact?service=website-development',
    detailsHref: '/services/website-development',
    features: [
      'Designed from scratch around your business, never a template',
      'Up to 5 pages included, add more anytime',
      'Structured to turn visitors into calls and messages',
    ] },
];

export const websiteRedesignItem = {
  icon: 'rocket', name: 'Website Redesign', slug: 'website-redesign',
  tagline: 'Weak to sleek. Your current site, rebuilt from the ground up around your business today.',
  taglineHighlight: 'Weak to sleek.',
  primaryLabel: 'Learn More', primaryHref: '/services/website-redesign',
  secondaryLabel: 'Inquire', secondaryHref: '/contact?service=website-redesign',
  features: [
    'A full rebuild, not a visual refresh',
    'Your content and branding carried forward',
    'Your current site stays live until the new one is ready',
  ],
};

export const webAppDevItem = {
  icon: 'app-window', name: 'Web App Development', slug: 'web-app-development',
  tagline: 'Custom software for workflows off-the-shelf tools can’t handle, portals, dashboards, and booking systems built around your business.',
  primaryLabel: 'Learn More', primaryHref: '/services/web-app-development',
  secondaryLabel: 'Inquire', secondaryHref: '/contact?service=web-app-development',
  features: [
    'Portals, dashboards, booking and tracking systems',
    'Voting and voter management systems',
    'Built around how your business actually works',
    'Grows with you as your needs change',
  ],
};
