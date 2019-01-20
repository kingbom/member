import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Member') private memberModel: Model<any>){
  }
  
  async getCats() {
    return await this.memberModel.find();
  }
  
  async saveCat(){
    return await this.memberModel.create({
      firstname: "jaruwit",
      lastname: "suriyo",
      email: "kingbom_300432@hotmail.com",
      password: "abc1234",
      position: "developer",
      image: "xxxx.jpg",
      role: 1
    });
  
  }
}
