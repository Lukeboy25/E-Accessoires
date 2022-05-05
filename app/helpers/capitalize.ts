export const capitalize = (label: string) => label.charAt(0).toUpperCase() + label.slice(1);

export const capitalizeLastName = (fullName: string) => {
  const fullNameString = fullName.split(' ');

  if (fullNameString.length > 1) {
    const lastName = fullNameString.pop();

    return `${fullNameString.join(' ')} ${capitalize(lastName)}`;
  }

  return capitalize(fullName);
};
