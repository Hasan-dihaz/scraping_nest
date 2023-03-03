import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import Index from './index';

@Controller()
export class AppController {
  constructor(private readonly index: Index) {}

  @Get()
  getHello(): Promise<void> {
    return this.index.func();
  }
}
