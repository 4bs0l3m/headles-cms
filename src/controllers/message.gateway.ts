/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ResponseHelper } from '../helpers/response.helper';
import { Message, MessageService } from '../services/message.service';

@WebSocketGateway(81)
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private responseHelper: ResponseHelper,
    private messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: any;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: Message, @ConnectedSocket() client: any) {
    console.log(data);
    console.log(client.id);
    console.log(this.server);
    // this.server;
    this.server.emit('message', data);

    return data;
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
