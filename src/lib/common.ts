export const convertToIST = (dateStr: string) => {
  const date = new Date(dateStr);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
  return new Date(date.getTime() + IST_OFFSET);
};
