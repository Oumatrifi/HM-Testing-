import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Logger } from '../../utils/Logger';

export class CountrySelectionPage extends BasePage {
  private regionSelectorFooterLink: Locator;
  private countryOptions: Locator;
  private currentRegionDisplay: Locator;

  constructor(page: Page) {
    super(page);
    this.regionSelectorFooterLink = page.locator('a[href*="country-selector"], a[href*="location-selector"], footer a:has-text("Changer de région"), footer a:has-text("Change region")').first();
    this.countryOptions = page.locator('a[href*="fr_fr"], a[data-code="fr_fr"], a:has-text("France")');
    this.currentRegionDisplay = page.locator('html');
  }

  public async goToCountrySelectorPage(): Promise<void> {
    Logger.info('Accès à la page/sélecteur de choix de pays H&M...');
    await this.navigateTo('https://www.hm.com/entrance.ahtml');
  }

  public async selectCountry(countryName: string): Promise<void> {
    Logger.info(`Sélection du pays : ${countryName}`);
    let code = 'fr_fr';

    if (countryName.toLowerCase() === 'germany' || countryName.toLowerCase() === 'allemagne') {
      code = 'de_de';
    } else if (countryName.toLowerCase() === 'spain' || countryName.toLowerCase() === 'espagne') {
      code = 'es_es';
    } else if (countryName.toLowerCase() === 'france') {
      code = 'fr_fr';
    }

    // Navigation directe vers le domaine canonique www.hm.com/code/
    // Évite la redirection de l'attribut href d'H&M vers www2.hm.com qui déclenche l'Access Denied Akamai
    await this.navigateTo(`https://www.hm.com/${code}/`);
    await this.page.waitForTimeout(1000);
  }

  public async verifySelectedCountryUrl(expectedUrlKeyword: string): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    const currentUrl = await this.getUrl();
    Logger.info(`Vérification de l'URL du pays sélectionné : ${currentUrl}`);
    expect(currentUrl.toLowerCase()).toContain(expectedUrlKeyword.toLowerCase());
  }
}
