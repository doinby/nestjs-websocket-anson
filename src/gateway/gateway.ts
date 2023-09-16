import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  // cors
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`${socket.id} connected`);
    });
  }

  @SubscribeMessage('message')
  onNewMessage(@MessageBody() body: object) {
    console.log(body);
    this.server.emit('message', {
      event: 'newMessage',
      data: body,
    });
  }
}
