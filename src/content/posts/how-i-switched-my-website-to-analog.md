---
title: "How I Switched My Website to Analog"
author: Elanna Grossman
date: 2023-12-23T02:08:59.101Z
description: In this article I share technical exploration of how I switched my website to Analog.
canonical_url: https://elanna.me/2023/11/how-i-switched-my-website-to-analog
cover_image: https://live.staticFlickr.com/65535/52270210933_b2f9572e2f_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://www.Flickr.com/photos/jadeilyn/52270210933
cover_image_title: Light Towers
category: development
tags: development,angular,analogjs, wordpress,markdown,rxjs
slug: how-i-switched-my-website-to-analog
published: true
---

## Introduction

As I switched my website to Analog, I had to make some decisions. I wanted to migrate every post, and most of the other text content. Analog adds some very nice quality of life features to Angular, which is already a powerful batteries-included front end framework. My previous portfolio, however, is built in WordPress, which provides a lot of template options for making sites like portfolios or blogs. Analog does not have a large template ecosystem at the moment, so that meant that I would need to build a lot of blog and portfolio functionality from scratch. I still wanted to use Analog, because the markdown and file routing support promise minimal friction if I just want to write a new post.

## Planning

Once I knew what content I wanted to bring over and that I would have to build a lot of the site functionality myself, I looked at how my WordPress site is structured for inspiration and made lists for what features I wanted to keep vs discard:

* Keep
  * Homepage
  * About page
  * Blog
    * Blog index page
    * Blog post page
    * Categories
    * Tags
    * Previous/next post links
    * Archives
    * Filtering posts and route by year and year/month
  * RSS
* Discard
  * Accounts
  * Comments
* Nice to haves for later
  * Search (decided to implement a simple client side only version later)

This site is the canonical source for posts, but I currently repost them to <a href="https://dev.to/karvel" target="_blank" rel="noopener">dev.to</a>, which has account and comment support.

## New Features

In addition, I thought of new features I would want to have:

* Markdown support
* Photos page
  * Simple service that reaches out to the Flickr API to get some of my photos
* Talks page
  * Place to list any talks I have given
* Light/dark mode
  * Set by system preference initially
  * User toggle for light/dark mode - NYI

## Styling

I decided to use Tailwind CSS, both to become more familiar with it and because it seemed like a good fit. The Analog `create analog@latest` package template includes an option to generate a new project with Tailwind support from the start. It has been easy to build the site responsively with Tailwind, as it is designed around mobile-first layouts. I added the <a href="https://tailwindcss.com/docs/typography-plugin" target="_blank" rel="noopener">`@tailwindcss/typography`</a> plugin for some decent text styling defaults. The other default styles were useful, but I did customize the tailwind configuration slightly:

* Added a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/tailwind.config.js#L8" target="_blank" rel="noopener">text shadow effect</a>, which I adapted from this <a href="https://daily-dev-tips.com/posts/tailwind-css-drop-shadow-effect-for-png-images/" target="_blank" rel="noopener">article</a>
* Removed <a href="https://github.com/tailwindlabs/tailwindcss-typography/issues/18#issuecomment-1280797041" target="_blank" rel="noopener">showing the back ticks when styling text with a monospace font</a>

Tailwind is opinionated, but it isn't a full component framework. This site is simple enough that I didn't see the need to add any other CSS frameworks. I made UI elements from scratch, like the popover, which is built with content projection.

## Data Handling

I decided early on that this site would only have a client. The main reasons to have a back-end would be to support things like accounts, which I don't think I need. Since the majority of the routes interact with markdown files in some manner, I decided to use <a href="https://jekyllrb.com/docs/front-matter/" target="_blank" rel="noopener">front matter</a> as a pseudo-api. The front matter on a given markdown file has the title, route slug, and date. <a href="https://analogjs.org/docs/features/routing/content#using-the-content-files-list" target="_blank" rel="noopener">`injectContentFiles()`</a> and <a href="https://analogjs.org/docs/features/routing/content#using-the-analog-markdown-component" target="_blank" rel="noopener">`injectContent()`</a>  effectively became my `get()` and `getById()` methods. I made the following interface to interact with the front matter:

  ```ts
  export interface BlogPost {
    author?: string;
    category?: string;
    cover_image?: string;
    cover_image_author?: string;
    cover_image_source?: string;
    cover_image_title?: string;
    date?: string;
    description?: string;
    last_updated?: string;
    published?: boolean;
    slug?: string;
    tags?: string;
    title?: string | null;
  }
  ```

