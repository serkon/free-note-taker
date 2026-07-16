import { Module } from '@nestjs/common';
import { PagesShareService } from './pages-share.service';
import { PagesShareController } from './pages-share.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PagesShareService],
  controllers: [PagesShareController],
})
export class PagesShareModule {}
