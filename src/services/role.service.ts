import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Role extends BaseDTO {
  @Prop()
  roleName: string;
}
export type RoleDocument = HydratedDocument<Role>;

export const RoleSchema = SchemaFactory.createForClass(Role);

@Injectable()
export class RoleService extends ServiceBase<Role, RoleDocument> {
  constructor(@InjectModel(Role.name) private _model: Model<RoleDocument>) {
    super(_model);
  }
}
