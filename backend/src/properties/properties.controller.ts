import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';

@Controller('api/properties')
@UseGuards(JwtAuthGuard)
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @CurrentUser() user: any) {
    return this.propertiesService.create(user.id, createPropertyDto);
  }

  @Get('database/:databaseId')
  findByDatabase(@Param('databaseId') databaseId: string) {
    return this.propertiesService.findByDatabase(databaseId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.propertiesService.delete(id);
  }
}
