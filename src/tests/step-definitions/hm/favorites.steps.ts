import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../hooks/CustomWorld';
import { ProductSearchPage } from '../../../pages/hm/ProductSearchPage';
import { ProductDetailsPage } from '../../../pages/hm/ProductDetailsPage';
import { FavoritesPage } from '../../../pages/hm/FavoritesPage';

When('I select an item from the results', async function (this: CustomWorld) {
  const searchPage = new ProductSearchPage(this.page!);
  await searchPage.selectFirstProduct();
});

When('I add this item to my favorites', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.addToFavorites();
});

Then('the item should be visible in my favorites list', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.verifyAddedToFavoritesSuccess();
});

When('I navigate to the favorites page', async function (this: CustomWorld) {
  const favoritesPage = new FavoritesPage(this.page!);
  await favoritesPage.navigateToFavorites();
});

Then('the favorites page title should be displayed', async function (this: CustomWorld) {
  const favoritesPage = new FavoritesPage(this.page!);
  await favoritesPage.verifyFavoritesPageTitle();
});

When('I remove this item from my favorites', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.removeFromFavorites();
});

Then('the item should no longer be marked as favorite', async function (this: CustomWorld) {
  const pdp = new ProductDetailsPage(this.page!);
  await pdp.verifyNotFavorite();
});
