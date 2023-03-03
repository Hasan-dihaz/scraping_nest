import BrowserObject from './browser';
import { Injectable, Inject } from '@nestjs/common';
import ScraperController from './pageController';

@Injectable()
export default class IndexProvider {
  constructor(
    private readonly browserObject: BrowserObject,
    private readonly scraperController: ScraperController,
  ) {}
  //Start the browser and create a browser instance
  async func() {
    const browserInstance = this.browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    this.scraperController.scrapeAll(browserInstance);
  }
}
