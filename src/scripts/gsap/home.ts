import gsap from 'gsap';
import { SEL, SCROLL_START } from './selectors';
import { fadeUp, MOTION } from './utils';

export function initHomeAnimations(): void {
  const hero = document.querySelector(SEL.hero.section);
  if (hero) {
    const title = hero.querySelector(SEL.hero.title);
    const sub = hero.querySelector(SEL.hero.sub);
    const actions = hero.querySelectorAll(SEL.hero.actions);

    const tl = gsap.timeline({ defaults: { ease: MOTION.ease } });

    if (title) {
      tl.from(title, { autoAlpha: 0, y: 40, duration: 0.85 });
    }
    if (sub) {
      tl.from(sub, { autoAlpha: 0, y: 32, duration: MOTION.duration }, '-=0.45');
    }
    if (actions.length) {
      tl.from(
        actions,
        { autoAlpha: 0, y: 28, duration: MOTION.durationShort, stagger: MOTION.stagger },
        '-=0.35',
      );
    }
  }

  const valuesBand = document.querySelector(SEL.valuesBand.section);
  if (valuesBand) {
    fadeUp(valuesBand.querySelectorAll(SEL.valuesBand.items), {
      stagger: MOTION.stagger,
      scrollTrigger: { trigger: valuesBand, start: SCROLL_START },
    });
  }

  const featureIntro = document.querySelector(SEL.featureCards.intro);
  if (featureIntro) {
    fadeUp(featureIntro, {
      scrollTrigger: { trigger: featureIntro, start: SCROLL_START },
    });
  }

  const cards = document.querySelectorAll(SEL.featureCards.cards);
  if (cards.length) {
    fadeUp(cards, {
      stagger: MOTION.stagger,
      scrollTrigger: { trigger: cards[0], start: SCROLL_START },
    });
  }

  const gatherContent = document.querySelector(SEL.gather.content);
  if (gatherContent) {
    fadeUp(gatherContent, {
      scrollTrigger: { trigger: SEL.gather.section, start: SCROLL_START },
    });
  }

  const diningInner = document.querySelector(SEL.dining.inner);
  if (diningInner) {
    fadeUp(diningInner, {
      scrollTrigger: { trigger: SEL.dining.section, start: SCROLL_START },
    });
  }

  const ctaBar = document.querySelector(SEL.cta.bar);
  if (ctaBar) {
    fadeUp(ctaBar, {
      scrollTrigger: { trigger: SEL.cta.section, start: SCROLL_START },
    });
  }

  const valueItems = document.querySelectorAll(SEL.valuesRow.items);
  if (valueItems.length) {
    fadeUp(valueItems, {
      stagger: MOTION.stagger,
      scrollTrigger: { trigger: SEL.valuesRow.section, start: SCROLL_START },
    });
  }
}
