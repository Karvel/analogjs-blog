import { Category } from '@constants/category';
import { Theme } from '@models/theme';

export const getColors = (
  categoryOrTag: Category | string | undefined,
): Theme => {
  const category = getCategoryByTag(categoryOrTag);
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

const categoryToTagsMap: { [category in Category]: string[] } = {
  development: [
    'analogjs',
    'angular',
    'angular pipe',
    'cms',
    'codeeditor',
    'custom validator',
    'developer group',
    'form validation',
    'git',
    'google',
    'hirepalooza',
    'ide',
    'iwdc',
    'linux',
    'lithium hosting',
    'macos',
    'markdown',
    'osx',
    'pipe',
    'reactive forms',
    'rxjs',
    'tolocaleuppercase',
    'valley devfest',
    'wordpress',
  ],
  photography: ['portrait', 'landscape', 'wildlife'],
  miscellaneous: ['hello world', 'imposter syndrome'],
  '': [],
};

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
