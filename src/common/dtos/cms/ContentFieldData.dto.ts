import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentFieldData extends BaseDTO {
  @Prop()
  ContentId: string;

  @Prop()
  contentTypeFieldId: string;

  @Prop()
  lang: string;

  @Prop()
  data: string;
}
