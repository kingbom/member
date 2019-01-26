import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express-serve-static-core";
import { IAccount } from "src/interfaces/app.interface";

@Controller('api/member')
@UseGuards(AuthGuard('bearer'))
export class MemberController {

    @Get('data')
    getUser(@Req() req: Request){
        const user: IAccount =  req.user as any;    
        return user;
    }
}