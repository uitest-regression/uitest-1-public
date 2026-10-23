import { defineConfig, devices } from '@playwright/test';

const allProjects = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

// Local runs default to Chromium for fast feedback; CI runs every project.
const projects = process.env.CI
  ? allProjects
  : allProjects.filter((p) => p.name === (process.env.PW_PROJECT ?? 'chromium'));

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects,
});
