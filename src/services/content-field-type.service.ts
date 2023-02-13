import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentFieldType } from '../common/dtos/cms/ContentFieldType.dto';
import { ContentFieldTypeDocument } from '../common/schemas/content-field-type.schema';

@Injectable()
export class ContentFieldTypeService extends ServiceBase<
  ContentFieldType,
  ContentFieldTypeDocument
> {
  constructor(
    @InjectModel(ContentFieldType.name)
    private _model: Model<ContentFieldTypeDocument>,
  ) {
    super(_model);
  }
  getByFieldId(fieldId: string) {
    return this.findOne({
      contentFieldId: fieldId,
    });
  }
}
