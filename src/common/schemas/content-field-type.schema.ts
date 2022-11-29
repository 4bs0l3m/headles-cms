import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentFieldType } from '../dtos/cms/ContentFieldType.dto';

export type ContentFieldTypeDocument = HydratedDocument<ContentFieldType>;

export const ContentFieldTypeSchema =
  SchemaFactory.createForClass(ContentFieldType);
