export function getType(item: unknown): string {
  if (typeof item === 'number' && isNaN(item)) return 'NaN';
  const match = ({}).toString.call(item).match(/\s([a-zA-Z]+)/);
  if (match === null) {
    return 'unknown';
  }
  return match[1];
}