import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface CameraPathKeyframe {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

export const defaultCameraTimeline: CameraPathKeyframe[] = [
  { progress: 0.0, position: [0, 4.5, 24], lookAt: [0, 2.5, 0] },
  { progress: 0.2, position: [0, 3.8, 20], lookAt: [0, 2.5, 0] },
  { progress: 0.6, position: [0, 2.3, 6.5], lookAt: [0, 2.2, 1.5] },
  { progress: 0.85, position: [0, 1.9, 2.8], lookAt: [0, 2.0, 1.0] },
  { progress: 1.0, position: [0, 1.8, -4.5], lookAt: [0, 2.0, -12.0] },
];

export function initHeroScrollTrigger(
  targetElement: HTMLElement,
  onProgressUpdate: (progress: number) => void
) {
  gsap.registerPlugin(ScrollTrigger);

  const st = ScrollTrigger.create({
    trigger: targetElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.8,
    onUpdate: (self) => {
      onProgressUpdate(self.progress);
    },
  });

  return st;
}
