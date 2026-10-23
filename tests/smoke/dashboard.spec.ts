import { expect, test } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Widgets load via parallel requests; wait for the network to settle
    // instead of a fixed sleep so the Refresh button is reliably present.
    await page.waitForLoadState('networkidle');
  });

  test('renders the three summary widgets', async ({ page }) => {
    for (const name of ['Protected Objects', 'Recent Activity', 'Alerts']) {
      await expect(page.getByRole('region', { name })).toBeVisible();
    }
  });

  test('refresh reloads widget data', async ({ page }) => {
    const activity = page.getByRole('region', { name: 'Recent Activity' });
    const before = await activity.getByTestId('last-updated').textContent();

    await page.getByRole('button', { name: 'Refresh' }).click();
    await page.waitForLoadState('networkidle');

    await expect(activity.getByTestId('last-updated')).not.toHaveText(before ?? '');
  });

  test('settings page save button stays reachable at 900px', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 700 });
    await page.goto('/settings/profile');

    const save = page.getByRole('button', { name: 'Save' });
    await save.scrollIntoViewIfNeeded();
    await expect(save).toBeInViewport();
  });
});
