import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlockDto, UpdateBlockDto } from './dto';

@Injectable()
export class BlocksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createBlockDto: CreateBlockDto) {
    return this.prisma.block.create({
      data: {
        ...createBlockDto,
        createdById: userId,
      },
    });
  }

  async findByPage(pageId: string) {
    return this.prisma.block.findMany({
      where: { pageId },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.block.findUnique({
      where: { id },
    });
  }

  async update(id: string, userId: string, updateBlockDto: UpdateBlockDto) {
    const block = await this.findById(id);
    if (!block) throw new NotFoundException('Block not found');
    if (block.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to update this block');
    }

    return this.prisma.block.update({
      where: { id },
      data: updateBlockDto,
    });
  }

  async delete(id: string, userId: string) {
    const block = await this.findById(id);
    if (!block) throw new NotFoundException('Block not found');
    if (block.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to delete this block');
    }

    return this.prisma.block.delete({
      where: { id },
    });
  }
}
