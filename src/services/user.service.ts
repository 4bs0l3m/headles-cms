/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/common/dtos/auth/UserDTO';
import { User, UserDocument } from 'src/common/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  createUser(model: UserDTO) {
    const createdUser = new this.userModel(model);
    return createdUser.save();
  }
  findAll() {
    return this.userModel.find().exec();
  }
  getByEmail(email) {
    return this.userModel.find({ email: email });
  }
}
