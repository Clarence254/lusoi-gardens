/** Shared selectors for GSAP marketing animations */
export const SEL = {
  hero: {
    section: '.lusoi-hero',
    title: '.lusoi-hero h1',
    sub: '.lusoi-hero-sub',
    actions: '.lusoi-hero-actions > *',
  },
  valuesBand: {
    section: '.lusoi-values-band',
    items: '.lusoi-value-item',
  },
  featureCards: {
    intro: '.lusoi-feature-cards .lusoi-intro',
    cards: '.lusoi-feature-card',
  },
  gather: {
    section: '.lusoi-gather-wrap',
    content: '.lusoi-gather-content',
  },
  dining: {
    section: '.lusoi-dining-wrap',
    inner: '.lusoi-dining-text-inner',
  },
  cta: {
    section: '.lusoi-cta-wrap',
    bar: '.lusoi-cta-bar',
  },
  valuesRow: {
    section: '.lusoi-core-values',
    items: '.lusoi-core-value',
  },
  marketing: {
    pageHero: '.lusoi-page-hero',
    heroText: '.lusoi-page-hero .text',
    sections: 'section.ftco-section',
  },
} as const;

export const SCROLL_START = 'top 85%';
