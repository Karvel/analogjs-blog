import { Category } from '@constants/category';
import { getCategoryFromLabel } from './get-category-from-label';

export const getColors = (label: Category | string | undefined): string => {
  const category = getCategoryFromLabel(label);
  switch (category) {
    case 'development':
      return 'dark:bg-blue-900 bg-blue-200 dark:hover:bg-blue-200 hover:bg-blue-900 dark:text-blue-200 text-blue-900 dark:hover:text-blue-900 hover:text-blue-200';
    case 'photography':
      return 'dark:bg-emerald-900 bg-emerald-200 dark:hover:bg-emerald-200 hover:bg-emerald-900 dark:text-emerald-200 text-emerald-900 dark:hover:text-emerald-900 hover:text-emerald-200';
    case 'miscellaneous':
      return 'dark:bg-rose-900 bg-rose-200 dark:hover:bg-rose-200 hover:bg-rose-900 dark:text-rose-200 text-rose-900 dark:hover:text-rose-900 hover:text-rose-200';
    case '':
    default:
      return 'dark:bg-neutral-700 bg-neutral-500 dark:hover:bg-neutral-500 hover:bg-neutral-700 dark:text-white text-white dark:hover:text-white hover:text-white';
  }
};
