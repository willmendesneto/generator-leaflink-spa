# <%= vueAppName %>

[![Coverage Status](https://coveralls.io/repos/github/LeafLink/<%= vueAppName %>-web/badge.svg?t=5GiMjJ)](https://coveralls.io/github/LeafLink/<%= vueAppName %>-web)

> Micro-frontend for the <%= vueAppName %> application

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Quick Start](#quick-start)
- [Installation & Use](#installation--use)
  - [Local Banking Service](#local-banking-service)
  - [npm scripts](#npm-scripts)
  - [Configuration](#configuration)
  - [Adding New Development Packages](#adding-new-development-packages)
  - [Mock API](#mock-api)
  - [Make commands](#make-commands)
- [Testing](#testing)
  - [E2E Testing](#e2e-testing)
- [Git Hooks](#git-hooks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick Start

For frontend engineers looking to contribute to the project:

```sh
make npm-init
npm run dev
```

For non-fe-devs looking to run the app:

```sh
make init
```

Visit [http://localhost:5174/deliveries/](http://localhost:5174/deliveries/).

## Installation & Use

It's important to use the same version of node that we run in production and
other environments. To help devs manage this outside of Docker, it's recommended
you use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#zsh). This
repository includes a `.nvmrc` file to automate switching to the currently used
version of Node.

If you do not have `nvm`, it can be installed using `brew` (MacOS only) or with
the
[official install script](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
brew install nvm
```

Make sure to follow the steps given after installation so nvm loads properly in
every shell session. Run `nvm use` to load the Node version specified in the
`.nvmrc`.

> **Note**: Calling `nvm use` _automatically_ in a directory with a `.nvmrc`
> file requires an extra step: https://github.com/nvm-sh/nvm#zsh. If you don't
> do this, just be sure to run `nvm use` in the project directory.

### npm scripts

Most operations are run using `npm run` and are defined in `package.json`. Check
out the available scripts with `npm run`.

A couple commonly used commands are:

- `npm run dev` will start the app using `vite`'s dev server on port `9000` with
  hot reloading.
- `npm run lint` will lint all vue/js files with eslint & lint css with
  `stylelint`.
- `npm run fix` will lint all files and autofix.
- `npm run lint:commits` runs the `commitlint` utility to enforce conventional
  commits.
- `npm test <file>` when we want to run a single spec during active development.
- `npm test` runs all unit and integration tests with Vitest. `--watch` is
  enabled by default and you can pass any other Vitest options to this script
  that you'd like.

### Configuration

Environment-level build options are set in `.env` files, with
environment-specific configs set in `.env.<environment>`. From Vite's
documentation:

> **Env Loading Priorities**: An env file for a specific mode (e.g.
> `.env.production`) will take higher priority than a generic one (e.g. `.env`).
> In addition, environment variables that already exist when Vite is executed
> have the highest priority and will not be overwritten by .env files. For
> example, when running `VITE_SOME_KEY=123` vite build. `.env` files are loaded
> at the start of Vite. Restart the server after making changes.

> **Important**: Loaded env variables are also exposed to your client source
> code via import.meta.env as strings. To prevent accidentally leaking env
> variables to the client, only variables prefixed with `VITE_` are exposed to
> your Vite-processed code. e.g. for the following env variables:
> `VITE_SOME_KEY=123` > `DB_PASSWORD=foobar` Only VITE_SOME_KEY will be exposed
> as import.meta.env.VITE_SOME_KEY to your client source code, but DB_PASSWORD
> will not.

For more information, see the
[official documentation](https://vitejs.dev/guide/env-and-mode.html)

### Adding New Development Packages

Need to upgrade [stash](https://github.com/leaflink/stash) or add a new
dependency? Nothing special here, just run:

```sh
npm install --save[-dev] <package>
```

The most important thing to remember is you **must be running the correct
version** of `node` and `npm` when installing dependencies. Otherwise the
lockfile will conflict with the version of node we run in our preview &
production environments. If you are using `nvm` to ensure the correct node
version and were able to `npm ci`, you should not have any issues.

### Mock API - Backend needs to be updated to marketplace

We've got a [mock api](./api/) set up using a tool called [`json-server`](https://github.com/typicode/json-server). You can start the mock API through Docker by running:

```sh
docker-compose up api
```

You can visit <http://localhost:9999>. If you use `dotdocker`, you can also visit <http://mock-<%= vueAppName %>-service.docker> to see the API.

### Make commands

Most operations can also be run using `make` and are defined in the `Makefile`.
We follow the common conventions for make commands found across most LLP
applications.

A couple commonly used commands are:

- `make init` initializes the local env, installs dependencies, and builds all
  containers.
- `make lint` and `make test` run linting & tests, respectively
- `make start` starts all containers in the background

Check out all available commands with `make help`.

## Testing

To run tests, there's multiple npm scripts available to you:

- `npm test` - Run all tests in watch mode.
- `npm test <file>` - Run matching spec files quickly and watch for changes.
- `npm run test:ci` - Run tests and generate coverage. Used in CI, but nothing
  stoping you from using it locally if you want to run with coverage.

They all run Vitest but are typically used at different times becuase of the
default Vitest options we're passing them inside of the npm script. All of them
allow you to pass any additional Vitest cli options that you'd like, i.e.
`npm run test:unit -- --silent`.

Testing Library truncates the output from tests, which can cut off large DOM
elements logged to the console. This limit can be adjusted with the
`DEBUG_PRINT_LIMIT` environment variable, which can be set either when running
tests (`DEBUG_PRINT_LIMIT=100000 npm run test`) or added to your shell's profile
(`export DEBUG_PRINT_LIMIT=100000`) to make it the default. For more on
debugging with Testing Library, see
[official documentation](https://testing-library.com/docs/dom-testing-library/api-debugging).

### E2E Testing

To run e2e tests, there are two npm scripts available:

- `npm run cypress` This will run all tests in a headless browser and you will
  see the output in your command line. More information about this process can
  be found in the Cypress documentation for
  [cypress run](https://docs.cypress.io/guides/guides/module-api#cypress-run)
- `npm run cypress:dev` This will show a list of compatible browsers Cypress
  found on your system and run the test on the Launched browser. More
  information about this process can be found in the Cypress documentation for
  [cypress open](https://docs.cypress.io/guides/guides/module-api#cypress-open)

For more information about cypress use go to
[cypress/README](/cypress/README.md).

## Git Hooks

We use [Husky](https://typicode.github.io/husky/) and
[lint-staged](https://github.com/okonet/lint-staged) to execute scripts when you
take certain actions with git.

Although not recommended, you can bypass hooks permantly by setting the `HUSKY`
environment variable to `0`.

If you want to skip hooks on a single commit, use the `--no-verify` option.

```sh
git commit --am --no-verify 'message'
```
