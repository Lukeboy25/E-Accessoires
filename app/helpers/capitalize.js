
export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeLastName = (string) => {
    const fullString = string.split(' ');

    if (fullString.length > 1) {
        const lastName = fullString.pop();

        return fullString.join(' ') + ' ' + capitalize(lastName);
    }

    return capitalize(string);
}