import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  displayName: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
