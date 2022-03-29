export function getIsMobile() {
  return !window.matchMedia('(min-width: 38rem)').matches;
}