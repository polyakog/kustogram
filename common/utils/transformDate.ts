export const transformDate = (date: string): string => {
  return date.split("-").reverse().join("-");
};
