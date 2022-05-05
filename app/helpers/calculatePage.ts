export const calculatePage = (pageNumber: number, pageSize: number) => {
  if (pageNumber === undefined) {
    return 1;
  }

  const amount = pageNumber - 1;

  return amount * pageSize;
};
