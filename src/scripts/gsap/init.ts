import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHomeAnimations } from './home';
import { initMarketingAnimations } from './marketing';
import { prefersReducedMotion } from './utils';

gsap.registerPlugin(ScrollTrigger);

export type GsapPage = 'home' | 'marketing';

function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

function scheduleRefresh(): void {
  requestAnimationFrame(() => {
    refreshScrollTrigger();
  });
}

export function initGsap(page?: string): void {
  if (prefersReducedMotion()) {
    return;
  }

  if (page === 'home') {
    initHomeAnimations();
  } else if (page === 'marketing') {
    initMarketingAnimations();
  }

  scheduleRefresh();

  window.addEventListener('load', refreshScrollTrigger);

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshScrollTrigger, 200);
  });
}
