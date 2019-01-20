import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schemas/member.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/member'),
    MongooseModule.forFeature([
      { name: 'Member', schema: MemberSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
