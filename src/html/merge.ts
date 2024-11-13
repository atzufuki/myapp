export function merge(...objects: any[]) {
  const isTruthy = (item: any) => !!item;
  const prepped = (objects as any[]).filter(isTruthy);

  if (prepped.length === 0) {
    return;
  }

  return prepped.reduce((result, current) => {
    Object.entries(current).forEach(([key, value]) => {
      if (typeof value === 'object') {
        result[key] = merge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    });
    return result;
  });
}
