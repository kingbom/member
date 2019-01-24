import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {


  @Get()
  getHello(): any {
    return 'test';
  }

  @Post()
  postMessage(): any{
    return 'test2';
  }
}
