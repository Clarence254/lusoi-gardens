import gsap from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

export const MOTION = {
  duration: 0.75,
  durationShort: 0.6,
  ease: 'power2.out',
  y: 32,
  stagger: 0.12,
} as const;

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function fadeUp(
  targets: gsap.TweenTarget,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    y?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  },
) {
  const {
    delay = 0,
    stagger = 0,
    duration = MOTION.duration,
    y = MOTION.y,
    scrollTrigger,
  } = options ?? {};

  return gsap.from(targets, {
    autoAlpha: 0,
    y,
    duration,
    ease: MOTION.ease,
    delay,
    stagger,
    scrollTrigger,
  });
}
