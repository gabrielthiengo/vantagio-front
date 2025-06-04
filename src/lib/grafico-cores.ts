export const blueShades = [
  '#1E3A8A',
  '#1D4ED8',
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#0EA5E9',
  '#38BDF8',
  '#7DD3FC',
];

export function getRandomBlueShade(): string {
  const index = Math.floor(Math.random() * blueShades.length);
  return blueShades[index];
}
