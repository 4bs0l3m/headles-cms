/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from 'src/common/abstracts/ServiceBase';
import { Content } from 'src/common/dtos/cms/Content.dto';
import { ContentDocument } from 'src/common/schemas/content.schema';

@Injectable()
export class ContentService extends ServiceBase<Content, ContentDocument> {
  constructor(
    @InjectModel(Content.name) private _model: Model<ContentDocument>,
  ) {
    super(_model);
  }
}
