export function omit<T, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  const newObj = { ...obj };

  for (const key of keys) {
    delete newObj[key];
  }

  return newObj as Omit<T, K>;
}
