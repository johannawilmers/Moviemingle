import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 3,
  e2e: {
    baseUrl: 'http://it2810-09.idi.ntnu.no/project2/',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
