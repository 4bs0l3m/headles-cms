import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentField } from '../dtos/cms/ContentField.dto';

export type ContentFieldDocument = HydratedDocument<ContentField>;

export const ContentFieldSchema = SchemaFactory.createForClass(ContentField);
