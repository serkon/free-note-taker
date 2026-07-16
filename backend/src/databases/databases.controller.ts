import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateDatabaseDto, UpdateDatabaseDto } from './dto';

@Controller('api/databases')
@UseGuards(JwtAuthGuard)
export class DatabasesController {
  constructor(private databasesService: DatabasesService) {}

  @Post()
  create(@Body() createDatabaseDto: CreateDatabaseDto, @CurrentUser() user: any) {
    return this.databasesService.create(user.id, createDatabaseDto);
  }

  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.databasesService.findByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databasesService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDatabaseDto: UpdateDatabaseDto,
    @CurrentUser() user: any,
  ) {
    return this.databasesService.update(id, user.id, updateDatabaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.databasesService.delete(id, user.id);
  }
}
