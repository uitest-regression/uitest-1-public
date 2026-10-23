# uitest-1-public

UI regression tests, written with [Playwright](https://playwright.dev/).

## Prerequisites

- Node.js 20+
- A running instance of the app under test (defaults to `http://localhost:3000`)

## Install

```bash
npm install
npx playwright install chromium
```

## Run

```bash
# whole suite
npx playwright test

# one spec
npx playwright test tests/smoke/login.spec.ts

# headed, for debugging
npx playwright test --headed
```

Set `BASE_URL` to point at a different environment:

```bash
BASE_URL=https://staging.example.com npx playwright test
```

## Reports

- Console: list reporter
- HTML: `playwright-report/` — open with `npx playwright show-report`
- Traces and screenshots for failures land in `test-results/`

## Layout

```
tests/
  smoke/        fast checks run on every PR
pages/          page objects shared across specs (see #3)
playwright.config.ts
```
