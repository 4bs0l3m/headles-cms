import { Prop, Schema } from '@nestjs/mongoose';
import { BaseDTO } from '../common/BaseDTO';
@Schema()
export class User extends BaseDTO {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  displayName: string;

  @Prop()
  activated: boolean;
}
