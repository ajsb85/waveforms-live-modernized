import { expect, test } from '@playwright/test';

test('loads the WaveForms Live shell', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');
  await expect(page).toHaveTitle(/WaveForms Live/i);
  await expect(page.locator('app-root')).toBeVisible();
  await expect(page.locator('ion-nav')).toBeVisible();

  expect(errors).toEqual([]);
});
