import '@testing-library/jest-dom';
import stash from '@leaflink/stash';
import { createTestingPinia } from '@pinia/testing';
import { QueryClient, VUE_QUERY_CLIENT } from '@tanstack/vue-query';
import { configure } from '@testing-library/vue';
import { config, flushPromises } from '@vue/test-utils';
import { vi } from 'vitest';

import server from './server';

configure({ testIdAttribute: 'data-test' });

config.global.plugins = [[stash, { googleMapsApiKey: 'my-key' }], createTestingPinia({ stubActions: false })];
config.global.provide = {
  [VUE_QUERY_CLIENT]: new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0, staleTime: 0, networkMode: 'online' },
    },
    // vue-query logs to the console per default. This is a way to override the default behavior
    // And remove noise from our tests. It's still failing, though
    // More details in https://stackoverflow.com/questions/66404728/how-do-i-suppress-expected-axios-error-messages-when-testing-error-states-with-r
    logger: {
      log: () => {},
      warn: () => {},
      // ✅ no more errors on the console
      error: () => {},
    },
  }),
};

vi.mock('@leaflink/snitch');
vi.mock('@/services/auth');
vi.mock('@/constants', async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    env: {
      MODE: 'test',
      NOTIFY_TIMEOUT: 1,
    },
  };
});

beforeAll(() => {
  window['alert'] = vi.fn();
  // Enable the mocking in tests.
  server.listen({
    onUnhandledRequest(req) {
      console.error('Found an unhandled %s request to %s', req.method, req.url.href);
    },
  });
});

// custom cleanup after each test
afterEach(async () => {
  await flushPromises();
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
