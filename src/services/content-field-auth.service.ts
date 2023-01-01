import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserRoleService } from './user-role.service';

@Schema()
export class ContentFieldAuth extends BaseDTO {
  @Prop()
  contentTypeFieldId: string;
  @Prop()
  roleId: string;

  //permissions
  @Prop()
  read: string;
  @Prop()
  write: string;
  @Prop()
  delete: string;
  @Prop()
  create: string;
}
export type ContentFieldAuthDocument = HydratedDocument<ContentFieldAuth>;

export const ContentFieldAuthSchema =
  SchemaFactory.createForClass(ContentFieldAuth);

@Injectable()
export class ContentFieldAuthService extends ServiceBase<
  ContentFieldAuth,
  ContentFieldAuthDocument
> {
  constructor(
    @InjectModel(ContentFieldAuth.name)
    private _model: Model<ContentFieldAuthDocument>,
    private userRoleService: UserRoleService,
  ) {
    super(_model);
  }
  fintByRoleId(roleId: string) {
    return this._model
      .find({
        roleId: roleId,
      })
      .exec();
  }
  async getFieldPermissionsByUserId(userId: string) {
    const roles = await this.userRoleService.findByUserId(userId);
    const roleFilter = roles.map((item) => {
      return { roleId: item.roleId };
    });
    return this._model.find(roleFilter).exec();
  }
}
