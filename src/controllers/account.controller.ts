import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { RegisterModel } from "src/models/register.model";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller('api/account')
export class AccountController {
    
    @Post('register')
    register(@Body(new ValidationPipe()) reqBoby: RegisterModel){
        return reqBoby;
    }
}