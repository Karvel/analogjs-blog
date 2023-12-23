---
title: "Time for a Change: Switching to Analog"
author: Elanna Grossman
date: 2023-11-25T21:07:53.149Z
description: I recently decided to switch my website from WordPress to Analog, a meta framework for Angular.
canonical_url: https://elanna.me/2023/11/time-for-a-change-switching-to-analog
cover_image: https://live.staticflickr.com/65535/52270701195_32302b3ede_c.jpg
cover_image_author: Elanna Grossman
cover_image_source: https://www.flickr.com/photos/jadeilyn/52270701195
cover_image_title: Light House Fog
category: development
tags: development,angular,analogjs, wordpress,markdown
slug: time-for-a-change-switching-to-analog
published: true
---

## Hapax Legomenon 3.0

This is the third version of this site. I started the original site in 2014, built in WordPress. I revamped the content and theme and started learning the WordPress ecosystem better in 2015. The second version was good enough to suit my needs for years. However, my end-of-life WordPress theme recently broke. That was enough of a motivator to redo this site. What follows is an exploration of why I decided that switching to Analog was the right choice.

I had been thinking about redoing my website in something other than WordPress for a while. WordPress was definitely a good choice for this site originally. I was new to web development and I appreciated the batteries-included nature. However, I don't develop much in PHP or WordPress, and haven't kept up with the ecosystem much recently. I did not enjoy using Gutenberg block system for blog posts, which is the primary focus of my site.

## The Use Case

I had looked at various Jamstack and SSG tools, especially ones built around writing content in Markdown. I don't find myself using full word processors much anymore, and Markdown is a sweet spot between simplicity and versatility. For this site, I don't need a back-end. I don't need to have user accounts or comments (<a href="https://dev.to/karvel" target="_blank" rel="noopener">dev.to</a> works for that), and I host the majority of the images I link on my <a href="https://www.flickr.com/photos/jadeilyn/" target="_blank" rel="noopener">flickr</a> (I'd figure out a contingency if flicker ever goes down). As a result, I wanted to make a simple site that I could deploy statically to something like GitHub Pages. I also wanted to retain RSS functionality, as one of the vanishing few who still use it.

I value portability in websites because I don't want to be stuck in a particular ecosystem. I haven't liked the direction that Medium has taken in the past few years. While I do re-post articles from my site my dev.to, I maintain my site as the canonical source. I had only recently heard of Analog when my WordPress site started having problems, so I decided to check it out.

## Enter Analog

<a href="https://analogjs.org/" target="_blank" rel="noopener">Analog</a> is a meta framework for Angular, like Next.js is for React and Nuxt is for Vue. This means that while most of tooling is pure Angular, it adds some extra features like markdown rendering, file-based routing, SSG support, RSS support, what seems to be more reliable a SSR implementation (my historical experience with the official Angular Universal was a mixed bag), along with some other benefits. It also uses Vite instead of Webpack, and Vitest instead of Jasmine or Jest.

It's a new framework, and not fully finished, so I spent some time making a sandbox site to see if it would suit my needs. I am not using all of its features, but I have been enjoying it a lot so far. I am using it for this site, which is a personal site and blog. I'm not sure if I would use it for a client project until it's more mature, but I haven't run into any real issues yet. The biggest issue I've found is that the app sometimes caches while developing locally, but reloading in a private window fixes that.

While I wish that the main support infrastructure used something like a forum instead of Discord (since Discord is a closed ecosystem and can't be searched externally), I find the community very welcoming and helpful. As Analog is quite new, it doesn't have a large template or plugin ecosystem yet.

I wrote a follow-up post on <a href="blog/2023/12/how-i-switched-my-website-to-analog">how I made the switch</a>, but I wanted to write a more general overview of my experience with switching to Analog so far and why I chose it. I'm looking forward to seeing how it evolves.
