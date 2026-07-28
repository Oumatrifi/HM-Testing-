import { Before, After, Status, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { BrowserFactory } from '../core/BrowserFactory';
import { CustomWorld } from './CustomWorld';
import { ConfigLoader } from '../config/ConfigLoader';
import { Logger } from '../utils/Logger';
import { CookieBannerComponent } from '../pages/components/CookieBannerComponent';
import { Browser, BrowserContext, Page } from '@playwright/test';

const config = ConfigLoader.getInstance().getConfig();
setDefaultTimeout(config.defaultTimeout);

let globalBrowser: Browser;
let globalContext: BrowserContext;
let globalPage: Page;

BeforeAll(async function () {
  Logger.info('=== Début de l\'exécution de la suite de tests H&M BDD ===');
  globalBrowser = await BrowserFactory.createBrowser();
  globalContext = await BrowserFactory.createContext(globalBrowser);
  globalPage = await BrowserFactory.createPage(globalContext);
});

Before(async function (this: CustomWorld, scenario) {
  Logger.info(`Initialisation du scénario : "${scenario.pickle.name}"`);
  this.browser = globalBrowser;
  this.context = globalContext;
  this.page = globalPage;
  await this.context.clearCookies(); // Nettoyer les cookies pour éviter le blocage Akamai
  this.cookieBanner = new CookieBannerComponent(this.page);
});

After(async function (this: CustomWorld, scenario) {
  Logger.info(`Fin du scénario : "${scenario.pickle.name}" - Statut: ${scenario.result?.status}`);

  if (scenario.result?.status === Status.FAILED && this.page) {
    try {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
      Logger.error(`Capture d'écran d'échec attachée au rapport pour : "${scenario.pickle.name}"`);
    } catch (err) {
      Logger.error(`Impossible de prendre une capture d'écran d'échec : ${err}`);
    }
  }
});

AfterAll(async function () {
  Logger.info('=== Fin de l\'exécution de la suite de tests H&M BDD ===');
  if (globalPage) {
    await globalPage.close().catch(() => {});
  }
  if (globalContext) {
    await globalContext.close().catch(() => {});
  }
  if (globalBrowser) {
    await globalBrowser.close().catch(() => {});
  }
});
