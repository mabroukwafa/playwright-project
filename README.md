# Valentino Magic Beans — Automated Tests

Automated tests built with [Playwright](https://playwright.dev/) and TypeScript for the Valentino's Magic Beans website and API.

## Prerequisites

- Node.js and npm
- A Playwright browser 

## Install

```bash
npm init playwright@latest
```

## Running the tests

Run the tests for the currently configured Playwright project:

```bash
npx playwright test --project=api-tests //api
npx playwright test
```

Run a specific API test file:

```bash
npx playwright test tests/api-tests/products.spec.ts
```

Open the HTML report after a test run:

```bash
npx playwright show-report
```

## Test suites

- **API** (`tests/api-tests/`): product retrieval and order creation.
- **UI** (`tests/e2e-ihm/`): sign-up, login, product browsing, and shopping cart flows.
- **Mocking** (`tests/mocking/`): API request interception and image resource blocking.

> **Current configuration:** 

## Project structure

```text
.
├── locators/            # Page selectors
├── pages/               # Playwright page objects
├── tests/
│   ├── api-tests/       # API tests
│   ├── e2e-ihm/         # End-to-end UI tests
│   └── mocking/         # Network interception and blocking tests
├── utils/               # Test configuration and utilities
├── package.json
└── playwright.config.ts
```

## Configuration and external services

The website and API URLs are defined in `playwright.config.ts` and `utils/envConfig.ts`. The sign-up flow also uses [Mail.tm](https://mail.tm/) to create a temporary inbox and retrieve the confirmation code.

Tests may contact external services. The order workflow sends an order-creation request to the configured API.
