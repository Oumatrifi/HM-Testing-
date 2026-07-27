import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../../hooks/CustomWorld';
import { HeaderComponent } from '../../../pages/components/HeaderComponent';
import { AuthPage } from '../../../pages/hm/AuthPage';
import { TestDataHelper } from '../../../utils/TestDataHelper';

When('I open the sign up form', async function (this: CustomWorld) {
  const header = new HeaderComponent(this.page!);
  await header.clickSignIn();
  const authPage = new AuthPage(this.page!);
  await authPage.openSignUpForm();
});

When('I enter a unique email and valid password', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  const randomEmail = TestDataHelper.generateRandomEmail();
  const data = TestDataHelper.getHMData();
  await authPage.fillSignUpForm(randomEmail, data.user.defaultPassword);
});

When('I submit the sign up form', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  await authPage.submitSignUp();
});

Then('my registration request should be processed successfully', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  await authPage.verifyRegistrationInitiatedOrSuccessful();
});

When('I request to log out from my account', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  await authPage.performLogout();
});

Then('I should be logged out successfully', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  await authPage.verifyLoggedOut();
});

When('I enter an invalid email {string} and valid password {string}', async function (this: CustomWorld, email: string, pass: string) {
  const authPage = new AuthPage(this.page!);
  await authPage.fillSignUpForm(email, pass);
});

Then('an email format error message should be displayed', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  await authPage.verifyEmailErrorMessage();
});

When('I enter a valid email and weak password {string}', async function (this: CustomWorld, weakPass: string) {
  const authPage = new AuthPage(this.page!);
  const randomEmail = TestDataHelper.generateRandomEmail();
  await authPage.fillSignUpForm(randomEmail, weakPass);
});

When('I enter an empty email {string} and valid password {string}', async function (this: CustomWorld, email: string, pass: string) {
  const authPage = new AuthPage(this.page!);
  await authPage.fillSignUpForm(email, pass);
});

Then('a password validation error message should be displayed', async function (this: CustomWorld) {
  const authPage = new AuthPage(this.page!);
  await authPage.verifyPasswordErrorMessage();
});
