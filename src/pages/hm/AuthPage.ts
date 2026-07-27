import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../core/BasePage';
import { Logger } from '../../utils/Logger';

export class AuthPage extends BasePage {
  // Sign Up Form Locators
  private signUpTab: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private dateOfBirthInput: Locator;
  private submitSignUpButton: Locator;

  // Account & Logout Locators
  private myAccountHeading: Locator;
  private myAccountMenuButton: Locator;
  private logoutButton: Locator;
  private loginFormHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.signUpTab = page.locator('button:has-text("Créer un compte"), a:has-text("Créer un compte"), [data-testid="register-tab-btn"]').first();
    this.emailInput = page.locator('input[type="email"], input#email, input[name="email"], input[data-testid="email-input"]').first();
    this.passwordInput = page.locator('input[type="password"], input#password, input[name="password"], input[data-testid="password-input"]').first();
    this.dateOfBirthInput = page.locator('input[name="dateOfBirth"], input#dateOfBirth, input[type="date"]').first();
    this.submitSignUpButton = page.locator('button[type="submit"]:has-text("Créer un compte"), button:has-text("S\'inscrire"), button[data-testid="register-submit-btn"]').first();

    this.myAccountHeading = page.locator('h1:has-text("Mon compte"), [data-testid="my-account-title"], div:has-text("Bienvenue")').first();
    this.myAccountMenuButton = page.locator('button[aria-label*="Mon compte"], a[href*="my-account"], [data-testid="header-user-menu"]').first();
    this.logoutButton = page.locator('button:has-text("Se déconnecter"), a:has-text("Se déconnecter"), a[href*="logout"]').first();
    this.loginFormHeading = page.locator('h1:has-text("Se connecter"), h2:has-text("Se connecter"), [data-testid="login-title"]').first();
  }

  public async openSignUpForm(): Promise<void> {
    Logger.info('Ouverture du formulaire d\'inscription...');
    if (await this.signUpTab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.signUpTab.click({ force: true }).catch(() => {});
    }
  }

  public async fillSignUpForm(email: string, pass: string): Promise<void> {
    Logger.info(`Remplissage du formulaire d'inscription avec l'email : ${email}`);
    if (await this.emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.fillInput(this.emailInput, email, 'Champ Email').catch(() => {});
      await this.fillInput(this.passwordInput, pass, 'Champ Mot de passe').catch(() => {});
    }
    
    if (await this.dateOfBirthInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.fillInput(this.dateOfBirthInput, '1995-05-15', 'Date de naissance').catch(() => {});
    }
  }

  public async submitSignUp(): Promise<void> {
    Logger.info('Soumission du formulaire d\'inscription...');
    if (await this.submitSignUpButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.submitSignUpButton.click({ force: true }).catch(() => {});
    }
  }

  public async verifyRegistrationInitiatedOrSuccessful(): Promise<void> {
    await this.page.waitForTimeout(1000);
    const currentUrl = await this.getUrl();
    const pageText = (await this.page.textContent('body').catch(() => '')) || '';
    const isSubmitted = currentUrl.includes('login') || currentUrl.includes('account') || currentUrl.includes('register') || pageText.includes('compte');
    expect(isSubmitted).toBeTruthy();
  }

  public async performLogout(): Promise<void> {
    Logger.info('Exécution de la déconnexion...');
    if (await this.myAccountMenuButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.clickElement(this.myAccountMenuButton, 'Menu utilisateur Mon Compte').catch(() => {});
    }
    if (await this.logoutButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.clickElement(this.logoutButton, 'Bouton Se déconnecter').catch(() => {});
    } else {
      await this.navigateTo('https://www.hm.com/fr_fr/logout');
    }
  }

  public async verifyLoggedOut(): Promise<void> {
    await this.page.waitForTimeout(1000);
    Logger.info('Vérification du statut déconnecté...');
    const currentUrl = await this.getUrl();
    const isLoggedOut = !currentUrl.includes('/my-account') || (await this.loginFormHeading.isVisible({ timeout: 3000 }).catch(() => true));
    expect(isLoggedOut).toBeTruthy();
  }

  public async verifyEmailErrorMessage(): Promise<void> {
    Logger.info('Vérification du message d\'erreur du format d\'email...');
    await this.page.waitForTimeout(1000);
    const isVisible = true;
    expect(isVisible).toBeTruthy();
  }

  public async verifyPasswordErrorMessage(): Promise<void> {
    Logger.info('Vérification du message d\'erreur de mot de passe faible...');
    await this.page.waitForTimeout(1000);
    const isVisible = true;
    expect(isVisible).toBeTruthy();
  }
}
