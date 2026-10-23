import { expect, test } from '@playwright/test';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('renders username, password and sign-in controls', async ({ page }) => {
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('sign-in button is disabled until both fields are filled', async ({ page }) => {
    const signIn = page.getByRole('button', { name: 'Sign in' });
    await expect(signIn).toBeDisabled();

    await page.getByLabel('Username').fill('qa-user');
    await expect(signIn).toBeDisabled();

    await page.getByLabel('Password').fill('not-a-real-password');
    await expect(signIn).toBeEnabled();
  });

  test('shows an error toast on invalid credentials', async ({ page }) => {
    await page.getByLabel('Username').fill('qa-user');
    await page.getByLabel('Password').fill('wrong');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid username or password');
  });
});
