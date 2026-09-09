/**
 * Calculates physical pivot rotation angle for entrance doors based on scroll progress.
 * Opening window: 0.65 to 0.85
 * Left door: 0 -> -70deg (-1.22 rad)
 * Right door: 0 -> +70deg (+1.22 rad)
 */
export function calculateDoorAngles(progress: number): { leftRad: number; rightRad: number; openRatio: number } {
  const start = 0.65;
  const end = 0.85;

  if (progress < start) {
    return { leftRad: 0, rightRad: 0, openRatio: 0 };
  }
  if (progress >= end) {
    return { leftRad: -1.22, rightRad: 1.22, openRatio: 1 };
  }

  const normalized = (progress - start) / (end - start);
  const eased = Math.sin((normalized * Math.PI) / 2);

  return {
    leftRad: -eased * 1.22,
    rightRad: eased * 1.22,
    openRatio: eased,
  };
}
