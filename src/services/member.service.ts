import { Injectable, BadRequestException } from "@nestjs/common";
import { IProfile, IAccount } from "src/interfaces/app.interface";
import { InjectModel } from "@nestjs/mongoose";
import { IMemberDocument } from "src/interfaces/member.interface";
import { Model } from "mongoose";

@Injectable()
export class MemberService {

    constructor(@InjectModel('Member') private memberModel: Model<IMemberDocument>){}

    async onUpdateProfile(memberId: string, body : IProfile){
      const memberUpdated = await this.memberModel.update({_id: memberId}, <IAccount> {
         firstname: body.firstname,
         lastname : body.lastname,
         position: body.position,
         image : body.image,
         updated: new Date()
      });

      if(!memberUpdated.ok) throw new BadRequestException("Date not updated"); 
      
      const member = await this.memberModel.findById(memberId);
      member.password = "****";
      return member;
    }

}