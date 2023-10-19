# Contributing to <%= vueAppName %>-web

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Pull Requests](#pull-requests)
- [Semantic Release](#semantic-release)
  - [Commit Conventions](#commit-conventions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Pull Requests

- Always work on a new branch.
- Bug fixes should be submitted to the `main` branch.
- Branch names should include the Jira task identifier (for example,
  `KIEF-205-<%= vueAppName %>-web-documentation`) to enable Jira/Github integration.

## Semantic Release

This repo leverages
[`semantic-release`](https://semantic-release.gitbook.io/semantic-release/).
This automates the whole package release workflow including: determining the
next version number, generating the release notes and publishing the package.

This removes the immediate connection between human emotions and version
numbers, strictly following the [Semantic Versioning](http://semver.org/)
specification.

- Fully **automated** releases, no human intervention needed.
- Developers only need to worry about the changes in their own code and learning
  how to structure their commit messages a little bit differently using
  "conventional commits". They don't need to analyze the commit history
  themselves and dictate version bumps
- Enforces [Semantic Versioning](https://semver.org/) specification.
- Enforces good git practices!
- New features and fixes are immediately available to users
- Use formalized commit message convention to document changes in the codebase
- Publish on different distribution channels (such as
  [npm dist-tags](https://docs.npmjs.com/cli/dist-tag)) based on git merges
- Avoid potential errors associated with manual releases

### Commit Conventions

`semantic-release` uses the commit messages to determine the type of changes in
the codebase. Following
[formalized conventions for commit messages](https://www.conventionalcommits.org/en/v1.0.0/),
`semantic-release` automatically determines the next semantic version number,
generates a changelog and publishes the release.

- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `chore`: Changes to the build process or auxiliary tools and libraries
  (example scopes: gulp, broccoli, npm)
- `revert`: If the commit reverts a previous commit, it should begin with
  `revert: `
- `docs`: Documentation only changes
- `style`: Changes that dont affect the meaning of the code (white-space,
  formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing or correcting existing tests
- `ci`: Changes to our CI configuration files and scripts (example scopes:
  Travis, Circle, BrowserStack, SauceLabs)

> 💡 **ONLY** `feat`, `fix`, `revert` and `perf` will cut releases by default...
> the rest will just show up on future release changelogs but will not trigger a
> release on their own because they don't effect the application.
