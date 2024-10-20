import { getType } from '~/utils/getType';

export function getObjectField(item: Record<string, any>, query: string | string[]): any {
  const type = getType(item);
  if (type !== 'Object') return;

  const queryType = getType(query);
  let queryParts: string[] = [];

  if (queryType !== 'String' && queryType !== 'Array') {
    return;
  } else if (queryType === 'String') {
    queryParts = (query as string).split('.');
  } else if (queryType === 'Array') {
    queryParts = query as string[];
  }

  if (queryParts.length < 2) return item[queryParts[0]];

  return getObjectField(item[queryParts[0]], queryParts.slice(1));
}