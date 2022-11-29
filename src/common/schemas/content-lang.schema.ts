import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ContentLang } from '../dtos/cms/ContentLang.dto';

export type ContentLangDocument = HydratedDocument<ContentLang>;

export const ContentLangSchema = SchemaFactory.createForClass(ContentLang);
