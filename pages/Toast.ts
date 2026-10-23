import { expect, type Locator, type Page } from '@playwright/test';

export class Toast {
  readonly all: Locator;

  constructor(page: Page) {
    this.all = page.getByRole('alert');
  }

  async expectSuccess(text: string | RegExp) {
    await expect(this.all.filter({ hasText: text }).first()).toBeVisible();
  }

  async expectError(text: string | RegExp) {
    await expect(this.all.filter({ hasText: text }).first()).toBeVisible();
  }

  async dismissAll() {
    for (const close of await this.all.getByRole('button', { name: 'Close' }).all()) {
      await close.click();
    }
    await expect(this.all).toHaveCount(0);
  }
}
