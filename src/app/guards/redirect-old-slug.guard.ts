import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { injectContentFiles } from '@analogjs/content';

import { BlogPost } from '@models/post';
import { getMonth } from '@utils/get-month';
import { getYear } from '@utils/get-year';
import { splitValuesOnSlash } from '@utils/split-values-on-slash';

/**
 * Redirect post links from the old Wordpress site to the Analog path structure
 */
export const redirectOldSlugGuard: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  if (state?.url) {
    const pathFragments = splitValuesOnSlash(state.url);
    if (
      pathFragments?.length === 3 &&
      pathFragments.every((element) => !!element)
    ) {
      const [year, month, slug] = pathFragments;
      const posts = injectContentFiles<BlogPost>((mdFile) =>
        mdFile.filename.includes('/src/content/posts'),
      );
      const matchingPost = posts.find(
        (post) =>
          post.slug === slug &&
          getYear(post.attributes.date) === year &&
          getMonth(post.attributes.date) === month,
      );
      if (matchingPost) {
        const path = `/blog/${year}/${month}/${slug}`;

        return router.createUrlTree([path]);
      }
    }
  }

  return true;
};
