import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getCats();
  }

  @Post()
  postMessage(): any{
    return this.appService.saveCat();
  }
}
