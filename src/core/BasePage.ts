import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateTo(url: string): Promise<void> {
    Logger.info(`Navigation vers la page : ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  public async getTitle(): Promise<string> {
    return await this.page.title();
  }

  public async getUrl(): Promise<string> {
    return this.page.url();
  }

  public async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  public async clickElement(locator: Locator, description: string, force: boolean = false): Promise<void> {
    Logger.info(`Clic sur : ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded().catch(() => {});
    await locator.click({ force });
  }

  public async fillInput(locator: Locator, text: string, description: string): Promise<void> {
    Logger.info(`Saisie de "${text}" dans : ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  public async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  public async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    const text = await locator.textContent();
    return text ? text.trim() : '';
  }

  public async isElementVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  public async takeScreenshot(name: string): Promise<Buffer> {
    Logger.info(`Capture d'écran générée : ${name}`);
    return await this.page.screenshot({ fullPage: true });
  }
}
