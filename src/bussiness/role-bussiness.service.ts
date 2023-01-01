import { UserRoleService } from './../services/user-role.service';
import { ContentTypeFieldService } from './../services/content-type-field.service';
import { ContentTypeService } from './../services/content-type.service';
import { ContentService } from './../services/content.service';
import { ContentFieldAuth } from './../services/content-field-auth.service';
import {
  ContentAuth,
  ContentAuthService,
} from './../services/content-auth.service';
import { RoleService } from './../services/role.service';
import { UserService } from './../services/user.service';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleBussinessService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private contentAuthService: ContentAuthService,
    private contentFieldAuthService: ContentFieldAuth,
    private contentTypeService: ContentTypeService,
    private contentTypeFieldService: ContentTypeFieldService,
    private userRoleService: UserRoleService,
  ) {}
  async getContentPermissionsByUserId(userId: string) {
    const roles = await this.userRoleService.findByUserId(userId);
    const contentAuths = [];
    await roles.forEach(async (roleItem) => {
      await (
        await this.contentAuthService.fintByRoleId(roleItem.roleId)
      ).forEach((contentAuthItem) => {
        contentAuths.push(contentAuthItem);
      });
    });
    return <ContentAuth[]>contentAuths;
  }
}
