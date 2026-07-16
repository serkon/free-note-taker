import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { PagesShareService } from './pages-share.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePageShareDto } from './dto';

@Controller('api/shares')
@UseGuards(JwtAuthGuard)
export class PagesShareController {
  constructor(private pagesShareService: PagesShareService) {}

  @Post()
  create(@Body() createPageShareDto: CreatePageShareDto) {
    return this.pagesShareService.create(createPageShareDto);
  }

  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.pagesShareService.findByPage(pageId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pagesShareService.delete(id);
  }
}
