import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentTypeTemplate } from '../common/dtos/cms/ContentTypeTemplate.dto';
import { ContentTypeTemplateDocument } from '../common/schemas/content-type-template.schema';

@Injectable()
export class ContentTypeTemplateService extends ServiceBase<
  ContentTypeTemplate,
  ContentTypeTemplateDocument
> {
  constructor(
    @InjectModel(ContentTypeTemplate.name)
    private _model: Model<ContentTypeTemplateDocument>,
  ) {
    super(_model);
  }
}
