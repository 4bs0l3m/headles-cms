import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentTypeField } from '../common/dtos/cms/ContentTypeField.dto';
import { ContentTypeFieldDocument } from '../common/schemas/content-type-field.schema';

@Injectable()
export class ContentTypeFieldService extends ServiceBase<
  ContentTypeField,
  ContentTypeFieldDocument
> {
  constructor(
    @InjectModel(ContentTypeField.name)
    private _model: Model<ContentTypeFieldDocument>,
  ) {
    super(_model);
  }
}
