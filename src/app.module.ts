import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Index from './company/services/index';
import Browser from './company/services/browser';
import PageController from './company/handler/pageController';
import CodeNameScrap from './company/services/codeNameScraper';
import CompanyModule from './company/company.module';
// import { CompanyController } from './company/controllers/company.controller';

// =================
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company/entities/company.entity';
import { CompanyService } from './company/services/company.service';

@Module({
  imports: [CompanyModule, TypeOrmModule.forFeature([Company])],
  controllers: [AppController],
  providers: [
    AppService,
    Index,
    CodeNameScrap,
    PageController,
    Browser,
    CompanyService,
  ],
})
export class AppModule {}
