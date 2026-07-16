import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BlocksService],
  controllers: [BlocksController],
})
export class BlocksModule {}
