export const standardLocalDate = (date: string, local: string) => {
  return new Date(date).toLocaleDateString(local);
};
