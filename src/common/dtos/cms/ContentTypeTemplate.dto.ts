import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class ContentTypeTemplate {
  @Prop()
  mode: number;

  @Prop()
  template: string;
}
