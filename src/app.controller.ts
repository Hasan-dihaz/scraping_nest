import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
// import Index from './company/services/index';

// ========================
// import { CompanyService } from './company/services/company.service';
// import { Company } from './company/entities/company.entity';

@Controller()
export class AppController {
  // constructor(private readonly index: Index) {}

  @Get()
  getHello(): void {
    // return this.index.func();
  }
}

// @Controller()
// export class AppController {
//   constructor(private readonly companyService: CompanyService) {}

//   @Get()
//   getHello(): Promise<Company> {
//     console.log('Controller');

//     return this.companyService.createCompany({
//       id: 1,
//       code: ' ',
//       name: 'Zahid Hasan',
//       last_agm: ' ',
//       market_capitalization_mn: ' ',
//       authorized_capital_mn: ' ',
//       paidup_capital_mn: ' ',
//       type_of_instrument: ' ',
//       total_outstanding_share: ' ',
//       face_par_value: ' ',
//       sector: ' ',
//       cash_dividend: ' ',
//       bonus_issued_stock_dividend: ' ',
//       pe: ' ',
//       eps: ' ',
//       listing_since: ' ',
//       category: ' ',
//       ponsor_director: ' ',
//       govt: ' ',
//       institute: ' ',
//       foreign: ' ',
//       _public: ' ',
//       address: ' ',
//       phone: ' ',
//       email: ' ',
//     });
//   }
// }
