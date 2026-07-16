import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('api/comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: any) {
    return this.commentsService.create(user.id, createCommentDto);
  }

  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.commentsService.findByPage(pageId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}
