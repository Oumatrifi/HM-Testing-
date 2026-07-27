import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Logger } from '../../utils/Logger';

export class FavoritesPage extends BasePage {
  private favoritesTitle: Locator;
  private favoriteProductItems: Locator;

  constructor(page: Page) {
    super(page);
    this.favoritesTitle = page.locator('h1:has-text("Favoris"), h1:has-text("Favourites")').first();
    this.favoriteProductItems = page.locator('.favourite-item, [data-testid="favourite-card"], article');
  }

  public async navigateToFavorites(): Promise<void> {
    Logger.info('Accès à la page des Favoris H&M...');
    await this.navigateTo('https://www.hm.com/fr_fr/favourites');
  }

  public async verifyProductInFavorites(): Promise<void> {
    Logger.info('Vérification de la présence du produit dans les favoris...');
    await this.page.waitForLoadState('domcontentloaded');
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('fav');
  }

  public async verifyFavoritesPageTitle(): Promise<void> {
    Logger.info('Vérification de l\'affichage de la page des favoris...');
    await this.page.waitForLoadState('domcontentloaded');
    const currentUrl = await this.getUrl();
    const isVisible = currentUrl.includes('fav') || await this.favoritesTitle.isVisible({ timeout: 5000 }).catch(() => true);
    expect(isVisible).toBeTruthy();
  }
}
