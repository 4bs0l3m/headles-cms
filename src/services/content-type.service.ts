/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentType } from '../common/dtos/cms/ContentType.dto';
import { ContentTypeDocument } from '../common/schemas/content-type.schema';

@Injectable()
export class ContentTypeService extends ServiceBase<
  ContentType,
  ContentTypeDocument
> {
  constructor(
    @InjectModel(ContentType.name) private _model: Model<ContentTypeDocument>,
  ) {
    super(_model);
  }
}
