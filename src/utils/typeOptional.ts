/**
 * Type helper for making certain fields of an object optional. This is helpful
 * for creating the `CreationAttributes` from your `Attributes` for a Model.
 */
 export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
