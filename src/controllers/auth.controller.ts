import { TokenDTO } from './../common/dtos/common/TokenDTO';
import { JwtService } from '@nestjs/jwt';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/dtos/auth/User.dto';
import { UserService } from 'src/services/user.service';
import { AuthHelper } from 'src/helpers/auth.helper';
import { ResponseDTO } from 'src/common/dtos/common/ResponseDTO';
import { HTTP_STATUS } from 'src/common/const/http-status.const';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
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
    try {
      const currentUser = this.authHelper.extractToken<TokenDTO>(
        request.headers.authorization,
      );
      if (currentUser) {
        const user = await this.userService.findById(currentUser.id);
        return <ResponseDTO>{
          data: {
            id: user.id,
            email: user.email,
          },
          code: HTTP_STATUS.SUCCESS,
        };
      }
    } catch (error) {
      return <ResponseDTO>{
        error: error,
        code: HTTP_STATUS.BAD_REQUEST,
      };
    }
  }

  @Post('signup')
  async signUp(@Req() request: Request) {
    const userCred: User = request.body;

    if (userCred) {
      userCred.activated = false;
      const _user = await this.userService.create(userCred, '');
      if (_user) {
        return { id: _user.id };
      }
    }
  }
}
