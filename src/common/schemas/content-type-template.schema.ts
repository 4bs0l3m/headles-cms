import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentTypeTemplate } from '../dtos/cms/ContentTypeTemplate.dto';

export type ContentTypeTemplateDocument = HydratedDocument<ContentTypeTemplate>;

export const ContentTypeTemplateSchema =
  SchemaFactory.createForClass(ContentTypeTemplate);
