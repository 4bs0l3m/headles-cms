import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentLang extends BaseDTO {
  @Prop()
  lang: string;
}
