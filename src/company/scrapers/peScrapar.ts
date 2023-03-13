import { Injectable } from '@nestjs/common';
import { PeService } from '../services/pe.service';
import { CreatePeDto } from '../dto/pe.dto';

@Injectable()
export default class PeScrap {
  constructor(private readonly peService: PeService) {
    // this.scraperObject = {
    //   peService: this.peService,
    // };
  }

  // scraperObject = {
  url = 'https://www.dsebd.org/latest_PE.php';

  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    // async function scrapeCurrentPage() {
    const scrapeCurrentPage = async () => {
      await page.waitForSelector('.content');

      let price_earnings_scrap: CreatePeDto[];
      price_earnings_scrap = await page.$$eval(
        'table.table.table-bordered.background-white.shares-table.fixedHeader > tbody >tr',
        async (text) => {
          const result = text.map((te) => {
            //console.log('te', te);

            const value = te.querySelector('td');
            //console.log('check', value.textContent);

            return {
              // id: value.textContent,
              code: value.nextElementSibling.textContent,
              close_price:
                value.nextElementSibling.nextElementSibling.textContent,
              ycp: value.nextElementSibling.nextElementSibling
                .nextElementSibling.textContent,
              pe_1: value.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.textContent,
              pe_2: value.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .textContent,
              pe_3: value.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .nextElementSibling.textContent,
              pe_4: value.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.textContent,
              pe_5: value.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .textContent,
              pe_6: value.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .nextElementSibling.nextElementSibling.nextElementSibling
                .nextElementSibling.textContent,
            };
          });

          //   //! Database insertion'''''''''''''''''''

          return result;
        },
      );
      // console.log('price_earnings_scrap', price_earnings_scrap);

      const is_created = await this.peService.upsertPeEntity(
        price_earnings_scrap,
      );
      // console.log('created records', is_created);
      // return price_earnings_scrap;
    };
    const data = await scrapeCurrentPage();
    //console.log('data...', data);
    return data;
  }
  // };
}
