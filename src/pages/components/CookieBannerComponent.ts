import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Logger } from '../../utils/Logger';

export class CookieBannerComponent extends BasePage {
  private acceptAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.acceptAllButton = page.locator('#onetrust-accept-btn-handler, button:has-text("Tout accepter"), button:has-text("Accepter tous les cookies"), button:has-text("Accept all cookies")');
  }

  public async acceptCookiesIfPresent(): Promise<void> {
    try {
      const isVisible = await this.acceptAllButton.first().isVisible({ timeout: 5000 });
      if (isVisible) {
        Logger.info('Bannière de cookies détectée. Acceptation des cookies...');
        await this.acceptAllButton.first().click();
        await this.page.waitForTimeout(1000);
      } else {
        Logger.info('Aucune bannière de cookies affichée.');
      }
    } catch {
      Logger.info('Bannière de cookies non affichée ou déjà acceptée.');
    }
  }
}
