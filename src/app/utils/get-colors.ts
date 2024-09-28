import { Category } from '@constants/category';
import { Theme } from '@models/theme';
import { getCategoryFromLabel } from './get-category-from-label';

export const getColors = (label: Category | string | undefined): Theme => {
  const category = getCategoryFromLabel(label);
  switch (category) {
    case 'development':
      return {
        dark: 'blue-900',
        light: 'blue-200',
      };
    case 'photography':
      return {
        dark: 'emerald-900',
        light: 'emerald-200',
      };
    case 'miscellaneous':
      return {
        dark: 'rose-900',
        light: 'rose-200',
      };
    case '':
    default:
      return {
        dark: 'neutral-700',
        light: 'neutral-500',
        text: 'white',
      };
  }
};