I did make a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/services/api/flickr.service.ts" target="_blank" rel="noopener">small API service</a> for Flickr, where I host my photos. Flickr does have a public API for this purpose. If I could no longer rely on Flickr, I would need to come up with an alternate solution.

## Other Priorities

### Accessibility

Accessibility is really important, and like a lot of things in web development, it is much easier to implement from the beginning rather than with a complete project. Aside from the usual considerations, I made sure that the site is fully navigable from the keyboard. While styling the site, I also spent time considering the contrast for the light and dark themes, and the syntax theme for Prism. I found a <a href="https://github.com/ericwbailey/a11y-syntax-highlighting" target="_blank" rel="noopener">set of prism themes</a> that are a11y compliant. I also tweaked the wrapping on the code blocks after <a href="https://whitep4nth3r.com/blog/how-to-make-your-code-blocks-accessible-on-your-website/" target="_blank" rel="noopener">following this guide</a>.

While the best accessibility testing comes using tools like screen readers directly, I have found these plug-ins very helpful:

* <a href="https://wave.webaim.org/" target="_blank" rel="noopener">WAVE Evaluation Tool</a>
  * Provides a simple audit of individual pages for accessibility concerns. Needs to be reloaded after navigating to a new route within a SPA. Available for Chrome, Firefox, and Edge.
* <a href="https://colourcontrast.cc/" target="_blank" rel="noopener">Color Contrast Checker</a>
  * Shows if color contrast is sufficient, at different standard sizes. It can help developers have a consistent flow if checking contrast in multiple browsers.

### SEO

I don't care a lot about SEO for this site, but I wanted to at least set meta tags including OG tags and have a sitemap. I made a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/vite.prerender.utils.ts" target="_blank" rel="noopener">set of utility methods</a> to dynamically build sitemap links for things like posts, categories, and tags.

The official <a href="https://www.opengraph.xyz/" target="_blank" rel="noopener">Open Graph tool</a> is very useful to confirm that the OG tags are working as expected.

## Building the Site

Since this is a personal project, I was okay with starting simple and seeing what my needs were. I don't think I'll need to implement NgRx in this project, for instance.

### Routing

My WordPress site had a blog route structure of `/:year/:month/:slug`. For this site, I decided to use <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/pages/blog/%5Byear%5D.%5Bmonth%5D.%5Bslug%5D.page.ts" target="_blank" rel="noopener">`/blog/:year/:month/:slug`</a>. I wanted to be able to navigate to either <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/pages/blog/%5Byear%5D.page.ts" target="_blank" rel="noopener">`/blog/:year`</a> or <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/pages/blog/%5Byear%5D.%5Bmonth%5D.page.ts" target="_blank" rel="noopener">`/blog/:year/:month`</a> and show posts that matched those parameters. The year and month are consumed from the `date` property in the front matter, so that the posts could control the routing programmatically. Under the hood, slug and file name are still the real unique identifiers, so I couldn't have two files with the same slug and different dates without additional work. I would implement that for a client project, but I think that will be fine for this site.

### Archive Component

I created a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/components/archive/archive.component.ts" target="_blank" rel="noopener">component</a> that traverses the provided list of posts and <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/utils/get-archive-links.ts" target="_blank" rel="noopener">creates an array</a> of labels and routes for years and months that have posts.

### Pills Component

The site supports both categories and tags for organizing content. I decided to create a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/components/pill/pill.component.ts" target="_blank" rel="noopener">generic pills component</a> for both. The tags are saved as a comma separated string, so I <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/utils/split-tag-string-into-array.ts" target="_blank" rel="noopener">split the string into an array</a>.

### Images

Between wanting to support cover images for blog posts, and showcase some of my photos, I knew I would need to support a lot of functionality for images.

#### Cover Images

In order to support cover images for posts, I added a number of properties to the front matter:

```ts
cover_image?: string;
cover_image_author?: string;
cover_image_source?: string;
cover_image_title?: string;
```

Some of these apply to the cover image directly, and I use some for the popover.

I used a version of this for the recent photo album component that I added to the home page.

#### Popover

