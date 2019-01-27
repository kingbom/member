import { Injectable, BadRequestException } from "@nestjs/common";
import { IProfile, IAccount } from "src/interfaces/app.interface";
import { InjectModel } from "@nestjs/mongoose";
import { IMemberDocument } from "src/interfaces/member.interface";
import { Model } from "mongoose";
import { BASE_DIR } from "src/main";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { Buffer } from "buffer";

@Injectable()
export class MemberService {

    constructor(@InjectModel('Member') private memberModel: Model<IMemberDocument>){}

    async onUpdateProfile(memberId: string, body : IProfile){
      const memberUpdated = await this.memberModel.update({_id: memberId}, <IAccount> {
         firstname: body.firstname,
         lastname : body.lastname,
         position: body.position,
         image : this.convertImg(memberId, body.image),
         updated: new Date()
      });

      if(!memberUpdated.ok) throw new BadRequestException("Date not updated"); 
      
      const member = await this.memberModel.findById(memberId);
      member.image = member.image ? 'http://localhost:3000' + member.image: '';  
      member.password = "****";
      return member;
    }

    private convertImg(memberId: string, image : string){
      try {
            const imageDir = BASE_DIR +'/uploads';
            if(!existsSync(imageDir)) mkdirSync(imageDir);
            if(image.indexOf('image/jpeg') >= 0){
              const fileName = `${imageDir}/${memberId}.jpeg`;
              writeFileSync(fileName, new Buffer(image.replace('data:image/jpeg;base64', ''), 'base64'));
              return fileName.replace(BASE_DIR, '');
            }
          return '';
      } catch (error) {
         throw new BadRequestException(error.message)
      }
    }

}