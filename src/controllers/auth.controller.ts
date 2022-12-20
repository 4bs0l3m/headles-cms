import { TokenDTO } from './../common/dtos/common/TokenDTO';
import { JwtService } from '@nestjs/jwt';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/dtos/auth/User.dto';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('login')
  async signIn(@Req() request: Request) {
    const userCred = request.body;
    if (userCred) {
      const _user = await this.userService.getUserByEmailPassword(
        userCred.email,
        userCred.password,
      );
      const access_token = this.jwtService.sign({
        id: _user.id,
        email: _user.email,
      });
      return {
        acces_token: access_token,
      };
    }
  }

  @Get('currentUser')
  async currentUser(@Req() request: Request) {
    const access_token = <string>request.headers.token;
    const currentUser = this.jwtService.verify<TokenDTO>(access_token);
    return {
      id: currentUser.id,
      email: currentUser.email,
    };
  }
  @Post('signup')
  async signUp(@Req() request: Request) {
    const userCred: User = request.body;
    const userId = request.header('user-id');
    if (userCred) {
      const _user = await this.userService.create(userCred, userId);
      if (_user) {
        return { id: _user.id };
      }
    }
  }
}
