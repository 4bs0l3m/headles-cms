/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { ResponseHelper } from './../helpers/response.helper';
import { AuthHelper } from './../helpers/auth.helper';
import { Request } from 'express';
import { Message, MessageService } from '../services/message.service';

@Controller('message')
export class MessageController {
  constructor(
    private authHelper: AuthHelper,
    private responseHelper: ResponseHelper,
    private messageService: MessageService,
  ) {}
  @Post('create')
  create(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload = <Message>request.body;
    const message = new Message();
    message.userId = user.id;
    message.fromUserId = payload.fromUserId;
    message.context = payload.context;
    this.messageService.create(message, user.id);
    return this.responseHelper.response(new Date().getTime());
  }
}
