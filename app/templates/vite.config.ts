/// <reference types="vitest" />
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import copy from 'rollup-plugin-copy';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/deliveries/',

    build: {
      assetsDir: env.VITE_RELEASE_VERSION ? `${env.VITE_RELEASE_VERSION}/assets` : 'assets',

      // sourcemaps spike memory and fail CI builds. Add `NODE_OPTIONS: --max_old_space_size=8192`
      // to increase memory for node in CI so it doesn't fail.
      // @see https://github.com/vitejs/vite/issues/2433#issuecomment-1189518561
      sourcemap: true,
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@leaflink/stash/styles/core";`,
        },
      },
    },

    optimizeDeps: {
      include: ['fuzzysort', 'date-fns-tz'],
    },

    plugins: [
      vue(),
      vueJsx(),
      svgLoader({ svgo: false }),
      copy({
        targets: [
          {
            src: path.resolve(__dirname, 'node_modules/@leaflink/stash/assets/spritesheet.svg'),
            dest: 'public/static',
          },
          {
            src: path.resolve(__dirname, 'node_modules/@leaflink/stash/assets/illustrations'),
            dest: 'public/static',
          },
        ],
        hook: 'buildStart',
      }),
      visualizer({ template: 'raw-data' }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@tests': fileURLToPath(new URL('./tests', import.meta.url)),
        '@api': fileURLToPath(new URL('./api', import.meta.url)),
        // https://github.com/testing-library/vue-testing-library/issues/279#issuecomment-1336396037
        '@vue/test-utils': '/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
      },
    },

    server: {
      port: 5174,

      // Todo: Stop hot reloading when test files update, but when adding `'**/*.spec.ts'`,
      // Vitest ALSO ignores changes in tests for re-running tests which is not desired.
      watch: {
        ignored: ['api/**'],
      },
    },

    test: {
      coverage: {
        provider: 'v8',
        reporter: env.CI ? 'lcov' : ['html', 'text'],
      },
      globals: true,
      globalSetup: 'node_modules/@leaflink/dom-testing-utils/dist/global-setup.js',
      setupFiles: ['tests/setup-env.js', 'node_modules/@leaflink/dom-testing-utils/dist/setup-env.js'],
      environment: 'jsdom',
    },
  };
});
