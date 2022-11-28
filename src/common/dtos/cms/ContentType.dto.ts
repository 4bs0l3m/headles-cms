import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentType extends BaseDTO {
  @Prop()
  name: string;
}
