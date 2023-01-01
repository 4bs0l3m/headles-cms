import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class UserRole extends BaseDTO {
  @Prop()
  userId: string;
  @Prop()
  roleId: string;
}
export type UserRoleDocument = HydratedDocument<UserRole>;

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);

@Injectable()
export class UserRoleService extends ServiceBase<UserRole, UserRoleDocument> {
  constructor(
    @InjectModel(UserRole.name) private _model: Model<UserRoleDocument>,
  ) {
    super(_model);
  }
  findByUserId(userId) {
    return this._model
      .find({
        userId: userId,
      })
      .exec();
  }
}
