export const calculatePage = (pageNumber, pageSize) => {
  if (pageNumber === undefined) {
    return 1;
  }

  const amount = pageNumber - 1;

  return amount * pageSize;
};
