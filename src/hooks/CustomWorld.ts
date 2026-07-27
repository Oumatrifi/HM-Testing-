import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { CookieBannerComponent } from '../pages/components/CookieBannerComponent';

export interface ICustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  cookieBanner?: CookieBannerComponent;
  scenarioData: Record<string, any>;
}

export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  cookieBanner?: CookieBannerComponent;
  scenarioData: Record<string, any>;

  constructor(options: IWorldOptions) {
    super(options);
    this.scenarioData = {};
  }
}

setWorldConstructor(CustomWorld);
