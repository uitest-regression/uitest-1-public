import { expect, type Locator, type Page } from '@playwright/test';

export class NavBar {
  readonly root: Locator;
  readonly userMenu: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('navigation', { name: 'Main' });
    this.userMenu = this.root.getByRole('button', { name: 'User menu' });
  }

  async goTo(linkName: string) {
    await this.root.getByRole('link', { name: linkName }).click();
  }

  async openUserMenu() {
    await this.userMenu.click();
    await expect(this.page.getByRole('menu')).toBeVisible();
  }

  async signOut() {
    await this.openUserMenu();
    await this.page.getByRole('menuitem', { name: 'Sign out' }).click();
  }
}
