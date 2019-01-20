import { Controller, Post, Body } from "@nestjs/common";

@Controller('api/account')
export class AccountController{
    
    @Post('register')
    register(@Body() body){
        console.log(body);
       return body;
    }
}