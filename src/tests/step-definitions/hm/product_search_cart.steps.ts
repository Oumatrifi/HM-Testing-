import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../hooks/CustomWorld';
import { ProductSearchPage } from '../../../pages/hm/ProductSearchPage';
import { ProductDetailsPage } from '../../../pages/hm/ProductDetailsPage';

When('I search for the product {string}', async function (this: CustomWorld, keyword: string) {
  const searchPage = new ProductSearchPage(this.page!);
  await searchPage.executeSearch(keyword);
});

When('search results are displayed', async function (this: CustomWorld) {
  const searchPage = new ProductSearchPage(this.page!);
  await searchPage.verifySearchResults('Product');
});

When('I select the product {string} from the list', async function (this: CustomWorld, productName: string) {
  const searchPage = new ProductSearchPage(this.page!);
  await searchPage.selectFirstProduct();
});

When('I select the size {string} on the product page', async function (this: CustomWorld, size: string) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.selectSize(size);
});

When('I add the product to the cart', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.addToBag();
});

Then('the product {string} in size {string} should be added to the cart successfully', async function (this: CustomWorld, productName: string, size: string) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.verifyAddedToBagSuccess();
});

Then('a no results found message should be displayed', async function (this: CustomWorld) {
  const searchPage = new ProductSearchPage(this.page!);
  await searchPage.verifyNoResultsFound();
});

When('I add the product to the cart without selecting a size', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.addToBag();
});

Then('a size selection required message or prompt should be displayed', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.verifySizeWarningOrRequired();
});
