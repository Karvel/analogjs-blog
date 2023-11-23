---
title: Time For A Change
author: Elanna Grossman
date: 2023-11-23T03:23:49.238Z
description: I recently decided to switch my website from Wordpress to Analog, a meta framework for Angular.
canonical_url: https://elanna.me/2023/11/time-for-a-change
cover_image: https://live.staticflickr.com/65535/52270701195_32302b3ede_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://www.flickr.com/photos/jadeilyn/52270701195
cover_image_title: Light House Fog
category: development
tags: development,angular,analogjs, wordpress,markdown
slug: time-for-a-change
published: true
---

## Hapax Legomenon 3.0

This is the third version of this site. I started the original site in 2014, built in Wordpress. I revamped the content and theme and started learning the Wordpress ecosystem better in 2015. The second version was good enough to suit my needs for years, even though I haven't worked much in Wordpress professionally. However, my Wordpress theme has been unsupported for a while and recently broke, which was enough of a motivator to redo this site.

I had been thinking about redoing my website in something other than Wordpress for a while. Wordpress was definitely a good choice for this site originally, since I was new to web development and I appreciated the batteries-included nature. However, I don't develop much in PHP or Wordpress, and haven't kept up with the ecosystem much in the past couple of years. The Gutenberg block system might make sense for creating a number of different kinds of pages, but I did not enjoy using it for blog posts, which is the primary focus of my site.

I had looked at various Jamstack and SSG tools, especially ones built around writing content in Markdown. I don't find myself using full word processors very often anymore, and Markdown is a sweet spot between simplicity and versatility. For this site, I don't need a back-end. I don't need to have user accounts or comments (dev.to works for that), and the majority of the images I link are hosted on my <a href="https://www.flickr.com/photos/jadeilyn/" target="_blank" rel="noopener">flickr</a> (I'd figure out a contingency if flicker ever goes down). As a result, I wanted to make a simple site that could be deployed statically to something like GitHub Pages.

I value portability in websites so I don't get stuck in a particular ecosystem. I used to have Geocities and LiveJournal sites many years ago, and I haven't liked the direction that Medium has taken in the past few years. I do re-post articles from my site my <a href="https://dev.to/karvel" target="_blank" rel="noopener">dev.to</a>, but I maintain my site as the canonical source. I had only recently heard of Analog when my Wordpress site started having problems, so I decided to check it out.

## Enter Analog

<a href="https://analogjs.org/" target="_blank" rel="noopener">Analog</a> is a meta framework for Angular, like Next.js is for React and Nuxt is for Vue. This means that while most of tooling is pure Angular, it adds some extra features like markdown rendering, file-based routing, SSG support, RSS support, what seems to be more reliable a SSR implementation (my historical experience with the official Angular Universal was a mixed bag), along with some other benefits. It also uses Vite instead of Webpack, and Vitest instead of Jasmine or Jest.

It's a new framework, and not fully finished, so I spent some time making a sandbox site to see if it would suit my needs. I am not using all of its features, but I have been enjoying it a lot so far. I am using it for this site, which is a personal site and blog. I'm not sure if I would use it for a client project until it's more mature, but I haven't run into any real issues yet. The biggest issue is that the app sometimes caches when making changes locally, but reloading in a private window fixes that.

While I wish that the main support infrastructure was something like a forum instead of Discord (since Discord is a closed ecosystem and can't be searched externally), the community has been very welcoming and helpful. Since Analog is quite new, it doesn't have a large template or plugin ecosystem but that hasn't been a big deal.

I plan on writing a follow-up article going into more technical detail about how I set up this site, but I wanted to write a more general overview of my experience with Analog so far. I'm looking forward to seeing how it evolves.
