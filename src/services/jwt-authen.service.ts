import { Injectable } from "@nestjs/common";
import { IAuthen } from "src/interfaces/authen.interface";
import { IMemberDocument } from "src/interfaces/member.interface";
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtAuthenService implements IAuthen {
    
    private secretKey:string = 'app mermber serice'

    async generateAccessToken(member: IMemberDocument): Promise<string> {
        const payload = { email: member.email};
        return await sign(payload, this.secretKey, {expiresIn: 60 * 60});
    }

    validateUser(accessToken: string): Promise<IMemberDocument> {
        throw new Error("Method not implemented.");
    }

}