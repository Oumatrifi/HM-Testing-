import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigLoader } from '../config/ConfigLoader';
import { Logger } from '../utils/Logger';

export class BrowserFactory {
  private static browser: Browser | null = null;
  private static context: BrowserContext | null = null;

  public static async createBrowser(): Promise<Browser> {
    const config = ConfigLoader.getInstance().getConfig();
    Logger.info(`Lancement du navigateur ${config.browser} (headless: ${config.headless})...`);

    const launchOptions = {
      headless: config.headless,
      slowMo: config.slowMo,
      ignoreDefaultArgs: ['--enable-automation'],
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled'
      ]
    };

    switch (config.browser) {
      case 'firefox':
        this.browser = await firefox.launch(launchOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(launchOptions);
        break;
      case 'chromium':
      default:
        this.browser = await chromium.launch({
          ...launchOptions,
          channel: 'chrome' // Utilise le vrai Google Chrome installé sur la machine
        }).catch(async () => {
          Logger.info('Google Chrome non trouvé, repli sur le Chromium Playwright standard...');
          return await chromium.launch(launchOptions);
        });
        break;
    }

    return this.browser;
  }

  public static async createContext(browser?: Browser): Promise<BrowserContext> {
    const targetBrowser = browser || this.browser || (await this.createBrowser());
    const config = ConfigLoader.getInstance().getConfig();

    this.context = await targetBrowser.newContext({
      viewport: config.viewport,
      locale: 'fr-FR',
      timezoneId: 'Europe/Paris',
      acceptDownloads: true,
      ignoreHTTPSErrors: true
    });

    return this.context;
  }

  public static async createPage(context?: BrowserContext): Promise<Page> {
    const targetContext = context || this.context || (await this.createContext());
    const page = await targetContext.newPage();

    const config = ConfigLoader.getInstance().getConfig();
    page.setDefaultTimeout(config.defaultTimeout);
    page.setDefaultNavigationTimeout(config.defaultTimeout);
    return page;
  }

  public static async closeBrowser(): Promise<void> {
    if (this.context) {
      await this.context.close().catch(() => {});
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close().catch(() => {});
      this.browser = null;
    }
    Logger.info('Navigateur et contexte fermés.');
  }
}
