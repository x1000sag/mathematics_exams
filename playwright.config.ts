import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4179',
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://127.0.0.1:4179/mathematics_exams/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})