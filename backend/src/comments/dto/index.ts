import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  pageId: string;

  @IsOptional()
  @IsString()
  blockId?: string;

  @IsString()
  content: string;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  resolved?: boolean;
}