For the post cover images, I wanted to provide an easy way to show the photo name, author, and link. I decided to use a popover for this. Since I needed to make one by hand, I decided to use content projection. I made a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/components/popover/popover.component.ts" target="_blank" rel="noopener">component with the responsibility of having the popover icon</a>, that would open a passed in <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/components/popover/image-info-popover-content.component.ts" target="_blank" rel="noopener">additional component as projected content</a>. I set the tab index on the popover icon so keyboards could navigate to it. This worked out nicely, and so I added it to the photos in the masonry grid also.

#### Masonry Grid

I have used Flickr for many years, and I have always liked the way that masonry grids look. I wanted to put some of my favorite photos on a page, where they would randomly load from a list into a masonry grid. My initial approach involved a directive, which felt too heavy for what I needed. I looked around for a CSS only solution, and found <a href="https://blog.logrocket.com/responsive-image-gallery-css-flexbox/" target="_blank" rel="noopener">this very useful article</a>. I tweaked the styling and ended up with <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/components/masonry-grid/masonry-grid.component.css" target="_blank" rel="noopener">these rules</a>.

#### Object Fit

After implementing the masonry grid, I styed the post and talk thumbnail images with `object-fit: cover` to <a href="https://github.com/Karvel/analogjs-blog/pull/92/files" target="_blank" rel="noopener">improve the flow of the cards</a>.

#### Broken Image Directive

I wanted a solution to help prevent image link rot. I added a <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/app/directives/replace-broken-image.directive.ts" target="_blank" rel="noopener">directive</a> that listens to the `onerror` event for the target element, which in this case is `img`. If it fires the `onerror` event, it replaces the broken image a fallback instead, which I host locally.

### Draft Functionality

I wanted to be able to support draft functionality, where a post would be hidden from routing if it didn't have `published: true`. Draft posts still support direct navigation. To support this, I had to add filters to the lists of posts, tags and categories, and the post navigation buttons. I also added a banner to a draft post to make it easier to distinguish.

### RSS

One of the nice features that Analog supports is RSS. I wanted to continue to provide an RSS feed, which is something that comes with WordPress sites by default. Right now, I have a rough implementation that I plan on expanding in the future: <a href="https://github.com/Karvel/analogjs-blog/blob/develop/src/server/routes/feed.xml.ts" target="_blank" rel="noopener">`feed.xml.ts`</a>.

## Static Site

As the same became usable, I started leaning toward building and deploying it as a static site. Static sites are very portable, which is important to me. I don't want to be stuck with a hosting service that I don't like because I can't easily switch. After evaluating the available options and my needs, I chose GitHub Pages for hosting. It is free for small scale sites, which this is. I was able to adapt the <a href="https://nitro.unjs.io/deploy/providers/github-pages/" target="_blank" rel="noopener">Nitro Github Action template</a> to build and deploy. I configured it to deploy when I push to the `main` branch.

There are limitations to static sites and hosting on GitHub Pages. If I wanted to have a back end, I would need to host it somewhere else. In order to make changes to the site, whether programmatic changes or adding a new post, I would need to commit to the GitHub repository. I don't have any kind of admin panel I could use to make changes from any web browser. I also need to build the site in order to deploy it. The build times are quick, but not instant.

For this site, none of these are deal breakers, but I wouldn't choose static sites for all use cases.

## Gotchas

Initially, I used the standard `/blog/:slug` route structure for individual posts. However, after I decided I wanted to preserve the `/blog/:year/:month/:slug` structure, I ran into an issue with how Angular deals with rerendering a component if only a route parameter value changes. If I navigated from one route structure to another, like `/blog` to `/blog/:year/:month/:slug`, the routing and rerendering worked as expected. However, if I only changed the `/blog/:year/:month/:slug` router params, like moving from one post to another using the navigation buttons, the route would update but the page would not rerender. This is intentional behavior in Angular. In order to get the behavior I wanted, I needed to <a href="https://github.com/Karvel/analogjs-blog/pull/88/files" target="_blank" rel="noopener">add listeners to the route parameters</a>.

## Conclusion

Recreating my site in Analog took me a while because I had less free time to work on it than I liked and kept finding things to add, but I am very happy with the results so far. I still have some polish to apply, and some new features I want to implement, but I now have a site where it's easy for me to just publish a new post. The site is easy to move to new hosting if I need to, and it doesn't require a lot of dependencies or resources to build.
