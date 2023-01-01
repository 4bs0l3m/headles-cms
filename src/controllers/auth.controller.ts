import { TokenDTO } from './../common/dtos/common/TokenDTO';
import { JwtService } from '@nestjs/jwt';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/common/dtos/auth/User.dto';
import { UserService } from 'src/services/user.service';
import { AuthHelper } from 'src/helpers/auth.helper';
import { ResponseDTO } from 'src/common/dtos/common/ResponseDTO';
import { ResponseHelper } from 'src/helpers/response.helper';
import { ProfileService } from 'src/services/profile.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
    private responseHelper: ResponseHelper,
    private profileService: ProfileService,
  ) {}

  @Post('login')
  async signIn(@Req() request: Request) {
    try {
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
        return this.responseHelper.response(access_token, HttpStatus.ACCEPTED);
      }
    } catch (error) {
      return this.responseHelper.response(null, HttpStatus.BAD_REQUEST, error);
    }
  }

  @Get('currentUser')
  async currentUser(@Req() request: Request) {
    try {
      const currentUser = this.authHelper.extractToken(
        request.headers.authorization,
      );
      if (currentUser) {
        const user = await this.userService.findById(currentUser.id);
        const profile = await this.profileService.getProfileByUserId(user.id);
        return this.responseHelper.response(
          {
            id: user.id,
            email: user.email,
            profile: profile,
          },
          HttpStatus.ACCEPTED,
        );
      }
    } catch (error) {
      return this.responseHelper.response(null, HttpStatus.BAD_REQUEST, error);
    }
  }

  @Post('signup')
  async signUp(@Req() request: Request) {
    try {
      const userCred: User = request.body;
      const user = new User();
      if (userCred) {
        user.activated = false;
        user.email = userCred.email;
        user.password = userCred.password;
        const _user = await this.userService.create(user, '');
        if (_user) {
          return this.responseHelper.response(_user.id, HttpStatus.ACCEPTED);
        }
      }
    } catch (error) {
      return this.responseHelper.response(null, HttpStatus.BAD_REQUEST, error);
    }
  }
}
