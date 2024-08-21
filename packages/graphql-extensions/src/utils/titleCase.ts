export const titleCase = (str: string): string => {
  return str
    .replace(/_/g, ' ') // Replace underscores with spaces
    .toLowerCase() // Convert to lower case
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
