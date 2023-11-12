import { isValidDate } from './is-valid-date';

export const getYear = (dateString: string | undefined): string => {
  return dateString && isValidDate(new Date(dateString))
    ? new Date(dateString ?? '').getFullYear()?.toString()
    : '';
};
