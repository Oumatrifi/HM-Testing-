import * as dotenv from 'dotenv';
import * as path from 'path';
import { EnvironmentConfig } from './EnvironmentConfig';

export class ConfigLoader {
  private static instance: ConfigLoader;
  private config: EnvironmentConfig;

  private constructor() {
    const env = process.env.NODE_ENV || 'test';
    const envFile = env === 'test' ? '.env.test' : '.env';
    dotenv.config({ path: path.resolve(process.cwd(), envFile) });

    const isHeadless = process.env.CROSS_ENV_HEADLESS !== undefined 
      ? process.env.CROSS_ENV_HEADLESS === 'true'
      : (process.env.HEADLESS ?? 'true') === 'true';

    this.config = {
      baseUrl: process.env.BASE_URL || 'https://www.hm.com/fr_fr/index.html',
      browser: (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium',
      headless: isHeadless,
      defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
      slowMo: parseInt(process.env.SLOW_MO || '0', 10),
      viewport: {
        width: parseInt(process.env.VIEWPORT_WIDTH || '1440', 10),
        height: parseInt(process.env.VIEWPORT_HEIGHT || '900', 10),
      },
    };
  }

  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  public getConfig(): EnvironmentConfig {
    return this.config;
  }
}
