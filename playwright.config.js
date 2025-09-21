// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from "node:path";
// import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const junitDir  = process.env.JUNIT_DIR || 'test-results/junit'
const junitFile = path.join(junitDir, 'results.xml')

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: process.env.CI,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html',  { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: junitFile }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on',
    headless: !!process.env.CI,
  },
  timeout : 45*1000,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], slowMo: 500, storageState: 'auth.json',},
    },
  ],
  expect: {
    timeout: 30000
  }

});

