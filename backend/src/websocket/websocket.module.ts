import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
