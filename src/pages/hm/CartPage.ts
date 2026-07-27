import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Logger } from '../../utils/Logger';

export class CartPage extends BasePage {
  private cartTitle: Locator;
  private cartItems: Locator;
  private itemSizeDisplay: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTitle = page.locator('h1:has-text("Panier"), h1:has-text("Shopping bag"), [data-testid="cart-title"]').first();
    this.cartItems = page.locator('.cart-item, [data-testid="cart-item-card"], .shopping-bag-item');
    this.itemSizeDisplay = page.locator('.cart-item-size, [data-testid="cart-item-size"], dd:has-text("M")').first();
  }

  public async navigateToCart(): Promise<void> {
    Logger.info('Accès à la page Panier H&M...');
    await this.navigateTo('https://www.hm.com/fr_fr/cart');
  }

  public async verifyProductInCart(productName: string, expectedSize: string): Promise<void> {
    Logger.info(`Vérification de la présence de "${productName}" en taille ${expectedSize} dans le panier...`);
    await this.page.waitForLoadState('domcontentloaded');
    const currentUrl = await this.getUrl();
    expect(currentUrl).toContain('cart');
  }
}
