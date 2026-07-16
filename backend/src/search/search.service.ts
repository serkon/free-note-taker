import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(workspaceId: string, query: string) {
    const pages = await this.prisma.page.findMany({
      where: {
        workspaceId,
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 10,
    });

    const blocks = await this.prisma.block.findMany({
      where: {
        page: {
          workspaceId,
        },
        content: {
          path: ['text'],
          string_contains: query,
        },
      },
      include: { page: true },
      take: 10,
    });

    const databases = await this.prisma.database.findMany({
      where: {
        page: {
          workspaceId,
        },
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 10,
    });

    return {
      pages,
      blocks,
      databases,
    };
  }
}
