import { removeLeadingAndTrailingSlashes } from './remove-leading-and-trailing-slashes';

export const splitValuesOnSlash = (inputString: string): string[] => {
  const normalizedInput = removeLeadingAndTrailingSlashes(inputString);
  return normalizedInput ? normalizedInput.split('/') : [];
};
