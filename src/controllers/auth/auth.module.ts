import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from 'src/env.const';
import { User, UserSchema } from 'src/common/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoURL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
