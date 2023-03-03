import PageScraper from './codeNameScraper';
import { Injectable, Inject } from '@nestjs/common';
// @Controller()
@Injectable()
export default class PageController {
  constructor(@Inject(PageScraper) private readonly pageScraper: PageScraper) {}

  async scrapeAll(browserInstance) {
    let browser;
    try {
      browser = await browserInstance;
      await this.pageScraper.scraperObject.scraper(browser);
    } catch (err) {
      console.log('Could not resolve the browser instance => ', err);
    }
  }
}

// module.exports = (browserInstance) => scrapeAll(browserInstance);
