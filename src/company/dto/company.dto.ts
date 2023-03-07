export class CreateCompanyDto {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly last_agm: string;
  readonly market_capitalization_mn: string;
  readonly authorized_capital_mn: string;
  readonly paidup_capital_mn: string;
  readonly type_of_instrument: string;
  readonly total_outstanding_share: string;
  readonly face_par_value: string;
  readonly sector: string;
  readonly cash_dividend: string;
  readonly bonus_issued_stock_dividend: string;
  readonly pe: string;
  readonly eps: string;
  readonly listing_since: string;
  readonly category: string;
  readonly ponsor_director: string;
  readonly govt: string;
  readonly institute: string;
  readonly foreign: string;
  readonly _public: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
}
