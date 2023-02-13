/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentFieldData } from '../common/dtos/cms/ContentFieldData.dto';
import { ContentFieldDataDocument } from '../common/schemas/content-field-data.schema';

@Injectable()
export class ContentFieldDataService extends ServiceBase<
  ContentFieldData,
  ContentFieldDataDocument
> {
  constructor(
    @InjectModel(ContentFieldData.name)
    private _model: Model<ContentFieldDataDocument>,
  ) {
    super(_model);
  }
  getByContentId(contentId: string) {
    return this.find({
      ContentId: contentId,
    });
  }
}
