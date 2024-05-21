export const toBoolean = (val: string): boolean | undefined | null => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null') return null;
  return undefined;
};
