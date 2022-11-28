import { BaseDTO } from '../common/BaseDTO';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentFieldData extends BaseDTO {
  @Prop()
  ContentId: string;

  @Prop()
  data: any;
}
