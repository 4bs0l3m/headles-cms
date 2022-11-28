/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/dtos/auth/User.dto';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Get('login/:email')
  async getLogin(@Req() request: Request) {
    const email = request.params['email'];
    console.log(email);
    // request.headers.token;
    if (email) {
      let _user = await this.userService.getUserByEmail(email);
      console.log(_user);
      return _user.toJSON();
    }
  }
  @Post('signup')
  async signUp(@Req() request: Request) {
    const userCred: User = request.body;

    if (userCred) {
      const _user = await this.userService.createUser(userCred);
      console.log(_user);
      if (_user) {
        return { id: _user._id };
      }
    }
  }
}
