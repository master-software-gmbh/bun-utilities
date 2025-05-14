export interface Cache<T> {
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  set(key: string, value: T): Promise<void>;
  get(key: string): Promise<T | undefined>;
}
