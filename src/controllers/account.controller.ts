import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common";
import { RegisterModel } from "src/models/register.model";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AccountService } from "src/services/account.service";

@Controller('api/account')
export class AccountController {

    constructor(private readonly accountService: AccountService) {}

    @Get('members')
    async getMembers(){
        return await this.accountService.onGetMembers();
    }
    
    @Post('register')
    async register(@Body(new ValidationPipe()) reqBoby: RegisterModel){
        return await this.accountService.onRegister(reqBoby);
    }
}