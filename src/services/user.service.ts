/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/dtos/auth/User.dto';
import { UserDocument } from '../common/schemas/user.schema';
import { DataService } from './data.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private dataService: DataService,
  ) {}
  createUser(model: User) {
    const createdUser = new this.model({
      id: model.id,
      email: model.email,
      displayName: model.displayName,
      password: model.password,
      metadata: this.dataService.getNewMetadata(),
    });
    return createdUser.save();
  }
  getUserByEmail(email) {
    return this.model.findOne({ email: email }).exec();
  }
  getUserById(id) {
    return this.model.findById(id).exec();
  }
  getUsers() {
    return this.model.find().exec();
  }
}
