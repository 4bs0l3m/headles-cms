import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../common/dtos/auth/User.dto';
import { UserDocument } from '../common/schemas/user.schema';
import { DataService } from './data.service';
import { ServiceBase } from '../common/abstracts/ServiceBase';

@Injectable()
export class UserService extends ServiceBase<User, UserDocument> {
  constructor(
    @InjectModel(User.name) private _model: Model<UserDocument>,
    private dataService: DataService,
  ) {
    super(_model);
  }

  getUserByEmailPassword(email, password) {
    return this._model.findOne({ email: email, password: password }).exec();
  }
  getUserById(id) {
    return this._model.findById(id).exec();
  }
  getUsers() {
    return this._model.find().exec();
  }
}
