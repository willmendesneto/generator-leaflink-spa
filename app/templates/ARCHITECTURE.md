# <%= vueAppName %>-web Architecture Overview

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [Component Library & Design System](#component-library--design-system)
- [Testing](#testing)
  - [Non-vue tests](#non-vue-tests)
- [Repository Structure](#repository-structure)
  - [`provisioning`](#provisioning)
  - [`bin`](#bin)
  - [`.github`](#github)
  - [`public`](#public)
  - [`src`](#src)
  - [`cypress`](#cypress)
- [Code Structure](#code-structure)
  - [`src/main.ts`](#srcmaints)
  - [`src/App.vue`](#srcappvue)
  - [`src/router`](#srcrouter)
  - [`src/services`](#srcservices)
  - [`src/services/auth.ts`](#srcservicesauthts)
  - [`src/services/api/index.ts`](#srcservicesapiindexts)
  - [`src/stores`](#srcstores)
  - [`src/views`](#srcviews)
- [Analytics](#analytics)
- [Alerting](#alerting)
- [GitHub Actions](#github-actions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

`<%= vueAppName %>-web` is a single page web application that serves as the frontend for
LeafLink's Web App is offering, implemented in Vue.js and Typescript.

## Component Library & Design System

[Stash](https://github.com/LeafLink/stash) is a component library that
implements [LeafLink design system](https://leaflink.github.io/stash/). The
library includes custom Vue components as well as a suite of JS & CSS utilities,
directives & more.

This library is a way for all FE applications to so that users experience a
single cohesive application, regardless of where the underlying code lives.
We're always looking for ways to contribute back to Stash, and we never want to
re-implement or fork away from the code that lives there.

## Testing

**Tests live as close to the code they are testing** as possible, and NOT in a
central location, i.e. a `tests` folder. The `tests/` directory is only used
for things like testing utilities, global test setup, fixtures, etc.

We use
[Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro/)
(VTL) for integration testing our components & views. Vue Testing Library
extends DOM Testing Library by adding APIs for working with Vue components. It
is built on top of `@vue/test-utils`, the official testing library for Vue.

For more information on testing strategy, see the
[Vue Testing Library](https://github.com/LeafLink/leaflink-info/blob/main/Product%20&%20Engineering/Engineering/Testing/vue-testing-library.md)
doc.

### Non-vue tests

Some app modules like services and utilities that are written in TS/JS, not Vue.
Those files also need to be unit and/or integration tested. Obviously we're not
using Vue Testing Library for those tests but we're still:

1. Using Vitest.
2. Putting tests as close to the code they are testing.

## Repository Structure

### `provisioning`

Infrastructure as code, DevOps things.

### `bin`

User scripts run during Make targets (i.e `make init`).

### `.github`

Stores our Actions CI scripts and configuration for the automated PR Labeller.

### `public`

Static assets that are copied into the production image and exposed directly at
the root of the application.

### `src`

The Vue application folder (router, pages, components, tests, etc.).

### `cypress`

Cypress E2E tests.

## Code Structure

We group application files by type and not by domain/feature. For instance,
rather than group all invoice files together, we group `views`, `services`, etc.

### `src/main.ts`

Main entry point for the application. Global services such as logging and auth
should be set up here, as well as anything else registered with `app.use`.

### `src/App.vue`

Main wrapper component for the application.

### `src/router`

Route definitions used by `vue-router`. Currently a single file, `index.ts`.
When more functionality is added, new routes can live in their own modules (for
example `src/router/accounts.ts`) that can be imported by the main router.

### `src/services`

Utilities that make calls to external services outside of the app (such as
authentication, analytics, etc). Any third-party client goes here.

### `src/services/auth.ts`

Helper methods for working with Auth0.

### `src/services/api/index.ts`

Shared singleton `axios` client instance. Customization of the shared client,
such as adding interceptors, should be done here.

### `src/stores`

Pinia stores for managing application state.

### `src/views`

Vue components that map to top-level views in the app (for example, a dashboard
for logged-in users).

## Analytics

Individual analytics services are defined in `src/services/analytics` and are
added to the shared analytics instance in `main.ts`. When adding a new service,
you'll need to include and implement the `AnalyticsService` interface from
`src/services/analytics/index.ts`. All methods are optional, and correspond to
events in the session lifecycle:

- `identify(id: string, userData: Record<string, any>)` - called on user login
- `track(data: Record<string, any>)` - custom tracking events, for Segment etc.
- `page(to: Record<string, any>)` - called whenever the route changes in the
  application
- `reset()` - called on user logout.

Currently in use:

- **Segment** - Used to capture and track customer/site data & interactions.
  Events are be routed to many different services in Segment, including
  FullStory. The Segment SDK is also responsible for loading client libraries
  for services it sends to.
- **Google Analytics** - Analytics is already tracked by Segment. there was a
  separate request to add gtag to the page to track referrals from a particular
  link in the commerce platform.
- **Zendesk** - Used to manage a help desk and provide ticketing support.

## Alerting

We use Sentry for our alerting infrastructure. On an alert event we will
receive:

- A Slack message with a link to the error
- An email with a link to the error

There is a variety of information included with the error like a full stack
trace and user activity before and after the error occurred.

## GitHub Actions

GitHub Actions is used as the CI runner. Workflows are found in the
`.github/workflows` folder.

- `delete-pr.yml` - deletes an existing PR environment, for housecleaning after
  merge
- `dependabot-auto-merge.yml` - merge workflow for Dependabot dependency updates
- `deploy.yml` - deploys to a specified environment
- `pr.yml` - creates and updates PR environment
- `quality-checks.yml` - runs quality checks, lints and validates
- `release.yml` - cuts a release version using semantic release
