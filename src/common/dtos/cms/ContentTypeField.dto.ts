import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentTypeField extends BaseDTO {
  @Prop()
  contentTypeId: string;

  @Prop()
  name: string;

  @Prop()
  contentFieldTypeId: string;
}
