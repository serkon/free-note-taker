import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageShareDto } from './dto';

@Injectable()
export class PagesShareService {
  constructor(private prisma: PrismaService) {}

  async create(createPageShareDto: CreatePageShareDto) {
    return this.prisma.pageShare.create({
      data: createPageShareDto,
    });
  }

  async findByPage(pageId: string) {
    return this.prisma.pageShare.findMany({
      where: { pageId },
      include: { sharedWithUser: true },
    });
  }

  async delete(id: string) {
    return this.prisma.pageShare.delete({
      where: { id },
    });
  }
}
