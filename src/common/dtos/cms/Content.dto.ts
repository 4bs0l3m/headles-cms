import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Content extends BaseDTO {
  @Prop()
  contentTypeId: string;
}
