import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePageDto, UpdatePageDto } from './dto';

@Controller('api/pages')
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto, @CurrentUser() user: any) {
    return this.pagesService.create(user.id, createPageDto);
  }

  @Get('workspace/:workspaceId')
  findByWorkspace(@Param('workspaceId') workspaceId: string) {
    return this.pagesService.findByWorkspace(workspaceId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findById(id);
  }

  @Get(':id/hierarchy')
  getHierarchy(@Param('id') id: string) {
    return this.pagesService.getHierarchy(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @CurrentUser() user: any,
  ) {
    return this.pagesService.update(id, user.id, updatePageDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.pagesService.delete(id, user.id);
  }
}
