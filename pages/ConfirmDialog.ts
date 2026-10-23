import { expect, type Locator, type Page } from '@playwright/test';

export class ConfirmDialog {
  readonly root: Locator;

  constructor(page: Page) {
    this.root = page.getByRole('dialog');
  }

  async expectOpen(title?: string | RegExp) {
    await expect(this.root).toBeVisible();
    if (title) {
      await expect(this.root.getByRole('heading')).toHaveText(title);
    }
  }

  async confirm() {
    await this.root.getByRole('button', { name: 'Confirm' }).click();
    await expect(this.root).toBeHidden();
  }

  async cancel() {
    await this.root.getByRole('button', { name: 'Cancel' }).click();
    await expect(this.root).toBeHidden();
  }
}
