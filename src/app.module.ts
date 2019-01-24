import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AccountService } from './services/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';
import { AccountController } from './controllers/account.controller';
import { DbAuthenService } from './services/db-authen.service';
import { accessTokenSchema } from './schemas/access-token.schema';

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
    AccountController
  ],
  providers: [AppService, AccountService, DbAuthenService],
})
export class AppModule {}
