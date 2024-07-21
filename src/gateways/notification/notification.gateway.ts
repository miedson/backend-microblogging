import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PayloadJwt } from 'src/users/authentication/types/payload-jwt.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type Client = {
  clientId: string;
  socket: Socket;
  user: PayloadJwt;
}

@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}
  @WebSocketServer()
  private server: Server;
  private clients: Client[] = []; 

  handleConnection(socket: Socket) {
    const clientId = socket.id;
    const { authorization } = socket.handshake.headers;
    const secret = this.configService.get<string>('SECRET_JWT');
    if(!authorization) {
      socket.disconnect();
    }
    const user = this.jwtService.verify<PayloadJwt>(authorization, { secret });
    this.clients.push({
      clientId,
      socket,
      user,
    });
    
    socket.on('disconnect', () => {
      const newClients = this.clients.filter(client => client.clientId !== clientId);
      this.clients = newClients;
  });
  }

  @SubscribeMessage('notification')
  handleNotification(@MessageBody() data: string): void {
    console.log(data);
  }

  sendNotificationForUser(uuid: string, event: string, message: string) {
    const client = this.clients.find(client => client.user.uuid === uuid);
    if(client) {
      const { socket } = client;
      socket.emit(event, message);
    }
  }

  sendBroadcast(event: string, message: string) {
    this.server.emit(event, message);
  }
}
