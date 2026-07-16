import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        userId,
      },
    });
  }

  async findByPage(pageId: string) {
    return this.prisma.comment.findMany({
      where: { pageId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async delete(id: string) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
