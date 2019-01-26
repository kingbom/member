import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AccountService } from './services/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';
import { AccountController } from './controllers/account.controller';
import { DbAuthenService, DbAuthenStrategy } from './services/db-authen.service';
import { accessTokenSchema } from './schemas/access-token.schema';
import { JwtAuthenService, JwtStrategy } from './services/jwt-authen.service';
import { MemberController } from './controllers/member.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/member'),
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema },
      { name: 'AccessToken', schema: accessTokenSchema }
    ])
  ],
  controllers: [
    AppController, 
    AccountController,
    MemberController
  ],
  providers: [
     AppService,
     AccountService, 
     DbAuthenService, 
     DbAuthenStrategy,
     JwtAuthenService,
     JwtStrategy
    ],
})
export class AppModule {}
