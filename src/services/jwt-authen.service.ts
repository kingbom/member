import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthen } from "src/interfaces/authen.interface";
import { IMemberDocument } from "src/interfaces/member.interface";
import { sign } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class JwtAuthenService implements IAuthen {
    
    static secretKey:string = 'app mermber serice'

    constructor(@InjectModel('Member') private MemberSchema: Model<IMemberDocument>){} 
    
    async generateAccessToken(member: IMemberDocument): Promise<string> {
        const payload = { email: member.email};
        return await sign(payload, JwtAuthenService.secretKey, {expiresIn: 60 * 60});
    }

    async validateUser(payload: any): Promise<IMemberDocument> {
        try {
            return this.MemberSchema.findOne({ email: payload.email});    
        } catch (error) {
            throw error
        }
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: JwtAuthenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtAuthenService.secretKey,
    });
  }

  async validate(payload: { email: string}) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
       throw new UnauthorizedException();
    }
    return user;
  }
}