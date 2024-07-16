export const removeLeadingAndTrailingSlashes = (inputString: string): string =>
  inputString.replace(/^\/+|\/+$/g, '');
