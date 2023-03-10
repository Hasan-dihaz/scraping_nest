import { Injectable } from '@nestjs/common';

@Injectable()
export default class PageService {
  circuitBreakerScrap = {
    url: 'https://www.dsebd.org/cbul.php',

    async scraper(browser) {
      const page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      // Navigate to the selected page
      await page.goto(this.url);
      // Wait for the required DOM to be rendered
      async function scrapeCurrentPage() {
        await page.waitForSelector('.content');
        const circuit_breaker = await page.$$eval(
          'table.table.table-bordered.background-white.text-center > tbody >tr',
          async (text) => {
            const result = text.slice(2).map((te) => {
              const value = te.querySelector('td');
              return {
                // id: value.textContent,
                code: value.nextElementSibling.textContent,
                breaker:
                  value.nextElementSibling.nextElementSibling.textContent,
                tickSize:
                  value.nextElementSibling.nextElementSibling.nextElementSibling
                    .textContent,
                openAdjPrice:
                  value.nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.textContent,
                floorPrice:
                  value.nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling.textContent,
                lowerLimit:
                  value.nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling.nextElementSibling
                    .textContent,
                upperLimit:
                  value.nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.textContent,
                floorPriceBlockMakret:
                  value.nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling.textContent,
              };
            });
            return result;
          },
        );
        console.log('circuit_breaker', circuit_breaker);
        return circuit_breaker;
      }
      const data = await scrapeCurrentPage();
      //console.log('data...', data);
      return data;
    },
  };
}
