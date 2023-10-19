import { createMockApiUtils } from '@leaflink/dom-testing-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

/**
 * Higher order function to prepend the base api url to a given path/route.
 *
 * Note: Recommended approach when mocking API requests with msw.
 *
 * @see {@link https://github.com/mswjs/msw/issues/397#issuecomment-751230924}
 *
 * @param {string} path - API path, i.e. `/applications/`
 * @returns {string} - Full API URL, i.e. `http://localhost:5001/api/v1/applications/`
 */
export const apiURL = (path) => `${import.meta.env.VITE_API_URL}${path}`;

/**
 * Higher order function to wrap a "collection" of supposed API results in an
 * envelope that mimics our current API.
 *
 * @param {object[]} results - Array of objects, each theoretically representing some API resource.
 * @returns {object} - Typical llf-api response object for a collection route.
 */
export const apiCollection = (results: Array<{ [k: string]: unknown }>) => ({
  count: results.length,
  next: null,
  previous: null,
  results,
});

/**
 * Higher order function to return an API error response that mimics our current API.
 *
 * @param {object} [attributes] - The different attributes of the error.
 * @param {string|number} [attributes.status] - Error status code.
 * @param {string} [attributes.title] - Error title.
 * @param {string} [attributes.detail] - Error message detail.
 * @param {string} [attributes.source] - Error message field.
 * @param {Error} [err] - Actual Error to generate the stack trace from
 * @returns {object} - API Error response object.
 */
export const apiError = (
  { status, title, detail, source }: { status?: string; title?: string; detail?: string; source?: string } = {},
  err?,
) => ({
  errors: [
    {
      status: status ?? 400,
      title: title ?? 'Bad request',
      detail,
      source: source ?? null,
      trace: err ? err.stack : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
  ],
});

/**
 * Default API mocks for every test. They can be overidden on a entire test
 * file basis (in `beforeEach`) or on a single test-by-test basis.
 */
export const handlers = [
  rest.post(apiURL('/me'), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  // @todo
  // We can add any common routes here and even leverage fixtures in the responses
];

// Setup default requests interception using the default handlers.
const server = setupServer();

// i.e. mockGetData, mockGetEndpoint, mockPatchData, mockPostData, etc.
// See https://github.com/LeafLink/dom-testing-utils#mocking-endpoints
const {
  mockGetData,
  mockPostData,
  mockPutData,
  mockDeleteData,
  mockPatchData,
  mockGetEndpoint,
  mockPostEndpoint,
  mockPutEndpoint,
  mockDeleteEndpoint,
  mockPatchEndpoint,
} = createMockApiUtils(server);

// re-export everything from msw for convenience
export * from 'msw';
export default server;
export {
  mockDeleteData,
  mockDeleteEndpoint,
  mockGetData,
  mockGetEndpoint,
  mockPatchData,
  mockPatchEndpoint,
  mockPostData,
  mockPostEndpoint,
  mockPutData,
  mockPutEndpoint,
};
