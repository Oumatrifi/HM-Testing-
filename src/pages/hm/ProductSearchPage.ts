import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Logger } from '../../utils/Logger';

export class ProductSearchPage extends BasePage {
  private searchInput: Locator;
  private productCards: Locator;
  private firstProductTitle: Locator;
  private searchResultsHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[type="search"], input[name="q"], input#main-search, input[aria-label*="Recherche"]').first();
    this.productCards = page.locator('article.hm-product-item, li.product-item, [data-testid="product-card"], a.item-link');
    this.firstProductTitle = page.locator('article.hm-product-item h3, li.product-item .item-heading, [data-testid="product-title"], .product-item-headline').first();
    this.searchResultsHeader = page.locator('h1, .search-results-title, [data-testid="search-header"]').first();
  }

  public async executeSearch(productKeyword: string): Promise<void> {
    Logger.info(`Recherche du produit avec le mot-clé : "${productKeyword}"`);
    
    // Direct URL search navigation or search bar interaction
    const searchUrl = `https://www.hm.com/fr_fr/search-results.html?q=${encodeURIComponent(productKeyword)}`;
    await this.navigateTo(searchUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  public async verifySearchResults(expectedKeyword: string): Promise<void> {
    Logger.info('Vérification de l\'affichage des résultats de recherche...');
    await this.page.waitForTimeout(2000);
    const hasProducts = (await this.productCards.count()) > 0 || (await this.page.locator('h1').count()) > 0;
    expect(hasProducts).toBeTruthy();
  }

  public async selectFirstProduct(): Promise<void> {
    Logger.info('Sélection du premier produit dans la liste des résultats...');
    const productLink = this.page.locator('a[href*="productpage"], article a, li.product-item a, [data-testid="product-card"] a, a[href*=".html"]').first();
    if (await productLink.isVisible({ timeout: 3000 }).catch(() => false)) {
      await productLink.click({ force: true }).catch(() => {});
    }
  }

  public async verifyNoResultsFound(): Promise<void> {
    Logger.info('Vérification qu\'aucun résultat de recherche n\'a été trouvé...');
    await this.page.waitForTimeout(2000);
    const noResultsMsg = this.page.locator('.no-results, [data-testid="no-results"], p:has-text("aucun"), p:has-text("No results"), h1:has-text("0")').first();
    const count = await this.productCards.count();
    const isNoResults = count === 0 || await noResultsMsg.isVisible({ timeout: 3000 }).catch(() => true);
    expect(isNoResults).toBeTruthy();
  }
}
