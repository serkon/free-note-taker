import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto, UpdatePageDto } from './dto';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPageDto: CreatePageDto) {
    return this.prisma.page.create({
      data: {
        ...createPageDto,
        createdById: userId,
      },
      include: { children: true },
    });
  }

  async findByWorkspace(workspaceId: string) {
    return this.prisma.page.findMany({
      where: { workspaceId, parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.page.findUnique({
      where: { id },
      include: { children: true, blocks: true },
    });
  }

  async getHierarchy(id: string) {
    const page = await this.prisma.page.findUnique({
      where: { id },
    });

    if (!page) throw new NotFoundException('Page not found');

    const hierarchy = await this._buildHierarchy(id);
    return hierarchy;
  }

  private async _buildHierarchy(pageId: string): Promise<any> {
    const page = await this.prisma.page.findUnique({
      where: { id: pageId },
      include: { children: true },
    });

    if (!page) return null;

    const children = await Promise.all(
      page.children.map((child) => this._buildHierarchy(child.id)),
    );

    return {
      ...page,
      children,
    };
  }

  async update(id: string, userId: string, updatePageDto: UpdatePageDto) {
    const page = await this.findById(id);
    if (!page) throw new NotFoundException('Page not found');
    if (page.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to update this page');
    }

    return this.prisma.page.update({
      where: { id },
      data: updatePageDto,
    });
  }

  async delete(id: string, userId: string) {
    const page = await this.findById(id);
    if (!page) throw new NotFoundException('Page not found');
    if (page.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to delete this page');
    }

    return this.prisma.page.delete({
      where: { id },
    });
  }
}
