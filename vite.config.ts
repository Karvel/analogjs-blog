/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import {
  getBlogArchives,
  getBlogCategories,
  getBlogPosts,
  getBlogTags,
} from './vite.prerender.utils';
import {
  transformerCopyButton,
  transformerCreateCodeBlockHeader,
  transformerMeta,
} from './shiki.transformer.utils';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  publicDir: 'src/assets',
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      static: true,
      nitro: {
        preset: 'github_pages',
      },
      prerender: {
        routes: async () => [
          '/',
          '/api/feed.xml',
          '/about',
          '/blog',
          '/category',
          '/photos',
          '/tag',
          '/talks',
          ...getBlogPosts(),
          ...getBlogCategories(),
          ...getBlogTags(),
          ...getBlogArchives(),
        ],
        sitemap: {
          host: 'https://elanna.me/',
        },
      },
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            themes: {
              light: 'github-light-high-contrast',
              dark: 'github-dark-high-contrast',
            },
            transformers: [
              transformerMeta(),
              transformerCreateCodeBlockHeader(),
              transformerCopyButton(),
            ],
          },
        },
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['text', 'json', 'html', 'lcovonly'],
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
