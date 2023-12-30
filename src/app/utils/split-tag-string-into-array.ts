import { Tag } from '@models/tag';

export const splitTagStringIntoTagArray = (
  tagString: string | undefined | null,
): Tag[] => {
  if (tagString === undefined || tagString === null) {
    return [];
  }

  const tagNameArray = tagString.split(',');
  const tagArray = tagNameArray
    .map((tagName) => tagName.trim())
    .filter((tagName) => tagName !== '') // Filter out empty tag names
    .map((tagName) => ({ name: tagName }));

  return tagArray;
};

export const splitTagStringIntoStringArray = (
  tagString: string | undefined | null,
): string[] => {
  if (tagString === undefined || tagString === null) {
    return [];
  }

  const tagNameArray = tagString.split(',');
  const tagArray = tagNameArray
    .map((tagName) => tagName.trim())
    .filter((tagName) => tagName !== ''); // Filter out empty tag names

  return tagArray;
};
