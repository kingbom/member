import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Cat') private catModel: Model<any>){
  }
  
  async getCats() {
    return await this.catModel.find();
  }
  
  async saveCat(){
    const model = new this.catModel({name : 'Test', age : Math.random()});
    return await model.save();
  }
}
