import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePageDto {
  @IsString()
  workspaceId: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdatePageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
