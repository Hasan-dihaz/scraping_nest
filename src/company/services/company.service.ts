// company.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const {
      name,
      last_agm,
      market_capitalization_mn,
      authorized_capital_mn,
      paidup_capital_mn,
      type_of_instrument,
      total_outstanding_share,
      face_par_value,
      sector,
      cash_dividend,
      bonus_issued_stock_dividend,
      pe,
      eps,
      listing_since,
      category,
      ponsor_director,
      govt,
      institute,
      foreign,
      _public,
      address,
      phone,
      email,
    } = createCompanyDto;

    const company = new Company();

    company.name = name;
    company.last_agm = last_agm;
    company.market_capitalization_mn = market_capitalization_mn;
    company.authorized_capital_mn = authorized_capital_mn;
    company.paidup_capital_mn = paidup_capital_mn;
    company.type_of_instrument = type_of_instrument;
    company.total_outstanding_share = total_outstanding_share;
    company.face_par_value = face_par_value;
    company.sector = sector;
    company.cash_dividend = cash_dividend;
    company.bonus_issued_stock_dividend = bonus_issued_stock_dividend;
    company.pe = pe;
    company.eps = eps;
    company.listing_since = listing_since;
    company.category = category;
    company.ponsor_director = ponsor_director;
    company.govt = govt;
    company.institute = institute;
    company.foreign = foreign;
    company.public = _public;
    company.address = address;
    company.phone = phone;
    company.email = email;

    return this.companyRepository.save(company);
  }

  async updateCompany(code: string, companyData: any): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { code: code },
    });
    const {
      name,
      last_agm,
      market_capitalization_mn,
      authorized_capital_mn,
      paidup_capital_mn,
      type_of_instrument,
      total_outstanding_share,
      face_par_value,
      sector,
      cash_dividend,
      bonus_issued_stock_dividend,
      pe,
      eps,
      listing_since,
      category,
      ponsor_director,
      govt,
      institute,
      foreign,
      _public,
      address,
      phone,
      email,
    } = companyData;

    company.name = name;
    company.last_agm = last_agm;
    company.market_capitalization_mn = market_capitalization_mn;
    company.authorized_capital_mn = authorized_capital_mn;
    company.paidup_capital_mn = paidup_capital_mn;
    company.type_of_instrument = type_of_instrument;
    company.total_outstanding_share = total_outstanding_share;
    company.face_par_value = face_par_value;
    company.sector = sector;
    company.cash_dividend = cash_dividend;
    company.bonus_issued_stock_dividend = bonus_issued_stock_dividend;
    company.pe = pe;
    company.eps = eps;
    company.listing_since = listing_since;
    company.category = category;
    company.ponsor_director = ponsor_director;
    company.govt = govt;
    company.institute = institute;
    company.foreign = foreign;
    company.public = _public;
    company.address = address;
    company.phone = phone;
    company.email = email;

    await this.companyRepository.save(company);
    return company;
  }
}