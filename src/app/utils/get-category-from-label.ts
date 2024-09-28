import { Category } from '@constants/category';
import { categoryToTagsMap } from '@constants/category-to-tags-map';

export const getCategoryFromLabel = (label: string = ''): Category => {
  const lowerCaseLabel = label.toLowerCase();

  for (const category in categoryToTagsMap) {
    if (
      categoryToTagsMap[category as Category].includes(lowerCaseLabel) ||
      lowerCaseLabel === category
    ) {
      return category as Category;
    }
  }

  return '';
};
