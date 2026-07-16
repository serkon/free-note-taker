import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDatabaseDto, UpdateDatabaseDto } from './dto';

@Injectable()
export class DatabasesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDatabaseDto: CreateDatabaseDto) {
    return this.prisma.database.create({
      data: {
        ...createDatabaseDto,
        createdById: userId,
      },
      include: { properties: true, views: true },
    });
  }

  async findByPage(pageId: string) {
    return this.prisma.database.findMany({
      where: { pageId },
      include: { properties: true, views: true },
    });
  }

  async findById(id: string) {
    return this.prisma.database.findUnique({
      where: { id },
      include: { properties: true, views: true, records: true },
    });
  }

  async update(id: string, userId: string, updateDatabaseDto: UpdateDatabaseDto) {
    const database = await this.findById(id);
    if (!database) throw new NotFoundException('Database not found');
    if (database.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to update this database');
    }

    return this.prisma.database.update({
      where: { id },
      data: updateDatabaseDto,
      include: { properties: true, views: true },
    });
  }

  async delete(id: string, userId: string) {
    const database = await this.findById(id);
    if (!database) throw new NotFoundException('Database not found');
    if (database.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to delete this database');
    }

    return this.prisma.database.delete({
      where: { id },
    });
  }
}
