import { defineConfig } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: { baseURL, screenshot: 'only-on-failure' },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run preview',
        port: 4173,
        reuseExistingServer: true,
      },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
