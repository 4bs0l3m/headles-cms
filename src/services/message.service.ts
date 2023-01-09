import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Message extends BaseDTO {
  @Prop()
  userId: string;
  @Prop()
  fromUserId: string;
  @Prop()
  context: string;
}
export type MessageDocument = HydratedDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);

@Injectable()
export class MessageService extends ServiceBase<Message, MessageDocument> {
  constructor(
    @InjectModel(Message.name) private _model: Model<MessageDocument>,
  ) {
    super(_model);
  }
}
