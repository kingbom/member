import { Controller, Get, UseGuards, Req, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express-serve-static-core";
import { IAccount } from "src/interfaces/app.interface";
import { ProfileModel } from "src/models/profile.model";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { MemberService } from "src/services/member.service";

@Controller('api/member')
@UseGuards(AuthGuard('jwt'))
export class MemberController {

    constructor(private memberService: MemberService){}
    
    /**
     * Get profile
     * @param req 
     * return pro fo user login
     */
    @Get('data')
    getProfile(@Req() req: Request){
        const user: IAccount =  req.user as any;    
        return user;
    }

    /**
     * edit profile
     * @param req 
     */
    @Post('profile')
    updateProfile(@Req() req: Request, @Body(new ValidationPipe()) body: ProfileModel){
        return this.memberService.onUpdateProfile(req.user.id, body);
    }
}