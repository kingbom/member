import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRegister, IAccount, RoleAccount, ILogin } from 'src/interfaces/app.interface';
import { IMemberDocument } from 'src/interfaces/member.interface';
import { generate, verify } from 'password-hash';
import { JwtAuthenService } from './jwt-authen.service';
import { DbAuthenService } from './db-authen.service';

@Injectable()
export class AccountService {
  constructor(
    private authenService: DbAuthenService,
    @InjectModel('Member') private memberModel: Model<IMemberDocument>
    ){
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
    member.password = generate(member.password);
    member.image ='';
    member.position ='';
    member.role = RoleAccount.Member;
    const memberItem = await this.memberModel.create(member);
    memberItem.password = '';
    return memberItem;
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

  /**
   * Login
   * @param req 
   * return accessToken
   */ 
  async onLogin(req: ILogin){
    const member = await this.memberModel.findOne({email: req.email});
    if(!member) throw new BadRequestException('User not found'); 
    if(!verify(req.password, member.password)) throw new BadRequestException('Email or Password incorrect');
    return {accessToken: await this.authenService.generateAccessToken(member)};
  }
}
