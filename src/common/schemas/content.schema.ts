import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Content } from '../dtos/cms/Content.dto';

export type ContentDocument = HydratedDocument<Content>;

export const ContentSchema = SchemaFactory.createForClass(Content);
