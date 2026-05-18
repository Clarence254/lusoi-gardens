import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEL, SCROLL_START } from './selectors';
import { fadeUp, MOTION } from './utils';

export function initMarketingAnimations(): void {
  const pageHero = document.querySelector(SEL.marketing.pageHero);
  if (pageHero) {
    const heroText = pageHero.querySelector(SEL.marketing.heroText);
    const targets = heroText
      ? heroText.querySelectorAll('h1')
      : pageHero.querySelectorAll('h1');

    if (targets.length) {
      fadeUp(targets, { stagger: 0.1, duration: MOTION.duration });
    }
  }

  const sections = document.querySelectorAll(SEL.marketing.sections);
  if (sections.length) {
    ScrollTrigger.batch(sections, {
      start: SCROLL_START,
      onEnter: (batch) => {
        fadeUp(batch, { stagger: 0.08, duration: MOTION.durationShort });
      },
      once: true,
    });
  }
}
