type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type RequiredProperties<T, P extends keyof T> = T & Required<RequiredNotNull<Pick<T, P>>>;
type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RemoveProperties<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export { type RequiredProperties, type OptionalProperties, type RemoveProperties };
