export const ErrorMessages = Object.freeze({
  METHOD_NOT_ALLOWED: "Request method is not allowed",
});

export const getErrorJSON = (key: keyof typeof ErrorMessages) => ({
  error: { code: key, message: ErrorMessages[key] },
});
