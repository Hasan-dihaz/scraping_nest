import { Injectable } from '@nestjs/common';
import { table } from 'console';

@Injectable()
export default class PageService {
  scraperObject = {
    url: 'https://www.dsebd.org/company_listing.php',

    async scraper(browser) {
      const page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      // Navigate to the selected page
      await page.goto(this.url);
      const scrapedData = [];
      // Wait for the required DOM to be rendered
      async function scrapeCurrentPage() {
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
                  Name: el.nextElementSibling.textContent.replace(
                    /[\(\)]/gm,
                    '',
                  ),
                };
              });
              // console.log("company_code_name ...1", company_code_name);
              return company_code_name;
            },
          );
          companies.push(...company_code_name);
          // console.log("urls", urls);
        }
        // console.log("companies", companies);

        //!========================================== Company Detail Scraping =========================

        // Loop through each of those links, open a new page instance and get the relevant data from them

        let link = '';
        const pagePromise = (code) =>
          new Promise(async (resolve, reject) => {
            let dataObj = {};
            const newPage = await browser.newPage();
            // console.log("code", code);
            link = `https://www.dsebd.org/displayCompany.php?name=${code}`;
            await newPage.goto(link);
            // await newPage.waitForSelector('h2.BodyHead.topBodyHead');
            dataObj['Name'] = await newPage.$eval(
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
            dataObj = await newPage.$$eval(
              'table#company',
              async (table, obj) => {
                //---------------table-1----------------
                let baseElement =
                  table[1].querySelector('tbody > tr').nextElementSibling
                    .nextElementSibling.nextElementSibling.nextElementSibling
                    .nextElementSibling.nextElementSibling;

                obj[
                  baseElement.querySelector('td').nextElementSibling.textContent
                ] =
                  baseElement.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.textContent;

                //---------------table-2----------------

                baseElement = table[2].querySelector('tbody > tr');

                obj[baseElement.querySelector('th').textContent] =
                  baseElement.querySelector('td').textContent;

                obj[
                  baseElement.nextElementSibling.querySelector('th').textContent
                ] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).textContent;

                obj[
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent
                ] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.textContent;

                obj[
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'th',
                  ).textContent
                ] =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).textContent;

                obj[
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent
                ] =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.nextElementSibling.textContent;

                //---------------table-3----------------
                baseElement = table[3].querySelector('tbody > tr');

                obj[baseElement.querySelector('th').textContent] =
                  baseElement.querySelector('td').textContent;

                obj[
                  baseElement.nextElementSibling.querySelector('th').textContent
                ] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).textContent;

                //---------------table-10----------------
                baseElement = table[10].querySelector('tbody > tr');

                obj[baseElement.querySelector('td').textContent] =
                  baseElement.querySelector(
                    'td',
                  ).nextElementSibling.textContent;

                obj[
                  baseElement.nextElementSibling.querySelector('td').textContent
                ] =
                  baseElement.nextElementSibling.querySelector(
                    'td',
                  ).nextElementSibling.textContent;

                //-----------------------------Shareholding pattern--------------------------
                const text =
                  baseElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
                    .querySelector('td')
                    .nextElementSibling.querySelector('table > tbody > tr');

                const textArray = text.textContent
                  .replace(/\s+/g, ' ')
                  .trim()
                  .split(' ');

                obj[textArray[0]] = textArray[1];
                obj[textArray[2]] = textArray[3];
                obj[textArray[4]] = textArray[5];
                obj[textArray[6]] = textArray[7];
                obj[textArray[8]] = textArray[9];
                //---------------Shareholding Pattern----------------------

                //---------------------table-12-------------------
                baseElement = table[12].querySelector('tbody > tr');
                console.log(
                  'baseElement',
                  baseElement.textContent.replace(/\s+/g, ' '),
                );

                return obj;
              },
              dataObj,
            );

            //!==============

            resolve(dataObj);
            // await newPage.close();
          });
        const compa = ['AAMRANET', 'AAMRATECH', 'ABB1STMF'];

        // compa.map(async(comp)=>{
        // 	// console.log("code", comp.Code);
        // 	let currentPageData = await pagePromise(comp);
        // 	scrapedData.push(currentPageData);
        // 	console.log(currentPageData);
        // })

        for (link in compa) {
          // console.log("companies[link]", companies[link].Code);
          const currentPageData = await pagePromise(companies[link].Code);
          scrapedData.push(currentPageData);
          console.log(currentPageData);
        }
      }
      const data = await scrapeCurrentPage();
      // console.log("data...",data);
      return data;
    },
  };
}
