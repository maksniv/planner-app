export const errorCatch = (error: any): string => {

  if (!error?.response?.data?.message) return '';

  const message = error?.response?.data?.message;

  return message
    ? typeof error?.response?.data?.message === 'object'
      ? message[0]
      : message
    : error.message;
};
