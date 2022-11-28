import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentFieldType extends BaseDTO {
  @Prop()
  name: string;
}
