import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPropertyDto: CreatePropertyDto) {
    return this.prisma.property.create({
      data: {
        ...createPropertyDto,
        createdById: userId,
      },
    });
  }

  async findByDatabase(databaseId: string) {
    return this.prisma.property.findMany({
      where: { databaseId },
      orderBy: { order: 'asc' },
    });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });
    if (!property) throw new NotFoundException('Property not found');

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async delete(id: string) {
    return this.prisma.property.delete({
      where: { id },
    });
  }
}
