import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentFieldType extends BaseDTO {
  @Prop()
  contentFieldId: string;

  @Prop()
  name: string;
}
