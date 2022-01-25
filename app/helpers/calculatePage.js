export const calculatePage = (pageNumber, pageSize) => {
  if (pageNumber === undefined) {
    pageNumber = 1;
  }

  const amount = pageNumber - 1;

  return amount * pageSize;
};
