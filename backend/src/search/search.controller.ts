import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  search(@Query('q') query: string, @Query('workspaceId') workspaceId: string) {
    return this.searchService.search(workspaceId, query);
  }
}
