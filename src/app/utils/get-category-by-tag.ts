import { Category } from '@constants/category';
import { categoryToTagsMap } from '@constants/category-to-tags-map';

export const getCategoryByTag = (tag: string = ''): Category => {
  const lowerCaseTag = tag.toLowerCase();

  for (const category in categoryToTagsMap) {
    if (
      categoryToTagsMap[category as Category].includes(lowerCaseTag) ||
      lowerCaseTag === category
    ) {
      return category as Category;
    }
  }

  return '';
};
