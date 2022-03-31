export function getIsMobile() {
  return !window.matchMedia('(min-width: 40rem)').matches;
}