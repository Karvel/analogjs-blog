/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tsconfigPaths from 'vite-tsconfig-paths';

import {
  getBlogArchives,
  getBlogCategories,
  getBlogPosts,
  getBlogTags,
} from './vite.prerender.utils';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      nitro: {
        preset: 'github_pages',
      },
      prerender: {
        routes: async () => [
          '/',
          '/api/rss.xml',
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
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
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
