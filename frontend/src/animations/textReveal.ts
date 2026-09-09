import gsap from 'gsap';

export function animateTextReveal(element: HTMLElement, delay: number = 0) {
  return gsap.fromTo(
    element,
    {
      y: 40,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay,
      ease: 'power3.out',
    }
  );
}
