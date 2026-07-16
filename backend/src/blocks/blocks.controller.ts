import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateBlockDto, UpdateBlockDto } from './dto';

@Controller('api/blocks')
@UseGuards(JwtAuthGuard)
export class BlocksController {
  constructor(private blocksService: BlocksService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto, @CurrentUser() user: any) {
    return this.blocksService.create(user.id, createBlockDto);
  }

  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.blocksService.findByPage(pageId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlockDto: UpdateBlockDto,
    @CurrentUser() user: any,
  ) {
    return this.blocksService.update(id, user.id, updateBlockDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.blocksService.delete(id, user.id);
  }
}
