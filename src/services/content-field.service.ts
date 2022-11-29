import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentField } from '../common/dtos/cms/ContentField.dto';
import { ContentFieldDocument } from '../common/schemas/content-field.schema';

@Injectable()
export class ContentFieldService extends ServiceBase<
  ContentField,
  ContentFieldDocument
> {
  constructor(
    @InjectModel(ContentField.name) private _model: Model<ContentFieldDocument>,
  ) {
    super(_model);
  }
}
