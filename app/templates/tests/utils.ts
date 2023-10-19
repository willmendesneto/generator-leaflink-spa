/* eslint-disable testing-library/no-node-access */
import { render, RenderOptions } from '@testing-library/vue';
import { Component } from 'vue';
import { createRouter, createWebHistory, RouteLocationRaw, Router } from 'vue-router';

import { routes } from '@/router';

/**
 * Helper method to create a vue router for tests.
 *
 * Note: If you need to push a default route on component render you can import this,
 * push the route you want, and then pass it as a param to the customRender as `router`.
 *
 * @returns {Router}
 */
export const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [...routes, { path: '/deliveries/', name: 'make-tests-happy', component: { template: 'foo' } }],
  });
};

export interface CustomRenderOptions extends RenderOptions {
  // Had to make this a partial of two types because we track the active company in two places bc we're smart
  router?: Router;
  initialRoute?: RouteLocationRaw;
}

/**
 * Custom render function to help pass in the default routes to testing-library
 * on render, along with any other shared plugins that our components need.
 *
 * @param Component - The valid Vue Component to be tested.
 * @param [options.router={}] - By default we're going to load a mock router.
 *                                      This will let you declare your own router in the test so that you can use the
 *                                      async router methods like push to set a default starting route
 * @param [options.props] - Props to pass to the component
 * @returns - A `container` element, along with all testing library queries scoped to that container.
 *                     VTL also returns a few helper methods from `render`, i.e. `rerender`.
 *                     Details: https://testing-library.com/docs/vue-testing-library/api#render-result
 */
export async function customRender(
  Component: Component,
  { router = createTestRouter(), initialRoute = '/', global = {}, ...options }: CustomRenderOptions = {},
) {
  // Fresh router for every render.
  // If you want to load up a default route, use createRouter in your test, push the route you want, and then pass in the router
  const customRouter = router;

  customRouter.push(initialRoute);
  await customRouter.isReady();

  const { plugins = [], ...globalOther } = global;

  return render(Component, {
    global: {
      plugins: [customRouter, ...plugins],
      ...globalOther,
    },
    ...options,
  });
}
