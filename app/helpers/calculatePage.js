export const calculatePage = (pageNumber, pageSize) => {
    const amount = pageNumber - 1;

    return amount * pageSize; 
};