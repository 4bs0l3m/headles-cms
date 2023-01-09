import { ResponseHelper } from './../helpers/response.helper';
import { ContentType } from './../common/dtos/cms/ContentType.dto';
import { AuthHelper } from './../helpers/auth.helper';
import { ContentTypeService } from './../services/content-type.service';
import { Request } from 'express';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Req, HttpStatus, Get } from '@nestjs/common';
import { Content } from 'src/common/dtos/cms/Content.dto';
import { ContentTypeFieldService } from '../services/content-type-field.service';
import { ContentTypeField } from '../common/dtos/cms/ContentTypeField.dto';

@Controller('content-type')
export class ContentTypeController {
  constructor(
    private authHelper: AuthHelper,
    private contentTypeService: ContentTypeService,
    private contentTypeFieldService: ContentTypeFieldService,
    private responseHelper: ResponseHelper,
  ) {}

  @Post('create')
  async create(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload = <ContentType>request.body;
    const contentType = new ContentType();
    contentType.name = payload.name;
    const createdContentTypeId = await this.contentTypeService.create(
      contentType,
      user.id,
    );
    return this.responseHelper.response(
      createdContentTypeId,
      HttpStatus.ACCEPTED,
    );
  }

  @Post('update')
  async update(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload = <ContentType>request.body;
    const contentType = new ContentType();
    contentType.name = payload.name;
    const updatedContentType = await this.contentTypeService.updateById(
      payload.id,
      contentType,
      user.id,
    );
    return this.responseHelper.response(
      updatedContentType,
      HttpStatus.ACCEPTED,
    );
  }

  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const contentTypeId = request.params.id;
    this.contentTypeService.deleteById(contentTypeId, user.id);
    const deletedContentType = await this.contentTypeService.deleteById(
      contentTypeId,
      user.id,
    );
    return this.responseHelper.response(deletedContentType);
  }

  @Post('field/create/:id')
  async createField(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const contentTypeId = request.params.id;
    const payload = <ContentTypeField>request.body;
    const contentTypeField = new ContentTypeField();
    contentTypeField.contentTypeId = contentTypeId;
    contentTypeField.name = payload.name;
    const createdContentFieldId = await this.contentTypeFieldService.create(
      contentTypeField,
      user.id,
    );
    return this.responseHelper.response(createdContentFieldId);
  }

  @Post('field/update/:id')
  async updateField(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload = <ContentTypeField>request.body;
    const contentTypeField = await this.contentTypeFieldService.findById(
      payload.id,
    );
    contentTypeField.name = payload.name;
    const updatedContentFieldId = await this.contentTypeFieldService.updateById(
      payload.id,
      contentTypeField,
      user.id,
    );
    return this.responseHelper.response(updatedContentFieldId);
  }

  @Get('field/delete/:id')
  async deleteField(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const contentTypeFieldId = request.params.id;
    const deletedContentTypeFieldId =
      await this.contentTypeFieldService.deleteById(
        contentTypeFieldId,
        user.id,
      );
    return this.responseHelper.response(deletedContentTypeFieldId);
  }
}
