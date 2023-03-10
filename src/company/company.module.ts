import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Index from './services/index';
// import { CompanyController } from '../company/controllers/company.controller';
import { CompanyService } from '../company/services/company.service';
import { Company } from './entities/company.entity';
import PageScraper from './services/codeNameScraper';

// ===========================
import ScraperController from './handler/pageController';
import Browser from './services/browser';
import { PE } from './entities/pe.entities';
import { CircuitBreaker } from './entities/circuitBreaker.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      //   password: 'password',
      database: 'Name_Nai',
      entities: [Company, PE, CircuitBreaker],
      // synchronize: true,
      //if enabled every time run the app will try to create table using registerd entity...runs migration automatically
    }),
    TypeOrmModule.forFeature([Company, PE, CircuitBreaker]), //to use typeORM Repository on company entity
  ],
  // controllers: [CompanyController],
  controllers: [],
  providers: [CompanyService, ScraperController, PageScraper, Index, Browser],
  // exports:[]
})
export default class CompanyModule {}
