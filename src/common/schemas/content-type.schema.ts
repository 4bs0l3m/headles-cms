import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentType } from '../dtos/cms/ContentType.dto';

export type ContentTypeDocument = HydratedDocument<ContentType>;

export const ContentTypeSchema = SchemaFactory.createForClass(ContentType);
