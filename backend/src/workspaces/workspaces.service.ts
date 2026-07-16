import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto';

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: {
        ...createWorkspaceDto,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.workspace.findMany({
      where: { ownerId: userId },
    });
  }

  async findById(id: string) {
    return this.prisma.workspace.findUnique({
      where: { id },
    });
  }

  async update(id: string, userId: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.findById(id);
    if (!workspace || workspace.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to update this workspace');
    }

    return this.prisma.workspace.update({
      where: { id },
      data: updateWorkspaceDto,
    });
  }

  async delete(id: string, userId: string) {
    const workspace = await this.findById(id);
    if (!workspace || workspace.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this workspace');
    }

    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
