import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserRoleService } from './user-role.service';

@Schema()
export class ContentAuth extends BaseDTO {
  @Prop()
  contentTypeId: string;
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
export type ContentAuthDocument = HydratedDocument<ContentAuth>;

export const ContentAuthSchema = SchemaFactory.createForClass(ContentAuth);

@Injectable()
export class ContentAuthService extends ServiceBase<
  ContentAuth,
  ContentAuthDocument
> {
  constructor(
    @InjectModel(ContentAuth.name) private _model: Model<ContentAuthDocument>,
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
  async getContentPermissionsByUserId(userId: string) {
    const roles = await this.userRoleService.findByUserId(userId);
    const roleFilter = roles.map((item) => {
      return { roleId: item.roleId };
    });
    const contentAuths = await this._model.find(roleFilter).exec();
    return contentAuths;
  }
}
