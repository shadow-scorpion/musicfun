export const trimToMaxLength = (response: string, maxLength = 100) => {
  return response.length > maxLength ? response.substring(0, maxLength) + '...' : response;
};
