/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/dtos/auth/User.dto';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('login')
  async getLogin(@Req() request: Request) {
    const userCred = request.body;

    if (userCred) {
      const _user = await this.userService.getUserByEmailPassword(
        userCred.email,
        userCred.password,
      );
      console.log(_user);
      return _user.toJSON();
    }
  }
  @Post('signup')
  async signUp(@Req() request: Request) {
    const userCred: User = request.body;
    const userId = request.header('user-id');
    console.log('userId :', userId);
    if (userCred) {
      const _user = await this.userService.create(userCred, userId);
      console.log(_user);
      if (_user) {
        return { id: _user.id };
      }
    }
  }
}
