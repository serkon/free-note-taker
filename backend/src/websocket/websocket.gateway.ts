import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private connectedUsers: Map<string, string[]> = new Map();
  private pageUsers: Map<string, string[]> = new Map();

  constructor(private prisma: PrismaService) {}

  afterInit(server: Server) {
    console.log('✅ WebSocket initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('page:join')
  handlePageJoin(client: Socket, data: { pageId: string; userId: string }) {
    const { pageId, userId } = data;
    client.join(`page:${pageId}`);

    if (!this.pageUsers.has(pageId)) {
      this.pageUsers.set(pageId, []);
    }
    const users = this.pageUsers.get(pageId);
    if (!users.includes(userId)) {
      users.push(userId);
    }

    this.server.to(`page:${pageId}`).emit('presence:updated', {
      pageId,
      users: Array.from(this.pageUsers.get(pageId) || []),
    });
  }

  @SubscribeMessage('page:leave')
  handlePageLeave(client: Socket, data: { pageId: string; userId: string }) {
    const { pageId, userId } = data;
    client.leave(`page:${pageId}`);

    const users = this.pageUsers.get(pageId);
    if (users) {
      const index = users.indexOf(userId);
      if (index > -1) {
        users.splice(index, 1);
      }
    }

    this.server.to(`page:${pageId}`).emit('presence:updated', {
      pageId,
      users: Array.from(this.pageUsers.get(pageId) || []),
    });
  }

  @SubscribeMessage('block:update')
  handleBlockUpdate(client: Socket, data: any) {
    const { pageId, ...blockData } = data;
    this.server.to(`page:${pageId}`).emit('block:updated', blockData);
  }

  @SubscribeMessage('block:create')
  handleBlockCreate(client: Socket, data: any) {
    const { pageId, ...blockData } = data;
    this.server.to(`page:${pageId}`).emit('block:created', blockData);
  }

  @SubscribeMessage('block:delete')
  handleBlockDelete(client: Socket, data: any) {
    const { pageId, blockId } = data;
    this.server.to(`page:${pageId}`).emit('block:deleted', { blockId });
  }
}
