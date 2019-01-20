import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return {
      status : 200,
      message : 'successfuly method GET'
   }
  }

  @Post()
  postMessage(): object{
    return {
        status : 200,
        message : 'successfuly method POST'
    }
  }
}
