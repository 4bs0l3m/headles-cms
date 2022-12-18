import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDTO } from '../common/BaseDTO';

@Schema()
export class ContentTypeTemplate extends BaseDTO {
  @Prop()
  contentTypeId: string;

  @Prop()
  mode: number;

  @Prop()
  template: string;
}
