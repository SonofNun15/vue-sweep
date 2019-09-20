export function randomInt(max: number, min = 0) {
  const range = (max - min) + 1;
  const seed = Math.random();
  return Math.floor(range * seed) + min;
}
