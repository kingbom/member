import { Injectable, UnauthorizedException } from "@nestjs/common";
import { generate } from 'password-hash';
import { IAccessToken } from "src/interfaces/IAccessToken.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IMemberDocument } from "src/interfaces/member.interface";
import { IAuthen } from "src/interfaces/authen.interface";
import { PassportStrategy } from "@nestjs/passport"; 
import { Strategy } from "passport-http-bearer";

@Injectable()
export class DbAuthenService implements IAuthen {
    
    constructor(@InjectModel('AccessToken') private AccessTokenSchema: Model<IAccessToken>){}
    
    async generateAccessToken(member: IMemberDocument){
        const access = await this.AccessTokenSchema.create({
            memberId: member._id,
            accessToken: generate(Math.random.toString()),
            exprise: new Date().setMinutes(new Date().getMinutes() + 30)
        });
       return access.accessToken; 
    }
   
    async validateUser(accessToken: string): Promise<IMemberDocument> {
        try {
            const token = await this.AccessTokenSchema.findOne({ accessToken }).populate('memberId');
            if(token.exprise > new Date()) return token.memberId;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return null;
    }
}

@Injectable()
export class DbAuthenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: DbAuthenService) {
    super();
  }

  async validate(token: string) {
    const user = await this.authService.validateUser(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}