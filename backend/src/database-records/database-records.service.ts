import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDatabaseRecordDto, UpdateDatabaseRecordDto } from './dto';

@Injectable()
export class DatabaseRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDatabaseRecordDto: CreateDatabaseRecordDto) {
    return this.prisma.databaseRecord.create({
      data: {
        ...createDatabaseRecordDto,
        createdById: userId,
      },
    });
  }

  async findByDatabase(databaseId: string) {
    return this.prisma.databaseRecord.findMany({
      where: { databaseId },
    });
  }

  async findById(id: string) {
    return this.prisma.databaseRecord.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDatabaseRecordDto: UpdateDatabaseRecordDto) {
    const record = await this.findById(id);
    if (!record) throw new NotFoundException('Record not found');

    return this.prisma.databaseRecord.update({
      where: { id },
      data: updateDatabaseRecordDto,
    });
  }

  async delete(id: string) {
    return this.prisma.databaseRecord.delete({
      where: { id },
    });
  }
}
