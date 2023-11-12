import { isValidDate } from './is-valid-date';

export const getMonth = (dateString: string | undefined): string => {
  return dateString && isValidDate(new Date(dateString))
    ? (new Date(dateString ?? '').getMonth() + 1)?.toString()?.padStart(2, '0')
    : '';
};
