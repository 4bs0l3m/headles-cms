import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentTypeField } from '../dtos/cms/ContentTypeField.dto';

export type ContentTypeFieldDocument = HydratedDocument<ContentTypeField>;

export const ContentTypeFieldSchema =
  SchemaFactory.createForClass(ContentTypeField);
