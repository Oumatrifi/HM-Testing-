import { Before, After, Status, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { BrowserFactory } from '../core/BrowserFactory';
import { CustomWorld } from './CustomWorld';
import { ConfigLoader } from '../config/ConfigLoader';
import { Logger } from '../utils/Logger';
import { CookieBannerComponent } from '../pages/components/CookieBannerComponent';

const config = ConfigLoader.getInstance().getConfig();
setDefaultTimeout(config.defaultTimeout);

BeforeAll(async function () {
  Logger.info('=== Début de l\'exécution de la suite de tests H&M BDD ===');
});

Before(async function (this: CustomWorld, scenario) {
  Logger.info(`Initialisation du scénario : "${scenario.pickle.name}"`);
  this.browser = await BrowserFactory.createBrowser();
  this.context = await BrowserFactory.createContext(this.browser);
  this.page = await BrowserFactory.createPage(this.context);
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

  if (this.page) {
    await this.page.close().catch(() => {});
  }
  if (this.context) {
    await this.context.close().catch(() => {});
  }
  if (this.browser) {
    await this.browser.close().catch(() => {});
  }
});

AfterAll(async function () {
  Logger.info('=== Fin de l\'exécution de la suite de tests H&M BDD ===');
});
