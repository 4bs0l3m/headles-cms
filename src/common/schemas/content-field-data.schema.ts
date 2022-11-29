import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentFieldData } from '../dtos/cms/ContentFieldData.dto';

export type ContentFieldDataDocument = HydratedDocument<ContentFieldData>;

export const ContentFieldDataSchema =
  SchemaFactory.createForClass(ContentFieldData);
