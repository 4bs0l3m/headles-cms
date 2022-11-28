import { Prop, Schema } from '@nestjs/mongoose';

export class BaseDTO {
  @Prop()
  id?: string;
  @Prop()
  code?: string;
  @Prop({ type: Object })
  metadata?: {
    createdTime?: string;
    modifiedTime?: string;
    createdBy?: string;
    modifiedBy?: string;
  };
}
