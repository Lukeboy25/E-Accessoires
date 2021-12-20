export const calculatePage = (pageNumber) => {
    const amount = pageNumber - 1;

    return amount * 10; 
};