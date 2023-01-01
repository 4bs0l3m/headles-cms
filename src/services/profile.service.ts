import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Profile extends BaseDTO {
  @Prop()
  userId: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  birthday: Date;
}
export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

@Injectable()
export class ProfileService extends ServiceBase<Profile, ProfileDocument> {
  constructor(
    @InjectModel(Profile.name) private _model: Model<ProfileDocument>,
  ) {
    super(_model);
  }
  getProfileByUserId(userId) {
    return this._model
      .findOne({
        userId: userId,
      })
      .exec();
  }
}
