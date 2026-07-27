import * as path from 'path';
import * as fs from 'fs';

export class TestDataHelper {
  private static dataCache: any = null;

  public static getHMData(): any {
    if (!this.dataCache) {
      const filePath = path.resolve(process.cwd(), 'test-data/hm/data.json');
      const rawData = fs.readFileSync(filePath, 'utf-8');
      this.dataCache = JSON.parse(rawData);
    }
    return this.dataCache;
  }

  public static generateRandomEmail(): string {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    return `qa.test.hm.${timestamp}.${randomSuffix}@test-hm-auto.com`;
  }
}
