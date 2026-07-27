import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../core/BasePage';

export class HeaderComponent extends BasePage {
  public searchTriggerButton: Locator;
  public searchInput: Locator;
  public searchSubmitButton: Locator;
  public signInButton: Locator;
  public userMenuButton: Locator;
  public logoutButton: Locator;
  public cartButton: Locator;
  public favoritesButton: Locator;
  public regionSelectorLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchTriggerButton = page.locator('button[data-testid="search-button"], button[aria-label="Recherche"], button.v7b243, [data-testid="header-search-btn"]').first();
    this.searchInput = page.locator('input[type="search"], input[name="q"], input#main-search, input[data-testid="search-input"]').first();
    this.searchSubmitButton = page.locator('button[type="submit"][aria-label*="Recherche"], button[data-testid="search-submit"]').first();
    
    this.signInButton = page.locator('a[href*="login"], button:has-text("Se connecter"), a:has-text("Se connecter"), [data-testid="header-my-account-link"]').first();
    this.userMenuButton = page.locator('button[aria-label*="Mon compte"], [data-testid="header-user-menu"]').first();
    this.logoutButton = page.locator('button:has-text("Se déconnecter"), a:has-text("Se déconnecter"), a[href*="logout"]').first();
    
    this.cartButton = page.locator('a[href*="cart"], a[href*="panier"], [data-testid="header-bag-icon"]').first();
    this.favoritesButton = page.locator('a[href*="favourites"], a[href*="favoris"], [data-testid="header-favourites-icon"]').first();
    this.regionSelectorLink = page.locator('a[href*="country-selector"], button[data-testid="region-selector"]').first();
  }

  public async openSearch(): Promise<void> {
    if (await this.searchTriggerButton.isVisible()) {
      await this.clickElement(this.searchTriggerButton, 'Bouton d\'ouverture de la recherche');
    }
  }

  public async searchProduct(keyword: string): Promise<void> {
    await this.openSearch();
    await this.fillInput(this.searchInput, keyword, 'Champ de recherche');
    await this.pressKey('Enter');
  }

  public async clickSignIn(): Promise<void> {
    if (await this.signInButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.signInButton.click({ force: true }).catch(() => {});
    } else {
      await this.navigateTo('https://www.hm.com/fr_fr/login');
    }
  }

  public async clickFavorites(): Promise<void> {
    await this.clickElement(this.favoritesButton, 'Bouton Favoris dans le header');
  }

  public async clickCart(): Promise<void> {
    await this.clickElement(this.cartButton, 'Bouton Panier dans le header');
  }
}
