import { Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { ResponseHelper } from './../helpers/response.helper';
import { AuthHelper } from './../helpers/auth.helper';
import { Content } from './../common/dtos/cms/Content.dto';
import { ContentService } from './../services/content.service';
import { Request } from 'express';
import { ContentFieldDataService } from '../services/content-field-data.service';
import { ContentFieldData } from '../common/dtos/cms/ContentFieldData.dto';
import { ContentTypeFieldService } from 'src/services/content-type-field.service';

/*
https://docs.nestjs.com/controllers#controllers
*/

@Controller('content')
export class ContentController {
  constructor(
    private authHelper: AuthHelper,
    private responseHelper: ResponseHelper,
    private contentService: ContentService,
    private contentFieldDataService: ContentFieldDataService,
    private contentTypeFieldService: ContentTypeFieldService,
  ) {}
  @Get('list/:id')
  getContents(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const contentTypeId = request.params.id;
  }
  @Post('create')
  async create(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload: Content = request.body;
    const content = new Content();
    content.lang = payload.lang;
    content.contentTypeId = payload.contentTypeId;
    content.mode = payload.mode;
    const createdContent = await this.contentService.create(content, user.id);

    return await this.responseHelper.response(
      createdContent,
      HttpStatus.ACCEPTED,
    );
  }

  @Post('fielddata/create/:id')
  async createFieldData(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const contentId = request.params.id;
    const content = await this.contentService.findById(contentId);
    const payload = <ContentFieldData>request.body;
    const contentFieldData = new ContentFieldData();
    contentFieldData.contentTypeFieldId = payload.contentTypeFieldId;
    contentFieldData.ContentId = content.id;
    contentFieldData.lang = content.lang;
    contentFieldData.data = payload.data;
    const createdFieldData = await this.contentFieldDataService.create(
      contentFieldData,
      user.id,
    );
    return this.responseHelper.response(createdFieldData, HttpStatus.ACCEPTED);
  }

  @Post('fielddata/update')
  async updateFieldData(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload = <ContentFieldData>request.body;
    const contentFieldData = new ContentFieldData();
    contentFieldData.data = payload.data;
    const updatedFieldData = await this.contentFieldDataService.updateById(
      payload.id,
      contentFieldData,
      user.id,
    );
    return this.responseHelper.response(updatedFieldData, HttpStatus.ACCEPTED);
  }

  @Post('update')
  async update(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const payload = <Content>request.body;
    const content = new Content();
    if (payload.contentTypeId) {
      content.contentTypeId = payload.contentTypeId;
    }
    if (payload.lang) {
      content.lang = payload.lang;
    }
    const updatedContent = await this.contentService.updateById(
      payload.id,
      content,
      user.id,
    );

    return this.responseHelper.response(updatedContent, HttpStatus.ACCEPTED);
  }

  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const user = this.authHelper.extractToken(request.headers.authorization);
    const contentId = request.params.id;
    const deletedContent = await this.contentService.deleteById(
      contentId,
      user.id,
    );
    return this.responseHelper.response(deletedContent, HttpStatus.ACCEPTED);
  }

  @Get(':id')
  async getById(@Req() request: Request) {
    // const user = this.authHelper.extractToken(request.headers.authorization);
    const contentId = request.params.id;
    const content = await this.contentService.findById(contentId);
    const contentTypeFields =
      await this.contentTypeFieldService.getByContentTypeId(
        content.contentTypeId,
      );
    const contentFieldDatas = await this.contentFieldDataService.getByContentId(
      contentId,
    );
    let fieldDatas = [];
    contentFieldDatas.forEach((fieldItem) => {
      let contentTypeField = contentTypeFields.find(
        (x) => x.contentFieldTypeId === fieldItem.contentTypeFieldId,
      );
      if (contentTypeField) {
        fieldDatas.push({
          id: fieldItem.id,
          name: contentTypeField.name,
          value: fieldItem.data,
        });
      }
    });
    return this.responseHelper.response(
      {
        content: content,
        fieldDatas: fieldDatas,
      },
      HttpStatus.ACCEPTED,
    );
  }
}
