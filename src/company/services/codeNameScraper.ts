import { Injectable, Inject } from '@nestjs/common';
import { table } from 'console';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from '../dto/company.dto';

@Injectable()
export default class PageService {
  // scraperObject: any;
  constructor(private readonly companyService: CompanyService) {
    // this.scraperObject = {
    //   companyService: this.companyService,
    // };
  }

  // scraperObject = {
  count = 0;
  url = 'https://www.dsebd.org/company_listing.php';
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const scrapedData = [];
    // Wait for the required DOM to be rendered
    const scrapeCurrentPage = async () => {
      await page.waitForSelector('.content');
      const companies = [];
      for (let id = 65; id <= 90; id++) {
        //for id A-Z
        // console.log("ID", String.fromCharCode(id));
        const company_code_name = await page.$$eval(
          `div#${String.fromCharCode(id)} > div.BodyContent > a.ab1`,
          (company_code_name) => {
            company_code_name = company_code_name.map((el) => {
              return {
                Code: el.textContent,
                Name: el.nextElementSibling.textContent.replace(/[\(\)]/gm, ''),
              };
            });
            // console.log("company_code_name ...1", company_code_name);
            return company_code_name;
          },
        );
        if (id == 90) {
          console.log('Code Done');
        }
        companies.push(...company_code_name);
        // console.log("urls", urls);
      }
      // console.log("companies", companies);

      //!========================================== Company Detail Scraping =========================

      // Loop through each of those links, open a new page instance and get the relevant data from them

      let link = '';

      const pagePromise = (code): Promise<CreateCompanyDto> =>
        new Promise(async (resolve, reject) => {
          // let dataObj: CreateCompanyDto = {};
          let dataObj = new CreateCompanyDto();
          const newPage = await browser.newPage();
          // console.log("code", code);
          link = `https://www.dsebd.org/displayCompany.php?name=${code}`;
          await newPage.goto(link);
          // await newPage.waitForSelector('h2.BodyHead.topBodyHead');
          dataObj['code'] = code;
          console.log('Code : ', code);

          dataObj['name'] = await newPage.$eval(
            'div#section-to-print > h2 > i',
            (text) => text.textContent,
          );

          // dataObj['bookPrice'] = await newPage.$$eval(
          //   'table#company',
          //   async (text) => {
          //     console.log('text', text[1]);
          //     const element = Array.from(text[1]);
          //     element.map((i) => {
          //       console.log('item...', i);
          //     });

          //     console.log('text....1', element);
          //   },
          // );
          // =========================

          // dataObj['Market Capitalization (mn)'] = await newPage.$$eval(
          //   'table#company',
          //   async (table) => {
          //     const element =
          //       table[1].querySelector('tbody > tr').nextElementSibling
          //         .nextElementSibling.nextElementSibling.nextElementSibling
          //         .nextElementSibling.nextElementSibling;

          //     return element.querySelector('td').nextElementSibling
          //       .nextElementSibling.textContent;
          //   },
          // );

          //!===============

          dataObj['last_agm'] = await newPage.$eval(
            'div.col-sm-6.pull-left > i',
            (text) => text.textContent,
          );

          console.log("last_agm'"); //!..............................................
          try {
            dataObj = await newPage.$$eval(
              'table#company',
              async (table, obj) => {
                //---------------table-1-Market Information---------------

                console.log('market'); //!.............................
                let baseElement =
                  table[1].querySelector('tbody > tr').nextElementSibling
                    .nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling;

                obj['market_capitalization_mn'] =
                  baseElement.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.textContent;

                console.log('market_capitalization_mn'); //!.............................

                //---------------table-2-Basic Information---------------

                baseElement = table[2].querySelector('tbody > tr');

                obj['authorized_capital_mn'] =
                  baseElement.querySelector('td').textContent;

                obj['paidup_capital_mn'] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).textContent;

                obj['type_of_instrument'] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.textContent;

                obj['total_outstanding_share'] =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).textContent;
                console.log('total_outstanding_share'); //!.............................

                obj['face_par_value'] =
                  baseElement.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).textContent;

                obj['sector'] =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.textContent;

                //---------------table-3-Last AGM---------------

                baseElement = table[3].querySelector('tbody > tr');

                obj['cash_dividend'] =
                  baseElement.querySelector('td').textContent;

                obj['bonus_issued_stock_dividend'] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).textContent;

                console.log('bonus_issued_stock_dividend'); //!.............................
                //---------------table-6-Price Earnings (P/E) Ratio Based on latest Audited Financial Statements---------------

                baseElement = table[6].querySelector('tbody > tr');
                console.log(
                  'baseElement',
                  baseElement.nextElementSibling.querySelector('td')
                    .nextElementSibling.textContent,
                ); //!'''''''''''''''''''''''''''''' Working Here'''''''''''''

                obj['pe'] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
                console.log('pe'); //!.............................

                //---------------table-7-Price Earnings (P/E) Ratio Based on latest Audited Financial Statements---------------

                baseElement =
                  table[7].querySelector('tbody > tr').nextElementSibling
                    .nextElementSibling;
                // obj['eps'] =
                //   baseElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                //     'td',
                //   ).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;

                //!===================================
                const year = (base_element) => {
                  const year_row = base_element;
                  if (year_row.nextElementSibling !== null) {
                    console.log('null.......', year_row.querySelector('td'));

                    year(year_row.nextElementSibling);
                  } else {
                    obj['eps'] =
                      year_row.querySelector(
                        'td',
                      ).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
                    console.log("obj['eps']", obj['eps']);
                  }
                };

                year(baseElement);
                // console.log('Year', year.textContent);

                //!============================================

                // obj['eps'] =
                //   baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                //     'td',
                //   ).nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
                //!===================================

                console.log('eps'); //!.............................

                //---------------table-10-Other Information of the Company---------------
                baseElement = table[10].querySelector('tbody > tr');

                obj['listing_since'] =
                  baseElement.querySelector(
                    'td',
                  ).nextElementSibling.textContent;

                obj['category'] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent;

                //-----------------------------Shareholding pattern--------------------------
                const Shareholding =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
                    .querySelector('td')
                    .nextElementSibling.querySelector('table > tbody > tr');
                const ShareholdingArray = Shareholding.textContent
                  .replace(/\s+/g, ' ')
                  .trim()
                  .split(' ');

                obj['ponsor_director'] = ShareholdingArray[1];
                obj['govt'] = ShareholdingArray[3];
                obj['institute'] = ShareholdingArray[5];
                obj['foreign'] = ShareholdingArray[7];
                obj['public'] = ShareholdingArray[9];

                console.log('public'); //!.............................
                //---------------Shareholding Pattern----------------------

                //---------------------table-12-Address of the Company------------------
                baseElement = table[12].querySelector('tbody > tr');

                const addressArray = baseElement.textContent.trim().split('\n');

                obj['address'] = addressArray[2].replace(/\s+/g, ' ');

                obj['phone'] =
                  baseElement.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent;

                obj['email'] =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent;

                console.log(
                  "baseElement.nextElementSibling.querySelector('td').textContent",
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent,
                );

                return obj;
              },
              dataObj,
            );
          } catch {
            this.count += 1;
            console.log('error........');
          }

          const date = new Date();
          console.log('date', date);

          //!==============

          resolve(dataObj);
          // await newPage.close();
        });

      // const compa = ['AAMRANET', 'AAMRATECH', 'ACMEPL'];
      const com = ['ACMEPL', 'AGRANINS', ' SJIBLPBOND'];

      // compa.map(async(comp)=>{
      // 	// console.log("code", comp.Code);
      // 	let currentPageData = await pagePromise(comp);
      // 	scrapedData.push(currentPageData);
      // 	console.log(currentPageData);
      // })

      // for (link in companies) {
      for (link in com) {
        // let currentPageData: CreateCompanyDto = {};
        let currentPageData = new CreateCompanyDto();
        // currentPageData = await pagePromise(companies[link].Code);
        currentPageData = await pagePromise(com[link]);

        // =============================================

        // const result = await this.companyService.createCompany(currentPageData);

        // console.log('result', result);
        console.log('Count', this.count);

        // =============================================
        scrapedData.push(currentPageData);
        // console.log(currentPageData);
      }
    };
    const data = await scrapeCurrentPage();
    // console.log('data...', data);
    return data;
    // },
  }
}
