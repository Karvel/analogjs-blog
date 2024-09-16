# AnalogJS Blog

| Branch  | Status                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------- |
| develop | ![develop](https://github.com/Karvel/analogjs-blog/workflows/Build,%20Test,%20and%20Lint/badge.svg) |

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## Setup

Run `npm install` to install the application dependencies.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

## Test

Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).

## CI

This repo is configured for CI via a [Github Action Workflow](.github\workflows\build-and-test.yml). It builds the app, runs the linter, runs the tests, and outputs code coverage when the `develop` or `main` branches are updated.

## Deploy

There is a [Github Action Workflow](.github\workflows\deploy-to-github-pages.yml) that is configured to deploy the contents of `./dist/analog/public` to GitHub Pages when the `main` branch is updated.

## Prettier

This project uses [Prettier](https://prettier.io/) to enforce code style. There are [`.prettierrc`](.prettierrc) and [`.prettierignore`](.prettierignore) configuration files to adjust some options. Prettier is also wired up to a [pre-commit hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). This DOES slightly slow down git, as it runs the hook on staged files every time `git commit` is executed.

Prettier can be configured within [editors](https://prettier.io/docs/en/editors.html) so that it formats files on save, which helps minimize any changes the pre-commit hook would need to make.
