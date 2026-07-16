import { Module } from '@nestjs/common';
import { DatabaseRecordsService } from './database-records.service';
import { DatabaseRecordsController } from './database-records.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DatabaseRecordsService],
  controllers: [DatabaseRecordsController],
})
export class DatabaseRecordsModule {}
