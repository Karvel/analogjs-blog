/**
 * Returns the name of the month based on the month index (1-index).
 */
export const getMonthName = (monthIndex: number): string => {
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (monthIndex >= 1 && monthIndex <= 12) {
    return months[monthIndex - 1];
  } else {
    return '';
  }
};
