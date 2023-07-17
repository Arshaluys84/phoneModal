type LeafValue = string | (() => string);
type NonEmptyObject<T> = {
  readonly [K in keyof T]: T[K] extends object ? NonEmptyObject<T[K]> : T[K];
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends NonEmptyObject<T[K]> ? DeepReadonly<T[K]> : T[K];
};

export function typedFreeze<T>(obj: T): DeepReadonly<T> {
  const isLeaf = (value: unknown): value is LeafValue =>
    typeof value === 'string' || typeof value === 'function';

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      isLeaf(value)
       ? Object.defineProperty(obj, key, { value: Object.freeze(value) })
       : typedFreeze(value as NonEmptyObject<typeof value>);  
    }
  }

  return Object.freeze(obj) as DeepReadonly<T>;
}

