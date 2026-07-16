import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { DatabaseRecordsService } from './database-records.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateDatabaseRecordDto, UpdateDatabaseRecordDto } from './dto';

@Controller('api/records')
@UseGuards(JwtAuthGuard)
export class DatabaseRecordsController {
  constructor(private databaseRecordsService: DatabaseRecordsService) {}

  @Post()
  create(@Body() createDatabaseRecordDto: CreateDatabaseRecordDto, @CurrentUser() user: any) {
    return this.databaseRecordsService.create(user.id, createDatabaseRecordDto);
  }

  @Get('database/:databaseId')
  findByDatabase(@Param('databaseId') databaseId: string) {
    return this.databaseRecordsService.findByDatabase(databaseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databaseRecordsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDatabaseRecordDto: UpdateDatabaseRecordDto) {
    return this.databaseRecordsService.update(id, updateDatabaseRecordDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.databaseRecordsService.delete(id);
  }
}
