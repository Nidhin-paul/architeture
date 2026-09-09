import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function setupHorizontalProjectPin(
  container: HTMLElement,
  track: HTMLElement
) {
  gsap.registerPlugin(ScrollTrigger);

  const totalScroll = track.scrollWidth - window.innerWidth;

  return gsap.to(track, {
    x: -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${totalScroll * 1.15}`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}
