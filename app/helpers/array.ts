export const retrieveUniqueValues = <T>(array: T[]): T[] => (
  Array.from(new Set(array))
);
