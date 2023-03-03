import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Index from './index';
import Browser from './browser';
import PageController from './pageController';
import CodeNameScrap from './codeNameScraper';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Index, CodeNameScrap, PageController, Browser],
})
export class AppModule {}
