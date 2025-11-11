import { ContentFile } from '@analogjs/content';

import { BlogPost } from '@models/post';

export const sortByDate = (
  a: ContentFile<BlogPost> | null | undefined,
  b: ContentFile<BlogPost> | null | undefined,
) => {
  if (!a && !b) {
    return 0; // Both are null or undefined, consider them equal
  } else if (!a) {
    return 1; // a is null or undefined, b comes first
  } else if (!b) {
    return -1; // b is null or undefined, a comes first
  }

  const dateA = a.attributes?.date ? new Date(a.attributes?.date) : null;
  const dateB = b.attributes?.date ? new Date(b.attributes?.date) : null;

  if (dateA && dateB) {
    return dateB.getTime() - dateA.getTime();
  } else if (dateA) {
    return -1;
  } else if (dateB) {
    return 1;
  } else {
    return 0;
  }
};
