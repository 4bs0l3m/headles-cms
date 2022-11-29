import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBase } from '../common/abstracts/ServiceBase';
import { ContentLang } from '../common/dtos/cms/ContentLang.dto';
import { ContentLangDocument } from '../common/schemas/content-lang.schema';

@Injectable()
export class ContentLangService extends ServiceBase<
  ContentLang,
  ContentLangDocument
> {
  constructor(
    @InjectModel(ContentLang.name) private _model: Model<ContentLangDocument>,
  ) {
    super(_model);
  }
}
