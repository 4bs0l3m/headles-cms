import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentField extends BaseDTO {
  @Prop()
  contentTypeId: string;
}
