export interface EnvironmentConfig {
  baseUrl: string;
  browser: 'chromium' | 'firefox' | 'webkit';
  headless: boolean;
  defaultTimeout: number;
  slowMo: number;
  viewport: {
    width: number;
    height: number;
  };
}
