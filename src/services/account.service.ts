import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRegister, IAccount, RoleAccount } from 'src/interfaces/app.interface';

@Injectable()
export class AccountService {
  constructor(@InjectModel('Member') private memberModel: Model<any>){
  }
  
  /**
   * Register
   * @param reqBody 
   * return merber
   */
  async onRegister(reqBody: IRegister){
    await this.onValidateEmailDuplicate(reqBody);
    delete reqBody.cpassword;
    const member : IAccount = reqBody;
    member.image ='';
    member.position ='';
    member.role = RoleAccount.Member;
    return await this.memberModel.create(member);
  }

  async onValidateEmailDuplicate(reqBody: IRegister){
    const checkDuplicateEmail = await this.memberModel.count({ email: reqBody.email });
    if(checkDuplicateEmail) throw new BadRequestException('email is duplicate');
  }

  /**
   * Find all member
   * return list member
   */
  async onGetMembers(){
      return await this.memberModel.find();
  }
}
