/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from 'src/common/dtos/auth/UserDTO';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Get('login/:email')
  async getLogin(@Req() request: Request) {
    const email = request.params['email'];
    request.headers.token;
    if (email) {
      let _user = (await this.userService.getByEmail(email))[0];
      return <UserDTO>{
        id: _user.id,
        displayName: _user.displayName,
        email: _user.email,
      };
    }
  }
  @Post('signup')
  async signIn(@Req() request: Request) {
    const userCred: UserDTO = request.body;
    if (userCred) {
      const _user = await this.userService.createUser(userCred);
      if (_user) {
        return { id: _user.id };
      }
    }
  }
}
