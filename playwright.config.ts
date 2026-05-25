import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  webServer: {
    command: 'npm run start -- --port 4200',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: true,
    timeout: 120_000
  },
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
