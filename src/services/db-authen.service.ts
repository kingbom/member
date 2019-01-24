import { Injectable } from "@nestjs/common";
import { generate } from 'password-hash';
import { IAccessToken } from "src/interfaces/IAccessToken.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IMemberDocument } from "src/interfaces/member.interface";

@Injectable()
export class DbAuthenService {
    constructor(@InjectModel('AccessToken') private AccessTokenSchema: Model<IAccessToken>){}
    
    async generateAccessToken(member: IMemberDocument){
        const access = await this.AccessTokenSchema.create({
            memberId: member._id,
            accessToken: generate(Math.random.toString()),
            exprise: new Date().setMinutes(new Date().getMinutes() + 30)
        });
       return access.accessToken; 
    }
}