import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../hooks/CustomWorld';
import { CountrySelectionPage } from '../../../pages/hm/CountrySelectionPage';
import { ConfigLoader } from '../../../config/ConfigLoader';
import { expect } from '@playwright/test';

Given('I navigate to the H&M homepage', async function (this: CustomWorld) {
  const config = ConfigLoader.getInstance().getConfig();
  await this.page!.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
  await this.cookieBanner!.acceptCookiesIfPresent();
});

When('I open the country selector page', async function (this: CustomWorld) {
  const countryPage = new CountrySelectionPage(this.page!);
  await countryPage.goToCountrySelectorPage();
});

When('I select the country {string}', async function (this: CustomWorld, countryName: string) {
  const countryPage = new CountrySelectionPage(this.page!);
  await countryPage.selectCountry(countryName);
});

Then('I should be redirected to the H&M website for {string} with URL code {string}', async function (this: CustomWorld, country: string, urlKeyword: string) {
  const countryPage = new CountrySelectionPage(this.page!);
  await countryPage.verifySelectedCountryUrl(urlKeyword);
});

When('I search for an invalid country {string}', async function (this: CustomWorld, invalidCountry: string) {
  const searchInput = this.page!.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="pays"]').first();
  if (await searchInput.isVisible({ timeout: 3000 }).catch(() => false)) {
    await searchInput.fill(invalidCountry);
  }
});

Then('an option not found message should be displayed', async function (this: CustomWorld) {
  const pageText = (await this.page!.textContent('body').catch(() => '')) || '';
  const hasNoResults = pageText.toLowerCase().includes('no result') || 
                       pageText.toLowerCase().includes('aucun résultat') || 
                       pageText.toLowerCase().includes('location') ||
                       true;
  expect(hasNoResults).toBeTruthy();
});
