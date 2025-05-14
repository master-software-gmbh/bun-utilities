export function forceSync<T>(run: () => Promise<T> | T): T {
  const result = run();

  if (result instanceof Promise) {
    throw new Error('Async function called in sync context');
  }

  return result;
}
