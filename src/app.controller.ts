import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return 'dd';
  }
}
