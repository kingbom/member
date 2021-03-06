import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common";
import { RegisterModel } from "src/models/register.model";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AccountService } from "src/services/account.service";
import { async } from "rxjs/internal/scheduler/async";
import { LoginModel } from "src/models/login.model";

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

    @Post('login')
    async login(@Body(new ValidationPipe()) req: LoginModel){
        return await this.accountService.onLogin(req);
    }
}