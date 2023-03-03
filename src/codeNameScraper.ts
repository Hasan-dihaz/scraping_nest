import { Injectable } from '@nestjs/common';

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
            const dataObj = {};
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

            dataObj['bookPrice'] = await newPage.$$eval(
              'table#company',
              async (text) => {
                console.log('text', text[1]);
                // const element = text[1];

                // const element =
                //   text[1].querySelector('tbody > tr').nextElementSibling
                //     .nextElementSibling.nextElementSibling.nextElementSibling
                //     .nextElementSibling.nextElementSibling;

                // await page.$x(
                //   '//*[@id="content"]/div/section[1]/div/div/div[1]/div/h1',
                // );

                // console.log(
                //   'text',
                //   await element),
                // );
              },
            );
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
