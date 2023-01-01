/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Req, HttpStatus, Get } from '@nestjs/common';
import { AuthHelper } from 'src/helpers/auth.helper';
import { ResponseHelper } from 'src/helpers/response.helper';
import { Request } from 'express';
import { Profile, ProfileService } from 'src/services/profile.service';
import { UserService } from 'src/services/user.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private authHelper: AuthHelper,
    private responseHelper: ResponseHelper,
    private profileService: ProfileService,
    private userService: UserService,
  ) {}
  @Post('create')
  async create(@Req() request: Request) {
    const userId = this.authHelper.extractToken(
      request.headers.authorization,
    ).id;
    const user = this.userService.findById(userId);
    const payload = <Profile>request.body;
    payload.userId = userId;
    const createdProfile = this.profileService.create(payload, userId);
    return this.responseHelper.response(createdProfile);
  }
  @Post('update')
  async update(@Req() request: Request) {
    const userId = this.authHelper.extractToken(
      request.headers.authorization,
    ).id;

    const payload = <Profile>request.body;
    payload.userId = userId;
    const profile = await this.profileService.findOne({ userId: userId });
    const updatedProfile = this.profileService.updateById(
      profile.id,
      payload,
      userId,
    );
    return this.responseHelper.response(updatedProfile);
  }
}
